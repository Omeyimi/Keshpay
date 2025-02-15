// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Payments} from "../src/Payments.sol";
import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "../lib/solmate/src/test/utils/mocks/MockERC20.sol";
import {NetworkConfig} from "../script/NetworkConfig.s.sol";

contract PaymentsTest is Test {
    Payments public payments;
    MockERC20 public usdc;

    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");

    address public constant USDC = 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E;

    uint256 public constant DEPOSIT_AMOUNT = 100 ether;

    function encodeTransaction(Payments.Transaction memory transaction) public pure returns (bytes32) {
        return keccak256(
            abi.encode(
                transaction.id,
                transaction.sender,
                transaction.receiver,
                transaction.token,
                transaction.amount,
                transaction.note,
                transaction.completed
            )
        );
    }

    function setUp() public {
        usdc = new MockERC20("USDC", "USDC", 6);

        NetworkConfig networkConfig = new NetworkConfig();

        payments = new Payments(address(networkConfig));

        vm.startPrank(payments.i_owner());
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

        payments.sendPayment(user2, address(usdc), DEPOSIT_AMOUNT, "test");
        assertEq(usdc.balanceOf(address(payments)), 0);
        assertEq(payments.getBalance(address(usdc)), 0);
        assertEq(usdc.balanceOf(address(user2)), DEPOSIT_AMOUNT);
        Payments.Transaction memory expected = Payments.Transaction({
            id: 0,
            token: address(usdc),
            amount: DEPOSIT_AMOUNT,
            timestamp: block.timestamp,
            sender: user1,
            receiver: user2,
            note: "test",
            completed: true
        });
        Payments.Transaction memory result = payments.getTransactionDetails(user1, 0);
        assertEq(encodeTransaction(expected), encodeTransaction(result));
        vm.stopPrank();
    }

    function testInvalidTokenRequestPayment() public {
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InvalidAddress.selector);
        payments.requestPayment(user2, address(0x0), DEPOSIT_AMOUNT, "test");
        vm.stopPrank();
    }

    function testUnsupportedTokenRequestPayment() public {
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__UnsupportedStablecoin.selector);
        payments.requestPayment(user2, address(0x2), DEPOSIT_AMOUNT, "test");
        vm.stopPrank();
    }

    function testInvalidAmountRequestPayment() public {
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InvalidAmount.selector);
        payments.requestPayment(user2, address(usdc), 0, "test");
        vm.stopPrank();
    }

    function testRequestPayment() public {
        vm.startPrank(user1);

        payments.requestPayment(user2, address(usdc), DEPOSIT_AMOUNT, "test");
        Payments.Transaction memory expected = Payments.Transaction({
            id: 0,
            token: address(usdc),
            amount: DEPOSIT_AMOUNT,
            timestamp: block.timestamp,
            sender: user2,
            receiver: user1,
            note: "test",
            completed: false
        });
        Payments.Transaction memory result = payments.getTransactionDetails(user2, 0);
        assertEq(encodeTransaction(expected), encodeTransaction(result));
        vm.stopPrank();
    }

    function testInsufficentBalanceFulfillPayment() public {
        vm.startPrank(user1);
        payments.initializeWallet(user1);

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InsufficientBalance.selector);
        payments.fulfillPayment(0);
        vm.stopPrank();
    }

    function testTransactionCompletedFulfillPayment() public {
        setUpUser1WithDeposit();

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        vm.startPrank(user1);
        payments.fulfillPayment(0);
        vm.expectRevert(Payments.Payments__TransactionCompleted.selector);
        payments.fulfillPayment(0);
        vm.stopPrank();
    }

    function testInvalidTransactionIdFulfillPayment() public {
        setUpUser1WithDeposit();

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        vm.startPrank(user1);
        vm.expectRevert(Payments.Payments__InvalidTransactionId.selector);
        payments.fulfillPayment(1);
        vm.stopPrank();
    }

    function testFulfillPayment() public {
        setUpUser1WithDeposit();

        vm.startPrank(user2);
        payments.initializeWallet(user2);

        payments.requestPayment(user1, address(usdc), DEPOSIT_AMOUNT, "test");
        vm.startPrank(user1);
        payments.fulfillPayment(0);

        assertEq(usdc.balanceOf(address(payments)), 0);
        assertEq(payments.getBalance(address(usdc)), 0);
        assertEq(usdc.balanceOf(address(user2)), DEPOSIT_AMOUNT);
        Payments.Transaction memory expected = Payments.Transaction({
            id: 0,
            token: address(usdc),
            amount: DEPOSIT_AMOUNT,
            timestamp: block.timestamp,
            sender: user1,
            receiver: user2,
            note: "test",
            completed: true
        });
        Payments.Transaction memory result = payments.getTransactionDetails(user1, 0);
        assertEq(encodeTransaction(expected), encodeTransaction(result));
        vm.stopPrank();
    }
}
