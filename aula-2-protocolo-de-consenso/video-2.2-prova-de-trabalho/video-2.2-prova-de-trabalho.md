# Prova de Trabalho (PoW)  

## Introdução  
A **Prova de Trabalho (PoW)** foi o primeiro protocolo de consenso amplamente utilizado em blockchains. Introduzido pelo Bitcoin, ele é o mecanismo que permite que a rede valide transações e adicione blocos à cadeia de forma descentralizada e segura.  

---

## O que é a Prova de Trabalho (PoW)?  
O PoW exige que os participantes da rede, chamados de **mineradores**, resolvam problemas matemáticos complexos. Esse processo consome poder computacional significativo, criando uma barreira contra atividades maliciosas.  

### Objetivos do PoW  
1. **Validação de Blocos:** Garantir que apenas transações legítimas sejam adicionadas à blockchain.  
2. **Segurança:** Dificultar ataques, tornando-os computacional e economicamente inviáveis.  
3. **Descentralização:** Incentivar a participação de múltiplos nós independentes na rede.  

---

## Como Funciona o PoW?  

### Passo-a-Passo  
1. **Agrupamento de Transações:** Os mineradores agrupam transações em um bloco.  
2. **Resolução de Problema:** Eles competem para encontrar um número (nonce) que, combinado com os dados do bloco, gera um hash que atende a critérios específicos (ex.: começa com um número de zeros).  
3. **Validação pela Rede:** O primeiro minerador a encontrar a solução transmite o bloco para a rede.  
4. **Verificação:** Os nós verificam a validade do bloco antes de adicioná-lo à blockchain.  

### Exemplo Prático  
Se um minerador tenta alterar um bloco antigo, ele precisaria recalcular todos os hashes subsequentes, o que é inviável devido ao custo computacional.  

---

## Segurança no PoW  

1. **Custo de Mineração:** O PoW torna ataques, como o de 51%, extremamente caros, pois exigem controle de mais da metade do poder computacional da rede.  
2. **Imutabilidade:** Qualquer alteração em um bloco exigiria o reprocessamento de todos os blocos posteriores.  

---

## Aplicações no Ethereum  

Antes da transição para PoS, o Ethereum utilizava o PoW como mecanismo de consenso. Apesar de eficiente em termos de segurança, o alto consumo energético e o impacto ambiental levaram o Ethereum a adotar o PoS.  

---

## Impacto Energético  

1. **Consumo de Energia:** O PoW exige grande poder computacional, levando a um consumo elevado de eletricidade.  
2. **Sustentabilidade:** Esse consumo é uma das críticas mais comuns ao PoW, impulsionando a busca por alternativas como o PoS.  

---

## Conclusão  

A Prova de Trabalho é um dos pilares fundamentais da blockchain, oferecendo segurança robusta e descentralização. Embora tenha suas limitações, como o consumo energético elevado, ela continua sendo amplamente utilizada em redes como o Bitcoin.  

No próximo vídeo, veremos como a **Prova de Participação (PoS)** aborda essas limitações e oferece uma alternativa mais sustentável para blockchains modernas.  