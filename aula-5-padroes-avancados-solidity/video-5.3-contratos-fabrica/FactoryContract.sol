// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseContract.sol";

contract FactoryContract {
    // Lista de endereços de contratos criados
    address[] public deployedContracts;

    // Evento para registrar a criação de novos contratos
    event ContractCreated(address indexed creator, address contractAddress, uint256 initialValue);

    /**
     * @dev Cria uma nova instância do BaseContract e a registra.
     * @param _initialValue Valor inicial a ser armazenado no contrato criado.
     */
    function createContract(uint256 _initialValue) external {
        // Cria uma nova instância do contrato base
        BaseContract newContract = new BaseContract(msg.sender, _initialValue);

        // Adiciona o endereço do contrato criado à lista
        deployedContracts.push(address(newContract));

        // Emite um evento com os detalhes do contrato criado
        emit ContractCreated(msg.sender, address(newContract), _initialValue);
    }

    /**
     * @dev Retorna todos os contratos criados.
     * @return Uma lista de endereços de contratos criados.
     */
    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }
}