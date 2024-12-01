"use client";

import Link from "next/link";
import { useReadContract, useReadContracts } from "wagmi";
import { MULTISIG_ABI, MULTISIG_ADDRESS } from "~~/app/campaign/[id]/withdraw/page";

type Transaction = {
  recipient: string;
  value: bigint;
  executed: boolean;
  approvals: number;
  campaignId: number;
};

export default function Transactions() {
  // Read the total number of transactions
  const { data: transactionCount, isError: countError } = useReadContract({
    address: MULTISIG_ADDRESS,
    abi: MULTISIG_ABI,
    functionName: "transactionCount",
  });

  // Fetch all transactions
  const transactions = Array.from({ length: Number(transactionCount || 0) }, (_, i) => ({
    address: MULTISIG_ADDRESS,
    abi: MULTISIG_ABI,
    functionName: "transactions",
    args: [i + 1],
  }));

  const {
    data: transactionsData,
    isError: transactionsError,
    isLoading,
  } = useReadContracts({
    contracts: transactionCount ? transactions : [],
  });

  const formattedTransactions: Transaction[] = (transactionsData || []).map(tx => {
    if (!tx || tx.error || !tx.result) return null;

    const [recipient, value, executed, approvals, campaignId] = tx.result as [string, bigint, boolean, number, number];

    return { recipient, value, executed, approvals, campaignId };
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Transações</h1>

      {isLoading && <p>Carregando transações...</p>}
      {countError || transactionsError ? (
        <p className="text-red-600">Erro ao carregar as transações.</p>
      ) : (
        <>
          <Link
            href={`/transactions/approve`}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            Aprovar
          </Link>
          <Link
            href={`/transactions/execute`}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            Executar
          </Link>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-transparent-100 border-b">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Destinatário</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Aprovações</th>
                <th className="px-4 py-2 text-left">Campanha</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {formattedTransactions.map((tx, index) => {
                if (!tx) return null;
                console.log(tx);
                const { recipient, value, executed, approvals, campaignId } = tx;

                return (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{recipient}</td>
                    <td className="px-4 py-2">{value.toString()} WEI</td>
                    <td className="px-4 py-2">{approvals.toString()}</td>
                    <td className="px-4 py-2">{campaignId.toString()}</td>
                    <td className="px-4 py-2">{executed ? "Executada" : "Pendente"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
