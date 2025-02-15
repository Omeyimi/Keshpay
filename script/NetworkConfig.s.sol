// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";

contract NetworkConfig is Script {
    struct NetworkAddresses {
        address usdc;
        address usdt;
        address dai;
        address usdcPriceFeed;
        address usdtPriceFeed;
        address daiPriceFeed;
    }

    function getNetworkAddresses() public view returns (NetworkAddresses memory) {
<<<<<<< HEAD
        if (block.chainid == 1) {
            // Mainnet
=======
        if (block.chainid == 1) { // Mainnet
>>>>>>> main
            return NetworkAddresses({
                usdc: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,
                usdt: 0xdAC17F958D2ee523a2206206994597C13D831ec7,
                dai: 0x6B175474E89094C44Da98b954EedeAC495271d0F,
                usdcPriceFeed: 0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6,
                usdtPriceFeed: 0x3E7d1eAB13ad0104d2750B8863b489D65364e32D,
                daiPriceFeed: 0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
            });
<<<<<<< HEAD
        } else {
            // Sepolia
=======
        } else { // Sepolia
>>>>>>> main
            return NetworkAddresses({
                usdc: 0x07865C6E87B9481254600021E6deE3623714759D,
                usdt: 0x14835823e697857439f257094d85C25279859288,
                dai: 0x7736d0C9E4649058209f02C06f499652b31456C2,
                usdcPriceFeed: 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E,
                usdtPriceFeed: 0x55ec7c3ed0d7CB5DF4d3d8bfEd2ecaf28b4638fb,
                daiPriceFeed: 0x14866185B1962B63C3Ea9E03Bc1da838bab34C19
            });
        }
    }
<<<<<<< HEAD
}
=======
} 
>>>>>>> main
