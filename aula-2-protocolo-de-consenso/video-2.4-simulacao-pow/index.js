const crypto = require('crypto');

// Classe para representar um bloco na blockchain
class Block {
    constructor(index, timestamp, data, previousHash = '', difficulty = 4) {
        this.index = index; // Posição do bloco na cadeia
        this.timestamp = timestamp; // Hora de criação do bloco
        this.data = data; // Dados do bloco, como transações
        this.previousHash = previousHash; // Hash do bloco anterior
        this.hash = ''; // Hash do bloco atual
        this.nonce = 0; // Nonce usado para encontrar o hash válido
        this.difficulty = difficulty; // Dificuldade do PoW
    }

    // Gera o hash do bloco com base em seus dados
    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');
    }

    // Realiza a mineração do bloco até encontrar um hash válido
    mineBlock() {
        const startTime = Date.now(); // Início da mineração
        const prefix = '0'.repeat(this.difficulty);
        console.log(`⛏️  Minerando bloco ${this.index} com dificuldade ${this.difficulty}...`);
        while (!this.hash.startsWith(prefix)) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        const endTime = Date.now(); // Fim da mineração
        console.log(`✅ Bloco ${this.index} minerado: ${this.hash}`);
        console.log(`⏱️  Tempo de mineração: ${(endTime - startTime) / 1000} segundos\n`);
    }
}

// Classe para representar a blockchain
class Blockchain {
    constructor(difficulty = 4) {
        this.chain = [this.createGenesisBlock()]; // Inicializa com o bloco gênesis
        this.difficulty = difficulty; // Define a dificuldade para todos os blocos
    }

    // Cria o bloco inicial (gênesis)
    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), 'Bloco Gênesis', '0', this.difficulty);
    }

    // Retorna o último bloco da cadeia
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Adiciona um novo bloco à cadeia
    addBlock(data) {
        const previousBlock = this.getLatestBlock();
        const newBlock = new Block(
            this.chain.length,
            new Date().toISOString(),
            data,
            previousBlock.hash,
            this.difficulty
        );
        newBlock.mineBlock(); // Minerar o bloco
        this.chain.push(newBlock);
    }

    // Verifica se a blockchain está íntegra
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Verifica se o hash do bloco é válido
            if (currentBlock.hash !== currentBlock.calculateHash()) return false;

            // Verifica se o bloco aponta corretamente para o anterior
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

// Inicialização da blockchain
const myBlockchain = new Blockchain(6);

console.log('⛓️  Criando Blockchain...\n');

// Adicionando novos blocos
myBlockchain.addBlock({ transactions: ['Alice envia 5 BTC para Bob'] });
myBlockchain.addBlock({ transactions: ['Bob envia 2 BTC para Charlie'] });
myBlockchain.addBlock({ transactions: ['Charlie envia 1 BTC para Alice'] });

// Verificando a integridade da blockchain
console.log('⛓️  A Blockchain é válida?', myBlockchain.isChainValid());