"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { MULTISIG_ABI, MULTISIG_ADDRESS } from "~~/app/campaign/[id]/withdraw/page";

export default function ApproveTransaction() {
  const [transactionId, setTransactionId] = useState("");
  const { writeContract, isPending, data: transactionHash, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const handleApproveTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    writeContract({
      address: MULTISIG_ADDRESS,
      abi: MULTISIG_ABI,
      functionName: "approveTransaction",
      args: [parseInt(transactionId, 10)],
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Aprovar Transação</h1>
      <form onSubmit={handleApproveTransaction} className="space-y-4">
        <div>
          <label htmlFor="transactionId" className="block text-sm font-medium">
            ID da Transação
          </label>
          <input
            id="transactionId"
            type="number"
            value={transactionId}
            onChange={e => setTransactionId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded" disabled={isPending || isConfirming}>
          {isPending ? "Processando..." : isConfirming ? "Aguardando Confirmação..." : "Aprovar Transação"}
        </button>
      </form>
      {transactionHash && (
        <div className="mt-4">
          <p>Hash da Transação: {transactionHash}</p>
        </div>
      )}
      {isConfirmed && <p className="text-green-600 mt-4">Transação aprovada com sucesso!</p>}
      {error && <p className="text-red-600 mt-4">{(error as Error).message}</p>}
    </div>
  );
}
