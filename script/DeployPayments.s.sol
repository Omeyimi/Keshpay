// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Payments} from "../src/Payments.sol";
import {NetworkConfig} from "./NetworkConfig.s.sol";

contract DeployPayments is Script {
    function run() external returns (Payments) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        NetworkConfig networkConfig = new NetworkConfig();
        Payments payments = new Payments(address(networkConfig));

        vm.stopBroadcast();
        return payments;
    }
}
