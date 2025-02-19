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

    function getNetworkAddresses() public view returns (NetworkAddresses memory) {
        if (block.chainid == 42161) {
            // Arbitrum One
            return NetworkAddresses({
                usdc: 0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8,
                usdt: 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9,
                dai: 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1,
                usdcPriceFeed: 0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3,
                usdtPriceFeed: 0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7,
                daiPriceFeed: 0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB
            });
        } else if (block.chainid == 421614) {
            // Arbitrum Sepolia
            return NetworkAddresses({
                usdc: 0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d,
                usdt: 0x80EDee6f667eCc9f63a0a6f55578F870651f06A4,
                dai: 0xc22f0C8e910e5DB11Fe5Db1f5a809d1F432f6D25,
                usdcPriceFeed: 0x0153002d20B96532C639313c2d54c3dA09109309,
                usdtPriceFeed: 0x332BB5D9a4D539A32e559B71F9eb6b38935c5a57,
                daiPriceFeed: 0xb113F5A928BCfF189C998ab20d753a47F9dE5A61
            });
        }
        revert NetworkConfig__NetworkNotSupported();
    }
}
