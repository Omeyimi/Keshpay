// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {NetworkConfig} from "../script/NetworkConfig.s.sol";

/**
 * @title Payments
 * @author Adam
 * @notice A simple payment system that allows users to deposit and withdraw tokens, and send and request payments
 * @dev This contract is designed to be used with the Chainlink Price Feeds contract
 */
contract Payments {
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
    error Payments__ArrayLengthMismatch();
    error Payments__NoStablecoinsProvided();
    error Payments__StalePrice();
    error Payments__InvalidPrice();

    ////////////////
    // Structs    //
    ////////////////
    struct Transaction {
        uint256 id;
        uint256 amount;
        uint256 timestamp;
        address sender;
        address receiver;
        string note;
        bool completed;
    }

    struct userWallet {
        address owner;
        uint256 balance;
        bool initialized;
        mapping(address => uint256) balances;
    }
    
    address public immutable i_owner;
    NetworkConfig public immutable i_networkConfig;

    ////////////////
    // Mappings   //
    ////////////////
    mapping(address => Transaction[]) public transactions;
    mapping(address => userWallet) public wallets;
    // Supported stablecoins mapping
    mapping(address => bool) private supportedStablecoins;
    mapping(address => address) public tokenPriceFeeds;

    ////////////////
    // Events     //
    ////////////////
    event Deposited(address token, address user, uint256 amount);
    event Withdrawn(address token, address user, uint256 amount);
    event TransactionCreated(address sender, address to, uint256 amount, string note);
    event WalletInitialized(address indexed wallet, address indexed owner);


    /**
     * @notice Constructor for the Payments contract
     * @param _networkConfig The address of the NetworkConfig contract
     */
    constructor(address _networkConfig) {
        i_owner = msg.sender;
        i_networkConfig = NetworkConfig(_networkConfig);
        
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
    function initializeWallet(address _wallet) external {
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
    function deposit(address _token, uint256 _amount) external initializedWallet(msg.sender) {
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
    function withdraw(address _token, uint256 _amount) external initializedWallet(msg.sender) {
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
    function sendPayment(address _recipient, uint256 _amount) external {}

    function requestPayment(address _recipient, uint256 _amount) external {}

    function fulfillPayment(uint256 requestId) external {}

    // Tracking transactions
    function createTransaction(address sender, address to, uint256 amount, string memory note) external {
        Transaction[] storage userTransactions = transactions[sender];
        userTransactions.push(
            Transaction({
                id: userTransactions.length,
                amount: amount,
                timestamp: block.timestamp,
                sender: sender,
                receiver: to,
                note: note,
                completed: false
            })
        );

        emit TransactionCreated(sender, to, amount, note);
    }

    function getTransactionHistory(address user) external view returns (Transaction[] memory) {
        return transactions[user];
    }

    function getTransactionDetails(uint256 transactionId) external view returns (Transaction memory) {
        return transactions[msg.sender][transactionId];
    }

    function getTokenPrice(address _token) public view returns (uint256) {
        address priceFeed = tokenPriceFeeds[_token];
        if (priceFeed == address(0)) revert Payments__UnsupportedStablecoin();
        
        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = AggregatorV3Interface(priceFeed).latestRoundData();
        
        // Check for stale data
        if (updatedAt == 0 || updatedAt > block.timestamp) revert Payments__StalePrice();
        if (price <= 0) revert Payments__InvalidPrice();
        
        // Chainlink price feeds for USD pairs return prices with 8 decimals
        return uint256(price);
    }
}
