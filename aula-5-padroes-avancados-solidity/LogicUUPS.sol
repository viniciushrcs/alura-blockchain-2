// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract UUPS {
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "UUPS: Caller is not the owner");
        _;
    }

    function upgradeTo(address newImplementation) external onlyOwner {
        require(newImplementation != address(0), "UUPS: Invalid address");
        assembly {
            sstore(0x00, newImplementation)
        }
    }
}

/**
 * @title LogicUUPS V1
 * @dev Primeira versão do contrato de lógica para armazenar e recuperar valores.
 */
contract LogicUUPSV1 is UUPS {
    uint256 private _value;

    function setValue(uint256 newValue) public {
        _value = newValue;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }
}

/**
 * @title LogicUUPS V2
 * @dev Segunda versão do contrato de lógica, adiciona multiplicação ao valor armazenado.
 */
contract LogicUUPSV2 is UUPS {
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