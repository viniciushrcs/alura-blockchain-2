# Oracles e Integração com Chainlink Price Feed  

## Introdução  

Na blockchain, os contratos inteligentes são isolados do mundo externo. Eles não têm acesso nativo a informações fora da blockchain, como preços de mercado, condições climáticas ou outros dados externos. Para preencher essa lacuna, utilizamos **Oracles**.  

Neste vídeo, aprenderemos a integrar nosso contrato inteligente com o **Chainlink Price Feed**, uma ferramenta para acessar preços confiáveis e atualizados de ativos financeiros, como ETH/USD ou BTC/USD.  

---

## O Que é o Chainlink Price Feed?  

O **Price Feed** da Chainlink é uma rede de oracles descentralizada que fornece preços precisos e atualizados de ativos financeiros diretamente na blockchain.  

**Benefícios do Price Feed:**  
- **Confiabilidade:** Baseado em dados agregados de diversas fontes.  
- **Resiliência:** Projetado para operar mesmo em cenários de alta volatilidade de mercado.  
- **Fácil Integração:** APIs simples e suporte para várias redes blockchain.  

**Exemplo de Dados Disponíveis:**  
- ETH/USD  
- BTC/USD  
- LINK/USD  

---

## Como Funciona o Price Feed da Chainlink?  

1. **Solicitação de Dados:** O contrato inteligente faz uma chamada ao contrato de Price Feed na blockchain.  
2. **Resposta com Dados On-Chain:** O contrato de Price Feed retorna o preço mais recente, armazenado e atualizado periodicamente pelos nós do oracle.  
3. **Uso dos Dados:** O contrato inteligente utiliza o preço para executar lógica programada, como calcular taxas, liquidações ou preços de produtos.  

