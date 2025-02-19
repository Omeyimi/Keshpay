// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockFlags {
    mapping(address => bool) private flags;

    function getFlag(address) external pure returns (bool) {
        return false; // Default to false (feeds working)
    }

    function setFlag(address _flag, bool _value) external {
        flags[_flag] = _value;
    }
}
