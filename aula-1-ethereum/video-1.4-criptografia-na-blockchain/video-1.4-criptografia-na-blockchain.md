# Criptografia na Blockchain  

## Introdução  
A criptografia é o coração da segurança em blockchains. Ela garante que as informações sejam autênticas, íntegras e seguras, possibilitando transações confiáveis em uma rede descentralizada. Neste material, exploraremos como **funções de hash**, **chaves públicas e privadas** e **assinaturas digitais** trabalham juntas para proteger dados e transações na blockchain.  

---

## Funções de Hash  

### O que são Funções de Hash?  
Funções de hash são algoritmos que transformam dados de qualquer tamanho em uma sequência fixa de caracteres chamada de **hash**. Essas funções são amplamente utilizadas na blockchain para garantir a integridade dos dados.  

#### Características das Funções de Hash:  
1. **Determinísticas:** A mesma entrada sempre gera a mesma saída.  
2. **Unidirecionais:** É impraticável deduzir a entrada original a partir do hash.  
3. **Sensíveis a Alterações:** Pequenas mudanças na entrada resultam em hashes completamente diferentes.  

### Aplicações na Blockchain  
- **Integridade:** Garante que os dados não foram alterados.  
- **Mineração:** Utilizadas no cálculo de provas de trabalho (PoW).  
- **Endereços:** Geram identificadores únicos para contas e transações.  

---

## Chaves Públicas e Privadas  

### O que são Chaves Públicas e Privadas?  
A blockchain utiliza **criptografia assimétrica**, que se baseia em pares de chaves:  
- **Chave Pública:** Serve como identificador público e é usada para verificar assinaturas.  
- **Chave Privada:** Deve ser mantida em segredo absoluto e é usada para assinar transações.  

### Como Funcionam?  
1. A chave privada gera uma assinatura digital para autenticar transações.  
2. A chave pública permite que qualquer pessoa verifique a validade dessa assinatura.  

### Exemplo Prático  
- João utiliza sua chave privada para assinar uma transação.  
- Maria usa a chave pública de João para verificar que a assinatura é válida.  

---

## Assinaturas Digitais  

### O que é uma Assinatura Digital?  
Uma assinatura digital é um esquema matemático que garante que uma mensagem ou transação:  
1. **Veio do remetente pretendido.**  
2. **Não foi alterada durante a transmissão.**  

### Como Funcionam as Assinaturas Digitais?  
1. O remetente cria um hash da mensagem.  
2. O hash é criptografado com a chave privada do remetente, gerando a assinatura.  
3. O destinatário verifica o hash usando a chave pública do remetente.  

---

## Importância da Criptografia na Blockchain  

### Segurança  
- **Proteção de Transações:** Apenas o dono da chave privada pode autorizar movimentações.  
- **Confiança:** Garante que os dados são confiáveis, mesmo sem intermediários.  

### Integridade  
- **Imutabilidade:** Uma vez gravados, os dados não podem ser alterados sem que toda a rede perceba.  

### Autenticidade  
- **Assinaturas Digitais:** Garantem que transações são realizadas pelos verdadeiros proprietários das contas.  

---

## Conclusão  

A criptografia é o pilar da segurança da blockchain, garantindo que dados e transações sejam protegidos e confiáveis. Funções de hash garantem a integridade dos dados, enquanto chaves públicas, privadas e assinaturas digitais fornecem autenticação e proteção.  

Na próxima aula, exploraremos os **protocolos de consenso**, entendendo como eles trabalham para garantir que a blockchain permaneça segura, confiável e descentralizada.