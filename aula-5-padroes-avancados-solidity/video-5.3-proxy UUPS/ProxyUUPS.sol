// https://remix-ide.readthedocs.io/en/latest/run_proxy_contracts.html

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/**
 * @title LogicContractV1
 * @dev Um contrato simples que utiliza o padrão UUPS para upgrades.
 */
contract LogicContractV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 private _value;

    // Evento emitido quando o valor é atualizado
    event ValueUpdated(address indexed updater, uint256 oldValue, uint256 newValue);

    /**
     * @dev Inicializador do contrato. Deve ser chamado apenas uma vez.
     */
    function initialize(address owner) public initializer {
        __Ownable_init(owner);
        __UUPSUpgradeable_init();
    }

    /**
     * @dev Atualiza o valor armazenado.
     * @param newValue Novo valor a ser armazenado.
     */
    function setValue(uint256 newValue) public {
        uint256 oldValue = _value;
        _value = newValue;
        emit ValueUpdated(msg.sender, oldValue, newValue);
    }

    /**
     * @dev Retorna o valor armazenado.
     */
    function getValue() public view returns (uint256) {
        return _value;
    }

    /**
     * @dev Exigido pelo padrão UUPS para autorizar upgrades.
     * Apenas o proprietário pode realizar upgrades.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

contract LogicContractV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 private _value;

    event ValueUpdated(address indexed updater, uint256 oldValue, uint256 newValue);

    function initialize(address owner) public initializer {
        __Ownable_init(owner);
        __UUPSUpgradeable_init();
    }

    function setValue(uint256 newValue) public {
        uint256 oldValue = _value;
        _value = newValue * 2; // Lógica alterada: valor é dobrado
        emit ValueUpdated(msg.sender, oldValue, _value);
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}


contract UUPSProxy {
    constructor(address logic, bytes memory data) payable {
        // Implanta o proxy com a lógica inicial e chama a função initialize
        new ERC1967Proxy(logic, data);
    }
}
