// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {FlagsInterface} from "@chainlink/contracts/src/v0.8/interfaces/FlagsInterface.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {NetworkConfig} from "../script/NetworkConfig.s.sol";

/**
 * @title Payments
 * @author Adam
 * @notice A simple payment system that allows users to deposit and withdraw tokens, and send and request payments
 * @dev This contract is designed to be used with the Chainlink Price Feeds contract
 */
contract Payments is ReentrancyGuard, Ownable, Pausable {
    using SafeERC20 for IERC20;
    ////////////////
    // Error codes//
    ////////////////

    error Payments__WalletNotInitialized();
    error Payments__InsufficientBalance();
    error Payments__WalletAlreadyInitialized();
    error Payments__InvalidAmount();
    error Payments__InvalidAddress();
    error Payments__UnsupportedStablecoin();
    error Payments__NoStablecoinsProvided();
    error Payments__TransactionCompleted();
    error Payments__InvalidTransactionId();
    error Payments__StalePrice();
    error Payments__InvalidPrice();
    error Payments__ChainlinkFeedsNotBeingUpdated();

    ////////////////
    // Structs    //
    ////////////////
    struct Transaction {
        uint256 id;
        address token;
        uint256 amount;
        uint256 timestamp;
        address sender;
        address receiver;
        string note;
    }

    struct userWallet {
        address owner;
        uint256 balance;
        bool initialized;
        mapping(address => uint256) balances;
    }

    ////////////////
    // Mappings   //
    ////////////////
    mapping(address => Transaction[]) public transactions;
    mapping(address => userWallet) public wallets;
    // Supported stablecoins mapping
    mapping(address => bool) public supportedStablecoins;
    mapping(address => address) public tokenPriceFeeds;

    ////////////////////
    // State variables///
    /////////////////////
    address private constant FLAG_ARBITRUM_SEQ_OFFLINE =
        address(bytes20(bytes32(uint256(keccak256("chainlink.flags.arbitrum-seq-offline")) - 1)));
    NetworkConfig public immutable i_networkConfig;
    FlagsInterface internal chainlinkFlags;
    uint256 private s_transactionCounter;

    ////////////////
    // Events     //
    ////////////////
    event Deposited(address token, address user, uint256 amount);
    event Withdrawn(address token, address user, uint256 amount);
    event TransactionCreated(
        uint256 id, address sender, address to, address token, uint256 amount, string note, uint256 timestamp
    );
    event WalletInitialized(address indexed wallet, address indexed owner);
    event PaymentSend(address token, address user, address recipient, uint256 amount);
    event TransactionCompleted(
        uint256 id, address sender, address to, address token, uint256 amount, string note, uint256 timestamp
    );

    /**
     * @notice Constructor for the Payments contract
     * @param _networkConfig The address of the NetworkConfig contract
     */
    constructor(address _networkConfig) Ownable(msg.sender) {
        i_networkConfig = NetworkConfig(_networkConfig);
        s_transactionCounter = 0;
        chainlinkFlags = FlagsInterface(0x491B1dDA0A8fa069bbC1125133A975BF4e85a91b);

        // Get network addresses
        NetworkConfig.NetworkAddresses memory addresses = i_networkConfig.getNetworkAddresses();

        address[] memory stablecoins = new address[](3);
        stablecoins[0] = addresses.usdc;
        stablecoins[1] = addresses.usdt;
        stablecoins[2] = addresses.dai;

        address[] memory priceFeeds = new address[](3);
        priceFeeds[0] = addresses.usdcPriceFeed;
        priceFeeds[1] = addresses.usdtPriceFeed;
        priceFeeds[2] = addresses.daiPriceFeed;

        if (stablecoins.length == 0) revert Payments__NoStablecoinsProvided();

        for (uint256 i = 0; i < stablecoins.length; i++) {
            supportedStablecoins[stablecoins[i]] = true;
            tokenPriceFeeds[stablecoins[i]] = priceFeeds[i];
        }
    }

    ////////////////
    // Modifiers  //
    ////////////////
    /**
     * @notice Modifier to check if a wallet is initialized
     * @param _wallet The address of the wallet to check
     */
    modifier initializedWallet(address _wallet) {
        if (!wallets[_wallet].initialized) revert Payments__WalletNotInitialized();
        _;
    }

    /////////////////////////
    // External Functions  //
    /////////////////////////
    /**
     * @notice Initialize a wallet for a user
     * @param _wallet The address of the wallet to initialize
     * @notice Wallet can contain stablecoins (USDC, USDT, DAI)
     */
    function initializeWallet(address _wallet) external whenNotPaused {
        if (wallets[_wallet].initialized) revert Payments__WalletAlreadyInitialized();
        wallets[_wallet].owner = msg.sender;
        wallets[_wallet].initialized = true;
        emit WalletInitialized(_wallet, msg.sender);
    }

    /**
     * @notice Deposit stablecoins into the wallet
     * @param _token The address of the stablecoin to deposit
     * @param _amount The amount of stablecoins to deposit
     */
    function deposit(address _token, uint256 _amount) external whenNotPaused initializedWallet(msg.sender) {
        if (_token == address(0)) revert Payments__InvalidAddress();
        if (_amount == 0) revert Payments__InvalidAmount();
        if (!supportedStablecoins[_token]) revert Payments__UnsupportedStablecoin();

        uint256 balance = IERC20(_token).balanceOf(msg.sender);
        if (_amount > balance) revert Payments__InsufficientBalance();

        wallets[msg.sender].balances[_token] += _amount;
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        emit Deposited(_token, msg.sender, _amount);
    }

    /**
     * @notice Withdraw stablecoins from the wallet
     * @param _token The address of the stablecoin to withdraw
     * @param _amount The amount of stablecoins to withdraw
     */
    function withdraw(address _token, uint256 _amount)
        external
        whenNotPaused
        nonReentrant
        initializedWallet(msg.sender)
    {
        if (_token == address(0)) revert Payments__InvalidAddress();
        if (_amount == 0) revert Payments__InvalidAmount();
        if (wallets[msg.sender].balances[_token] < _amount) revert Payments__InsufficientBalance();

        wallets[msg.sender].balances[_token] -= _amount;
        IERC20(_token).safeTransfer(msg.sender, _amount);
        emit Withdrawn(_token, msg.sender, _amount);
    }

    /**
     * @notice Get the balance of a stablecoin in the wallet
     * @param _token The address of the stablecoin to get the balance of
     * @return The balance of the stablecoin in the wallet
     */
    function getBalance(address _token) external view returns (uint256) {
        return wallets[msg.sender].balances[_token];
    }

    // payment functions

    /**
     * @notice Internal function executes the payment and completes the transaction
     * @param requestId The id of transaction for msg.sender
     */
    function _sendPayment(uint256 requestId) internal nonReentrant {
        Transaction storage transaction = transactions[msg.sender][requestId];
        wallets[msg.sender].balances[transaction.token] -= transaction.amount;
        IERC20(transaction.token).safeTransfer(transaction.receiver, transaction.amount);

        _cancelRequest(transaction.sender, requestId);

        emit TransactionCompleted(
            transaction.id,
            msg.sender,
            transaction.receiver,
            transaction.token,
            transaction.amount,
            transaction.note,
            block.timestamp
        );
    }

    /**
     * @notice Internal function removes a transaction request
     * @param user The address of user to remove transaction
     * @param requestId The id of transaction for msg.sender
     */
    function _cancelRequest(address user, uint256 requestId) internal {
        for (uint256 i = requestId; i < transactions[user].length - 1; i++) {
            transactions[user][i] = transactions[user][i + 1];
        }
        transactions[user].pop();
    }

    /**
     * @notice Create payment transaction from msg.sender and executes it directly
     * @param _recipient The payment recipient
     * @param _token The token address used for payment (must be a supported stable coin)
     * @param _amount The amount to send
     * @param _note The note to describe payment
     */
    function sendPayment(address _recipient, address _token, uint256 _amount, string memory _note)
        external
        whenNotPaused
    {
        if (_token == address(0)) revert Payments__InvalidAddress();
        if (_amount == 0) revert Payments__InvalidAmount();
        if (!supportedStablecoins[_token]) revert Payments__UnsupportedStablecoin();
        if (wallets[msg.sender].balances[_token] < _amount) revert Payments__InsufficientBalance();

        createTransaction(msg.sender, _recipient, _token, _amount, _note);
        _sendPayment(transactions[msg.sender].length - 1);
    }

    /**
     * @notice Create payment transaction to msg.sender
     * @param _sender The payment sender
     * @param _token The token address used for payment (must be a supported stable coin)
     * @param _amount The amount to send
     * @param _note The note to describe payment
     */
    function requestPayment(address _sender, address _token, uint256 _amount, string memory _note)
        external
        whenNotPaused
    {
        if (_token == address(0)) revert Payments__InvalidAddress();
        if (_amount == 0) revert Payments__InvalidAmount();
        if (!supportedStablecoins[_token]) revert Payments__UnsupportedStablecoin();

        createTransaction(_sender, msg.sender, _token, _amount, _note);
    }

    /**
     * @notice Executes the payment and completes the transaction
     * @param requestId The id of transaction for msg.sender
     */
    function fulfillPayment(uint256 requestId) external whenNotPaused {
        if (transactions[msg.sender].length <= requestId) revert Payments__InvalidTransactionId();
        Transaction memory transaction = transactions[msg.sender][requestId];
        if (wallets[msg.sender].balances[transaction.token] < transaction.amount) {
            revert Payments__InsufficientBalance();
        }

        _sendPayment(requestId);
    }

    // Tracking transactions

    /**
     * @notice Create payment transaction from msg.sender and executes it directly
     * @param sender The payment recipient
     * @param to The payment receiver
     * @param token The token address used for payment (must be a supported stable coin)
     * @param amount The amount to send
     * @param note The note to describe payment
     */
    function createTransaction(address sender, address to, address token, uint256 amount, string memory note)
        internal
    {
        Transaction[] storage userTransactions = transactions[sender];
        s_transactionCounter++;
        uint256 timestamp = block.timestamp;

        userTransactions.push(
            Transaction({
                id: s_transactionCounter,
                token: token,
                amount: amount,
                timestamp: timestamp,
                sender: sender,
                receiver: to,
                note: note
            })
        );
        emit TransactionCreated(s_transactionCounter, sender, to, token, amount, note, timestamp);
    }

    function getTransactionHistory(address user) external view returns (Transaction[] memory) {
        return transactions[user];
    }

    function getTransactionDetails(uint256 transactionId) external view returns (Transaction memory) {
        if (transactionId >= transactions[msg.sender].length) revert Payments__InvalidTransactionId();
        return transactions[msg.sender][transactionId];
    }

    function getTokenPrice(address _token) public view returns (uint256) {
        bool isRaised = chainlinkFlags.getFlag(FLAG_ARBITRUM_SEQ_OFFLINE);
        if (isRaised) {
            revert Payments__ChainlinkFeedsNotBeingUpdated();
        }
        address priceFeed = tokenPriceFeeds[_token];
        if (priceFeed == address(0)) revert Payments__UnsupportedStablecoin();

        ( /* uint80 roundId */
            , int256 price, /* uint256 startedAt */, uint256 updatedAt, /* uint80 answeredInRound */
        ) = AggregatorV3Interface(priceFeed).latestRoundData();

        if (updatedAt == 0 || updatedAt > block.timestamp) revert Payments__StalePrice();
        if (price <= 0) revert Payments__InvalidPrice();

        return uint256(price);
    }

    function addSupportedStablecoin(address _token, address _priceFeed) external onlyOwner {
        supportedStablecoins[_token] = true;
        tokenPriceFeeds[_token] = _priceFeed;
    }

    function emergencyWithdraw(address _token) external onlyOwner {
        IERC20(_token).safeTransfer(owner(), IERC20(_token).balanceOf(address(this)));
    }

    function emergencyPause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function isStablecoinSupported(address _token) external view returns (bool) {
        return supportedStablecoins[_token];
    }

    receive() external payable {}
}
