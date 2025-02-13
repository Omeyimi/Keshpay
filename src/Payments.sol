// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// Core imports needed
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Payments
 * @author Adam
 * @notice A simple payment system that allows users to deposit and withdraw tokens, and send and request payments
 * @dev This contract is designed to be used with the Chainlink Price Feeds contract
 */
contract Payments {
    error Payments__WalletNotInitialized();
    error Payments__InsufficientBalance();

    struct Transaction {
        uint256 id;
        uint256 amount;
        uint256 timestamp;
        address sender;
        address receiver;
        string note;
        bool completed;
    }

    mapping(address => Transaction[]) public transactions;

    struct userWallet {
        address owner;
        uint256 balance;
        bool initialized;
        mapping(address => uint256) balances;
    }

    address public priceFeeds;

    mapping(address => userWallet) public wallets;

    event Deposited(address token, address user, uint256 amount);
    event Withdrawn(address token, address user, uint256 amount);
    event TransactionCreated(address sender, address to, uint256 amount, string note);

    constructor(address _priceFeeds) {
        priceFeeds = _priceFeeds;
    }

    modifier initializedWallet(address _wallet) {
        if (!wallets[_wallet].initialized) revert Payments__WalletNotInitialized();
        _;
    }

    // Core functions
    /**
     * @notice Initialize a wallet for a user
     * @param _wallet The address of the wallet to initialize
     * @notice Wallet can contain multiple tokens - USDC, ETH, BTC and uses Chainlink price feeds to convert to USD
     */
    function initializeWallet(address _wallet) external initializedWallet(_wallet) {
        wallets[_wallet].owner = msg.sender;
        wallets[_wallet].initialized = true;
    }

    /**
     * @notice Deposit tokens into the wallet
     * @param _token The address of the token to deposit
     * @param _amount The amount of tokens to deposit
     */
    function deposit(address _token, uint256 _amount) external initializedWallet(_token) {
        uint256 balance = IERC20(_token).balanceOf(msg.sender);
        if (_amount > balance) revert Payments__InsufficientBalance();
        wallets[msg.sender].balances[_token] += _amount;
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        emit Deposited(_token, msg.sender, _amount);
    }

    /**
     * @notice Withdraw tokens from the wallet
     * @param _token The address of the token to withdraw
     * @param _amount The amount of tokens to withdraw
     */
    function withdraw(address _token, uint256 _amount) external {
        if (wallets[msg.sender].balances[_token] < _amount) revert Payments__InsufficientBalance();
        wallets[msg.sender].balances[_token] -= _amount;
        IERC20(_token).transfer(msg.sender, _amount);
        emit Withdrawn(_token, msg.sender, _amount);
    }

    /**
     * @notice Get the balance of a token in the wallet
     * @param _token The address of the token to get the balance of
     * @return The balance of the token in the wallet
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

    function getTransactionHistory(address user) external view returns (Transaction[] memory) {}

    function getTransactionDetails(uint256 transactionId) external view returns (Transaction[] memory) {}

    function latestRoundData()
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return AggregatorV3Interface(priceFeeds).latestRoundData();
    }
}
