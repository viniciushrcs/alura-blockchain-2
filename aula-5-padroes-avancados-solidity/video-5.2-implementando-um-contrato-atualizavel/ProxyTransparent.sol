// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title LogicContractV1
 * @dev Primeira versão da lógica para armazenar e recuperar valores.
 */
contract LogicContractV1 {
    // Armazena um valor simples
    uint256 private _value;

    // Evento emitido quando o valor é atualizado
    event ValueUpdated(address indexed updater, uint256 oldValue, uint256 newValue);

    /**
     * @dev Atualiza o valor armazenado.
     * @param newValue Novo valor a ser armazenado.
     */
    function setValue(uint256 newValue) public {
        uint256 oldValue = _value; // Armazena o valor antigo para o evento
        _value = newValue;
        emit ValueUpdated(msg.sender, oldValue, newValue); // Emite o evento com detalhes
    }

    /**
     * @dev Retorna o valor armazenado.
     * @return O valor atualmente armazenado.
     */
    function getValue() public view returns (uint256) {
        return _value;
    }
}

contract ProxyTransparent {
    // Armazena um valor simples (compartilhado com a lógica)
    uint256 private _value;

    // Endereço do contrato de implementação (lógica)
    address private _implementation;

    // Endereço do administrador responsável pelas atualizações
    address private _admin;


    /**
     * @dev Construtor para configurar o administrador e a implementação inicial.
     * @param initialImplementation Endereço do contrato de lógica inicial.
     */
    constructor(address initialImplementation) {
        _admin = msg.sender;
        _implementation = initialImplementation;
    }

    /**
     * @dev Modificador para restringir funções apenas ao administrador.
     */
    modifier onlyAdmin() {
        require(msg.sender == _admin, "Proxy: Caller is not the admin");
        _;
    }

    /**
     * @dev Atualiza o contrato de implementação (lógica).
     * @param newImplementation Endereço do novo contrato de lógica.
     */
    function upgrade(address newImplementation) external onlyAdmin {
        require(newImplementation != address(0), "Proxy: Invalid address");
        _implementation = newImplementation;
    }

    /**
     * @dev Retorna o endereço do contrato de lógica atual.
     */
    function implementation() external view onlyAdmin returns (address) {
        return _implementation;
    }

    /**
     * @dev Retorna o valor armazenado.
     * Essa função lê diretamente o estado armazenado no Proxy.
     */
    function getValue() external view returns (uint256) {
        return _value;
    }

    // Fallback redireciona chamadas para o contrato de lógica
    fallback() external payable {
        (bool success, ) = _implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }

    // Função para receber ETH
    receive() external payable {}
}

contract LogicContractV2 {
    uint256 private _value;

    function setValue(uint256 newValue) public {
        _value = newValue * 2;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function multiplyValue(uint256 multiplier) public {
        _value *= multiplier;
    }
}