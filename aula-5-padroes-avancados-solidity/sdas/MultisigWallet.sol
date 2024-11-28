// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MultisigWallet {
    address[] public signatários;
    uint256 public quórum;

    struct Transação {
        address destino;
        uint256 valor;
        bytes dados;
        bool executada;
        uint256 aprovações;
    }

    Transação[] public transações;

    mapping(uint256 => mapping(address => bool)) public aprovadores;

    event TransaçãoProposta(uint256 índice, address destino, uint256 valor);
    event TransaçãoAprovada(uint256 índice, address signatário);
    event TransaçãoExecutada(uint256 índice, address destino, uint256 valor);

    modifier apenasSignatários() {
        require(éSignatário(msg.sender), "Apenas signatários podem executar esta função");
        _;
    }

    constructor(address[] memory _signatários, uint256 _quórum) {
        require(_signatários.length > 0, "Deve haver pelo menos um signatário");
        require(
            _quórum > 0 && _quórum <= _signatários.length,
            "O quórum deve ser válido"
        );

        signatários = _signatários;
        quórum = _quórum;
    }

    function éSignatário(address _endereço) public view returns (bool) {
        for (uint256 i = 0; i < signatários.length; i++) {
            if (signatários[i] == _endereço) {
                return true;
            }
        }
        return false;
    }

    function proporTransação(
        address _destino,
        uint256 _valor,
        bytes memory _dados
    ) public apenasSignatários {
        transações.push(Transação({
            destino: _destino,
            valor: _valor,
            dados: _dados,
            executada: false,
            aprovações: 0
        }));

        emit TransaçãoProposta(transações.length - 1, _destino, _valor);
    }

    function aprovarTransação(uint256 índice) public apenasSignatários {
        Transação storage transação = transações[índice];

        require(!transação.executada, "Transação já executada");
        require(!aprovadores[índice][msg.sender], "Signatário já aprovou");

        aprovadores[índice][msg.sender] = true;
        transação.aprovações++;

        emit TransaçãoAprovada(índice, msg.sender);
    }

    function executarTransação(uint256 índice) public apenasSignatários {
        Transação storage transação = transações[índice];

        require(!transação.executada, "Transação já executada");
        require(transação.aprovações >= quórum, "Quórum insuficiente");

        transação.executada = true;

        (bool sucesso, ) = transação.destino.call{value: transação.valor}(
            transação.dados
        );
        require(sucesso, "Transação falhou");

        emit TransaçãoExecutada(índice, transação.destino, transação.valor);
    }

    receive() external payable {}
}