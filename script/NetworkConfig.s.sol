// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";

contract NetworkConfig is Script {
    error NetworkConfig__NetworkNotSupported();

    struct NetworkAddresses {
        address usdc;
        address usdt;
        address dai;
        address usdcPriceFeed;
        address usdtPriceFeed;
        address daiPriceFeed;
    }

    uint256 public constant BASE_MAINNET = 8453; // Base Mainnet
    uint256 public constant BASE_SEPOLIA = 84532; // Base Sepolia

    function getNetworkAddresses() public view returns (NetworkAddresses memory) {
        if (block.chainid == BASE_MAINNET) {
            // Base Mainnet
            return NetworkAddresses({
                usdc: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913, // USDC on Base
                usdt: 0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb, // USDT on Base
                dai: 0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb, // DAI on Base
                usdcPriceFeed: 0x7e860098F58bBFC8648a4311b374B1D669a2bc6B,
                usdtPriceFeed: 0xf19d560eB8d2ADf07BD6D13ed03e1D11215721F9,
                daiPriceFeed: 0x591e79239a7d679378eC8c847e5038150364C78F
            });
        } else if (block.chainid == BASE_SEPOLIA) {
            // Base Sepolia
            return NetworkAddresses({
                usdc: 0x036CBD53842c5426634e7929541ec2318F3DCF7C, // USDC
                usdt: 0x1721Dff28fc0c6442386C21ab41d237aeA1d4d4C, // USDT
                dai: 0x7d691e6b03b18E06e6d0DE1D364a4E409cD08C4b, // DAI
                usdcPriceFeed: 0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165,
                usdtPriceFeed: 0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165,
                daiPriceFeed: 0xD1092a65338d049DB68D7Be6bD89d17a0929945e
            });
        }
        revert NetworkConfig__NetworkNotSupported();
    }
}
