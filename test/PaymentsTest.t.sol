// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Payments} from "../src/Payments.sol";
import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "../lib/solmate/src/test/utils/mocks/MockERC20.sol";

contract PaymentsTest is Test {
    Payments public payments;
    MockERC20 public usdc;

    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");

    address public constant USDC = 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E;

    uint256 public constant DEPOSIT_AMOUNT = 100 ether;

    function setUp() public {
        usdc = new MockERC20("USDC", "USDC", 6);
        address[] memory stablecoins = new address[](1);
        stablecoins[0] = address(usdc);
        payments = new Payments(stablecoins, new address[](1));
        vm.deal(user1, DEPOSIT_AMOUNT);
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
}
