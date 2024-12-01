// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Logic Contract V1
 * @dev Primeira versão da lógica para armazenar e recuperar valores.
 */
contract LogicContractV1 {
    // Armazena um valor simples
    uint256 private _value;

    /**
     * @dev Atualiza o valor armazenado.
     * @param newValue Novo valor a ser armazenado.
     */
    function setValue(uint256 newValue) public {
        _value = newValue;
    }

    /**
     * @dev Retorna o valor armazenado.
     */
    function getValue() public view returns (uint256) {
        return _value;
    }
}