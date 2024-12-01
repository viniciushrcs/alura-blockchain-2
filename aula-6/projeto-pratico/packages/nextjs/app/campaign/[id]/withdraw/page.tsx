"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const MULTISIG_ADDRESS = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
export const MULTISIG_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_requiredApprovals",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_campaignContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "transactionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "TransactionApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "transactionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "executor",
        type: "address",
      },
    ],
    name: "TransactionExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "transactionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransactionProposed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvals",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_transactionId",
        type: "uint256",
      },
    ],
    name: "approveTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_transactionId",
        type: "uint256",
      },
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "owners",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "proposeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requiredApprovals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "transactionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transactions",
    outputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "executed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "approvals",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function RequestWithdrawal() {
  const [recipient, setRecipient] = useState("");
  const [value, setValue] = useState("");
  const [campaignId, setCampaignId] = useState("");

  const { writeContract, isPending, data: transactionHash, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const handleProposeTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    writeContract({
      address: MULTISIG_ADDRESS,
      abi: MULTISIG_ABI,
      functionName: "proposeTransaction",
      args: [recipient, BigInt(value), parseInt(campaignId, 10)],
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Solicitar Saque</h1>
      <form onSubmit={handleProposeTransaction} className="space-y-4">
        <div>
          <label htmlFor="campaignId" className="block text-sm font-medium">
            ID da Campanha
          </label>
          <input
            id="campaignId"
            type="number"
            value={campaignId}
            onChange={e => setCampaignId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium">
            Destinatário
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-sm font-medium">
            Valor (em WEI)
          </label>
          <input
            id="value"
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded" disabled={isPending || isConfirming}>
          {isPending ? "Processando..." : isConfirming ? "Aguardando Confirmação..." : "Solicitar Saque"}
        </button>
      </form>
      {transactionHash && (
        <div className="mt-4">
          <p>Hash da Transação: {transactionHash}</p>
        </div>
      )}
      {isConfirmed && <p className="text-green-600 mt-4">Solicitação enviada com sucesso!</p>}
      {error && <p className="text-red-600 mt-4">{(error as Error).message}</p>}
    </div>
  );
}
