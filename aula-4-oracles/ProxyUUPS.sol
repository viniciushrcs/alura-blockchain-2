// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title UUPS Proxy
 * @dev Este proxy aponta para um contrato de lógica que gerencia suas próprias atualizações.
 */
contract ProxyUUPS {
    // Armazena o endereço do contrato de lógica
    address private _implementation;

    constructor(address initialImplementation) {
        _implementation = initialImplementation;
    }

    /**
     * @dev Delegates chamadas ao contrato de lógica usando delegatecall.
     */
    fallback() external payable {
        address impl = _implementation;
        require(impl != address(0), "Proxy: Implementation is not set");

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