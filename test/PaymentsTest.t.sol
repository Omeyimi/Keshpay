// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Payments} from "../src/Payments.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "../lib/solmate/src/test/utils/mocks/MockERC20.sol";
import {NetworkConfig} from "../script/NetworkConfig.s.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {MockV3Aggregator} from "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol";
import {MockFlags} from "./mocks/MockFlags.sol";
import {FlagsInterface} from "@chainlink/contracts/src/v0.8/interfaces/FlagsInterface.sol";

contract PaymentsTest is Test {
    Payments public payments;
    MockERC20 public usdc;

    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");

    address public constant USDC = 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E;

    uint256 public constant DEPOSIT_AMOUNT = 100 ether;

    event Deposited(address token, address user, uint256 amount);
    event Withdrawn(address token, address user, uint256 amount);
    event TransactionCreated(
        uint256 id, address sender, address to, address token, uint256 amount, string note, uint256 timestamp
    );
    event WalletInitialized(address indexed wallet, address indexed owner);
    event TransactionCompleted(
        uint256 id, address sender, address to, address token, uint256 amount, string note, uint256 timestamp
    );

    function encodeTransaction(Payments.Transaction memory transaction) public pure returns (bytes32) {
        return keccak256(
            abi.encode(
                transaction.id,
                transaction.sender,
                transaction.receiver,
                transaction.token,
                transaction.amount,
                transaction.note
            )
        );
    }

    function setUp() public {
        vm.chainId(84532); // BASE_SEPOLIA

        usdc = new MockERC20("USDC", "USDC", 6);
        NetworkConfig networkConfig = new NetworkConfig();
        payments = new Payments(address(networkConfig));

        vm.startPrank(payments.owner());
        address[] memory stablecoins = new address[](1);
        stablecoins[0] = address(usdc);
        address[] memory priceFeeds = new address[](1);
        priceFeeds[0] = address(1); // Mock price feed

        for (uint256 i = 0; i < stablecoins.length; i++) {
            payments.addSupportedStablecoin(stablecoins[i], priceFeeds[i]);
        }
        vm.stopPrank();

        vm.deal(user1, DEPOSIT_AMOUNT);
    }

    function setUpUser1WithDeposit() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);
        usdc.mint(user1, DEPOSIT_AMOUNT);
        usdc.approve(address(payments), DEPOSIT_AMOUNT);
        payments.deposit(address(usdc), DEPOSIT_AMOUNT);
    }

    function testCanInitializeWallet() public {
        vm.prank(user1);
        vm.expectEmit();
        emit WalletInitialized(user1, user1);
        payments.initializeWallet(user1);

        // Get wallet info
        (address owner, uint256 balance, bool initialized) = payments.wallets(user1);
        assertEq(owner, user1);
        assertTrue(initialized);
        console.log("owner", owner);
        console.log("balance", balance);
        console.log("initialized", initialized);
    }

    function testCannotInitializeWalletTwice() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        vm.expectRevert(Payments.Payments__WalletAlreadyInitialized.selector);
        payments.initializeWallet(user1);
        vm.stopPrank();
    }

    function testRevertsIfWalletIsAlreadyInitialized() public {
        vm.prank(user1);
        payments.initializeWallet(user1);

        vm.startPrank(user2);
        vm.expectRevert(Payments.Payments__WalletAlreadyInitialized.selector);
        payments.initializeWallet(user1);
        vm.stopPrank();
    }

    function testCanMakeADeposit() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        usdc.mint(user1, DEPOSIT_AMOUNT);
        assertEq(usdc.balanceOf(user1), DEPOSIT_AMOUNT);

        usdc.approve(address(payments), DEPOSIT_AMOUNT);

        vm.expectEmit();
        emit Deposited(address(usdc), user1, DEPOSIT_AMOUNT);
        payments.deposit(address(usdc), DEPOSIT_AMOUNT);

        assertEq(usdc.balanceOf(address(payments)), DEPOSIT_AMOUNT);
        assertEq(payments.getBalance(address(usdc)), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertsOnUnsupportedStablecoin() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        vm.expectRevert(Payments.Payments__UnsupportedStablecoin.selector);
        payments.deposit(address(0x2), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function testWithdraw() public {
        setUpUser1WithDeposit();

        vm.expectEmit();
        emit Withdrawn(address(usdc), user1, DEPOSIT_AMOUNT);
        payments.withdraw(address(usdc), DEPOSIT_AMOUNT);
        assertEq(usdc.balanceOf(address(payments)), 0);
        assertEq(payments.getBalance(address(usdc)), 0);
        vm.stopPrank();
    }

    function testRevertInvalidTokenWithdraw() public {
        setUpUser1WithDeposit();
        vm.expectRevert(Payments.Payments__InvalidAddress.selector);
        payments.withdraw(address(0x0), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertInvalidAmountWithdraw() public {
        setUpUser1WithDeposit();
        vm.expectRevert(Payments.Payments__InvalidAmount.selector);
        payments.withdraw(address(usdc), 0);
        vm.stopPrank();
    }

    function testRevertInsufficentBalanceWithdraw() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        vm.expectRevert(Payments.Payments__InsufficientBalance.selector);
        payments.withdraw(address(usdc), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertInvalidTokenSendPayment() public {
        setUpUser1WithDeposit();
        vm.expectRevert(Payments.Payments__InvalidAddress.selector);
        payments.sendPayment(user2, address(0x0), DEPOSIT_AMOUNT, "test");
        vm.stopPrank();
    }

    function testRevertUnsupportedTokenSendPayment() public {
        setUpUser1WithDeposit();
        vm.expectRevert(Payments.Payments__UnsupportedStablecoin.selector);
        payments.sendPayment(user2, address(0x2), DEPOSIT_AMOUNT, "test");
        vm.stopPrank();
    }

    function testRevertInvalidAmountSendPayment() public {
        setUpUser1WithDeposit();
        vm.expectRevert(Payments.Payments__InvalidAmount.selector);
        payments.sendPayment(user2, address(usdc), 0, "test");
        vm.stopPrank();
    }

    function testRevertInsufficentBalanceSendPayment() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        vm.expectRevert(Payments.Payments__InsufficientBalance.selector);
        payments.sendPayment(user2, address(usdc), DEPOSIT_AMOUNT, "test");
        vm.stopPrank();
    }

    function testSendPayment() public {
        setUpUser1WithDeposit();

        vm.expectEmit();
        emit TransactionCreated(1, user1, user2, address(usdc), DEPOSIT_AMOUNT, "test", vm.getBlockTimestamp());
        emit TransactionCompleted(1, user1, user2, address(usdc), DEPOSIT_AMOUNT, "test", vm.getBlockTimestamp());
        payments.sendPayment(user2, address(usdc), DEPOSIT_AMOUNT, "test");
        assertEq(usdc.balanceOf(address(payments)), 0);
        assertEq(payments.getBalance(address(usdc)), 0);
        assertEq(usdc.balanceOf(address(user2)), DEPOSIT_AMOUNT);

        // Check transaction history is empty (since payment is completed)
        assertEq(payments.getTransactionHistory(user1).length, 0);
        vm.stopPrank();
    }

    function testInvalidTokenRequestPayment() public {
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InvalidAddress.selector);
        payments.requestPayment(user2, address(0x0), DEPOSIT_AMOUNT, "test");
        assertEq(payments.getTransactionHistory(user2).length, 0);
        vm.stopPrank();
    }

    function testUnsupportedTokenRequestPayment() public {
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__UnsupportedStablecoin.selector);
        payments.requestPayment(user2, address(0x2), DEPOSIT_AMOUNT, "test");
        assertEq(payments.getTransactionHistory(user2).length, 0);
        vm.stopPrank();
    }

    function testInvalidAmountRequestPayment() public {
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InvalidAmount.selector);
        payments.requestPayment(user2, address(usdc), 0, "test");
        assertEq(payments.getTransactionHistory(user2).length, 0);
        vm.stopPrank();
    }

    function testRequestPayment() public {
        vm.startPrank(user1);

        assertEq(payments.getTransactionHistory(user2).length, 0);
        vm.expectEmit();
        emit TransactionCreated(1, user2, user1, address(usdc), DEPOSIT_AMOUNT, "test", vm.getBlockTimestamp());
        payments.requestPayment(user2, address(usdc), DEPOSIT_AMOUNT, "test");
        Payments.Transaction memory expected = Payments.Transaction({
            id: 1,
            token: address(usdc),
            amount: DEPOSIT_AMOUNT,
            timestamp: block.timestamp,
            sender: user2,
            receiver: user1,
            note: "test"
        });
        vm.startPrank(user2);
        Payments.Transaction memory result = payments.getTransactionDetails(0);
        vm.stopPrank();
        assertEq(encodeTransaction(expected), encodeTransaction(result));
    }

    function testInsufficentBalanceFulfillPayment() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        assertEq(payments.getTransactionHistory(user1).length, 1);
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InsufficientBalance.selector);
        payments.fulfillPayment(0);
        assertEq(payments.getTransactionHistory(user1).length, 1);
        vm.stopPrank();
    }

    function testInvalidTransactionIdFulfillPayment() public {
        setUpUser1WithDeposit();

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        assertEq(payments.getTransactionHistory(user1).length, 1);
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InvalidTransactionId.selector);
        payments.fulfillPayment(1);
        assertEq(payments.getTransactionHistory(user1).length, 1);
        vm.stopPrank();
    }

    function testFulfillPayment() public {
        setUpUser1WithDeposit();

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        vm.expectEmit();
        emit TransactionCreated(1, user1, user2, address(usdc), DEPOSIT_AMOUNT, "test", vm.getBlockTimestamp());
        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        assertEq(payments.getTransactionHistory(user1).length, 1);

        vm.startPrank(user1);
        emit TransactionCompleted(1, user1, user2, address(usdc), DEPOSIT_AMOUNT, "test", vm.getBlockTimestamp());
        payments.fulfillPayment(0);

        assertEq(payments.getTransactionHistory(user1).length, 0);
        assertEq(usdc.balanceOf(address(payments)), 0);
        assertEq(payments.getBalance(address(usdc)), 0);
        assertEq(usdc.balanceOf(address(user2)), DEPOSIT_AMOUNT);
        vm.stopPrank();
    }

    function testEmergencyPause() public {
        vm.startPrank(user1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        payments.emergencyPause();
        vm.startPrank(payments.owner());
        payments.emergencyPause();

        vm.startPrank(user1);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        payments.initializeWallet(user1);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        payments.deposit(USDC, DEPOSIT_AMOUNT);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        payments.withdraw(USDC, DEPOSIT_AMOUNT);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        payments.sendPayment(user2, USDC, DEPOSIT_AMOUNT, "test");
        vm.expectRevert(Pausable.EnforcedPause.selector);
        payments.requestPayment(user2, USDC, DEPOSIT_AMOUNT, "test");
        vm.expectRevert(Pausable.EnforcedPause.selector);
        payments.fulfillPayment(0);

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        payments.unpause();
        vm.startPrank(payments.owner());
        payments.unpause();
        vm.stopPrank();
    }

    function testGetTokenPrice() public {
        MockV3Aggregator mockPriceFeed = new MockV3Aggregator(8, 100000000); // $1.00 with 8 decimals

        vm.mockCall(
            0x491B1dDA0A8fa069bbC1125133A975BF4e85a91b, // Chainlink Flags address
            abi.encodeWithSelector(FlagsInterface.getFlag.selector),
            abi.encode(false) // Feeds are working
        );

        vm.startPrank(payments.owner());
        payments.addSupportedStablecoin(address(usdc), address(mockPriceFeed));
        vm.stopPrank();

        uint256 price = payments.getTokenPrice(address(usdc));
        assertEq(price, 100000000);
    }

    function testGetTokenPriceRevertsOnStaleData() public {
        MockV3Aggregator mockPriceFeed = new MockV3Aggregator(8, 100000000);
        mockPriceFeed.updateRoundData(0, 100000000, block.timestamp + 1, block.timestamp + 1);

        vm.mockCall(
            0x491B1dDA0A8fa069bbC1125133A975BF4e85a91b,
            abi.encodeWithSelector(FlagsInterface.getFlag.selector),
            abi.encode(false)
        );

        vm.startPrank(payments.owner());
        payments.addSupportedStablecoin(address(usdc), address(mockPriceFeed));
        vm.stopPrank();

        vm.expectRevert(Payments.Payments__StalePrice.selector);
        payments.getTokenPrice(address(usdc));
    }

    function testGetTokenPriceRevertsOnInvalidPrice() public {
        MockV3Aggregator mockPriceFeed = new MockV3Aggregator(8, 0); // Price of 0

        vm.mockCall(
            0x491B1dDA0A8fa069bbC1125133A975BF4e85a91b,
            abi.encodeWithSelector(FlagsInterface.getFlag.selector),
            abi.encode(false)
        );

        vm.startPrank(payments.owner());
        payments.addSupportedStablecoin(address(usdc), address(mockPriceFeed));
        vm.stopPrank();

        vm.expectRevert(Payments.Payments__InvalidPrice.selector);
        payments.getTokenPrice(address(usdc));
    }

    function testCanAddSupportedStableCoin() public {
        MockV3Aggregator mockPriceFeed = new MockV3Aggregator(8, 100000000);
        vm.startPrank(payments.owner());
        payments.addSupportedStablecoin(address(usdc), address(mockPriceFeed));
        vm.stopPrank();
        assertEq(payments.isStablecoinSupported(address(usdc)), true);
        assertEq(payments.tokenPriceFeeds(address(usdc)), address(mockPriceFeed));
    }
}
