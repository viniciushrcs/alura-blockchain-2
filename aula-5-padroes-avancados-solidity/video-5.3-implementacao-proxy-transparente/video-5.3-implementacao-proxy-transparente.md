# Implementação de um Contrato Proxy Transparente  

## Introdução  
Neste material, aprenderemos a implementar um contrato proxy transparente que permite atualizar a lógica de um contrato inteligente sem perder o estado.  

---

## Código: Primeira Versão do Contrato  

### 1. Contrato de Lógica (LógicaInicial.sol)  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract LógicaInicial {
    uint256 public contador;

    function incrementar() public {
        contador += 1;
    }

    function resetar() public {
        contador = 0;
    }
}
```

2. Contrato Proxy Transparente (ProxyTransparente.sol)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ProxyTransparente {
    address public administrador;
    address public implementaçãoAtual;

    constructor(address _implementaçãoInicial) {
        administrador = msg.sender;
        implementaçãoAtual = _implementaçãoInicial;
    }

    modifier apenasAdministrador() {
        require(msg.sender == administrador, "Somente o administrador pode executar esta função");
        _;
    }

    function atualizarImplementação(address novaImplementação) public apenasAdministrador {
        implementaçãoAtual = novaImplementação;
    }

    fallback() external payable {
        (bool sucesso, ) = implementaçãoAtual.delegatecall(msg.data);
        require(sucesso, "Delegatecall falhou");
    }

    receive() external payable {}
}
```


3. Nova Lógica (LógicaAtualizada.sol)
4. 
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract LógicaAtualizada {
    uint256 public contador;

    function incrementar() public {
        contador += 2; // Agora incrementa em 2.
    }

    function resetar() public {
        contador = 0;
    }
}
```

Passo-a-Passo

	1.	Deploy do Contrato de Lógica Inicial e Proxy:
	•	Faça o deploy do LógicaInicial.sol e copie o endereço.
	•	Deploy o ProxyTransparente.sol, passando o endereço do contrato inicial como parâmetro no construtor.
	2.	Interação com o Proxy:
	•	Interaja com o proxy para chamar funções do contrato inicial.
	3.	Atualização da Lógica:
	•	Faça o deploy do LógicaAtualizada.sol e copie o endereço.
	•	Chame atualizarImplementação no proxy, passando o novo endereço como parâmetro.
	4.	Testando a Nova Lógica:
	•	Interaja com o proxy novamente e observe o comportamento atualizado.

Conclusão

Com o padrão Proxy Transparente, aprendemos a implementar contratos atualizáveis no Ethereum. Esse padrão é amplamente utilizado para manter contratos flexíveis e seguros ao longo do tempo.

