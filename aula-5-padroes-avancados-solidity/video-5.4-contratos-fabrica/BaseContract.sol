// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseContract {
    address public creator;
    uint256 public initialValue;

    constructor(address _creator, uint256 _initialValue) {
        creator = _creator;
        initialValue = _initialValue;
    }
}