// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Transparent Proxy
 * @dev Este contrato atua como um intermediário que delega chamadas a um contrato de lógica
 *      utilizando a função delegatecall. Apenas o administrador pode atualizar o contrato de lógica.
 */
contract ProxyTransparent {
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
     * @dev Delegates chamadas ao contrato de lógica usando delegatecall.
     */
    fallback() external payable {
        address impl = _implementation;
        require(impl != address(0), "Proxy: Implementation is not set");

        // Delegatecall para o contrato de lógica
        (bool success, bytes memory data) = impl.delegatecall(msg.data);
        require(success, "Proxy: Delegatecall failed");

        assembly {
            return(add(data, 0x20), mload(data))
        }
    }

    /**
     * @dev Permite receber ETH no fallback.
     */
    receive() external payable {}
}