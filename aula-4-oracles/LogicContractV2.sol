// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Logic Contract V2
 * @dev Segunda versão da lógica, adiciona multiplicação ao valor armazenado.
 */
contract LogicContractV2 {
    uint256 private _value;

    function setValue(uint256 newValue) public {
        _value = newValue;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function multiplyValue(uint256 multiplier) public {
        _value *= multiplier;
    }
}