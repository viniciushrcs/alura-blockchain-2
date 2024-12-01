class Validator {
    constructor(name, stake) {
        this.name = name; // Nome do validador
        this.stake = stake; // Tokens em staking
    }
}

class Block {
    constructor(index, data, validator) {
        this.index = index; // Posição do bloco
        this.timestamp = new Date().toISOString(); // Hora de criação
        this.data = data; // Dados do bloco
        this.validator = validator; // Validador escolhido
        this.hash = this.calculateHash(); // Hash do bloco
    }

    calculateHash() {
        return require('crypto')
            .createHash('sha256')
            .update(this.index + this.timestamp + JSON.stringify(this.data) + this.validator.name)
            .digest('hex');
    }
}

class Blockchain {
    constructor(validators) {
        this.chain = [this.createGenesisBlock()]; // Bloco inicial
        this.validators = validators; // Lista de validadores
    }

    createGenesisBlock() {
        return new Block(0, 'Bloco Gênesis', { name: 'Sistema' });
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    selectValidator() {
        // Seleção aleatória ponderada
        const totalStake = this.validators.reduce((sum, val) => sum + val.stake, 0);
        let random = Math.random() * totalStake;

        for (const validator of this.validators) {
            if (random < validator.stake) {
                return validator;
            }
            random -= validator.stake;
        }
    }

    addBlock(data) {
        const selectedValidator = this.selectValidator(); // Seleciona o validador
        const previousBlock = this.getLatestBlock();
        const newBlock = new Block(this.chain.length, data, selectedValidator);
        this.chain.push(newBlock); // Adiciona o bloco à cadeia

        console.log(`✅ Bloco ${newBlock.index} validado por: ${selectedValidator.name}`);
        console.log(`Hash: ${newBlock.hash}\n`);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Verifica se o hash do bloco atual é válido
            if (currentBlock.hash !== currentBlock.calculateHash()) return false;

            // Verifica se o bloco atual aponta corretamente para o anterior
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

// Criando validadores
const validators = [
    new Validator('Alice', 50),
    new Validator('Bob', 30),
    new Validator('Charlie', 20),
];

const myBlockchain = new Blockchain(validators);

console.log('⛓️  Criando Blockchain com Prova de Participação (PoS)...\n');

// Adicionando blocos
myBlockchain.addBlock({ transactions: ['Alice envia 10 tokens para Bob'] });
myBlockchain.addBlock({ transactions: ['Charlie envia 5 tokens para Alice'] });
myBlockchain.addBlock({ transactions: ['Bob envia 3 tokens para Charlie'] });

console.log('⛓️  A Blockchain é válida?', myBlockchain.isChainValid());