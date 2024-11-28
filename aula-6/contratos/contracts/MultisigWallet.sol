// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract MultisigWallet {
    address[] public owners;
    uint256 public requiredApprovals;
    address public campaignContract; // Endereço do contrato Campaign autorizado

    struct Transaction {
        address recipient; 
        uint256 value;
        bool executed;
        uint256 approvals;
        uint256 campaignId; // ID da campanha relacionada
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public approvals;
    uint256 public transactionCount;

    event TransactionProposed(uint256 indexed transactionId, address indexed proposer, address indexed to, uint256 value);
    event TransactionApproved(uint256 indexed transactionId, address indexed owner);
    event TransactionExecuted(uint256 indexed transactionId, address indexed executor);

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Caller is not an owner");
        _;
    }

    constructor(address[] memory _owners, uint256 _requiredApprovals, address _campaignContract) {
        require(_owners.length > 0, "Owners required");
        require(_requiredApprovals > 0 && _requiredApprovals <= _owners.length, "Invalid number of required approvals");
        require(_campaignContract != address(0), "Invalid campaign contract address");

        owners = _owners;
        requiredApprovals = _requiredApprovals;
        campaignContract = _campaignContract;
    }

    function proposeTransaction(
        address _recipient,
        uint256 _value,
        uint256 _campaignId
    ) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient address");
        require(_value > 0, "Value must be greater than zero");

        transactionCount++;
        transactions[transactionCount] = Transaction({
            recipient: _recipient,
            value: _value,
            executed: false,
            approvals: 0,
            campaignId: _campaignId
        });

        emit TransactionProposed(transactionCount, msg.sender, _recipient, _value);
    }

    function approveTransaction(uint256 _transactionId) external onlyOwner {
        Transaction storage transaction = transactions[_transactionId];
        require(!transaction.executed, "Transaction already executed");
        require(!approvals[_transactionId][msg.sender], "Transaction already approved by this owner");

        transaction.approvals++;
        approvals[_transactionId][msg.sender] = true;

        emit TransactionApproved(_transactionId, msg.sender);
    }

    function executeTransaction(uint256 _transactionId) external onlyOwner {
        Transaction storage transaction = transactions[_transactionId];
        require(!transaction.executed, "Transaction already executed");
        require(transaction.approvals >= requiredApprovals, "Not enough approvals");

        transaction.executed = true;

        // Chama a função `releaseFunds` no contrato Campaign
        (bool success, ) = campaignContract.call(
            abi.encodeWithSignature(
                "releaseFunds(uint256,address,uint256)",
                transaction.campaignId,
                transaction.recipient,
                transaction.value
            )
        );
        require(success, "Transaction execution failed");

        emit TransactionExecuted(_transactionId, msg.sender);
    }
}