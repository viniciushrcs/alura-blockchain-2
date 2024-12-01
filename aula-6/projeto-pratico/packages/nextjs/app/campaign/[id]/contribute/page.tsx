"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ABI_CAMPAIGN, CONTRACT_ADDRESS_CAMPAIGN } from "~~/app/init/page";

type Params = {
  id: string;
};

export default function ContributeToCampaign() {
  const params = useParams() as Params;
  const campaignId = params?.id ? parseInt(params.id, 10) : null;

  const [contribution, setContribution] = useState("");
  const { writeContract, isPending, data: transactionHash, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignId || !contribution) {
      return alert("Invalid campaign ID or contribution amount.");
    }

    writeContract({
      address: CONTRACT_ADDRESS_CAMPAIGN,
      abi: CONTRACT_ABI_CAMPAIGN,
      functionName: "contribute",
      args: [BigInt(campaignId)],
      value: BigInt(contribution), // Contribuição em wei
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Contribute to Campaign #{campaignId}</h1>
      <form onSubmit={handleContribute} className="mt-4 space-y-4">
        <div>
          <label htmlFor="contribution" className="block text-sm font-medium">
            Contribution Amount (in WEI)
          </label>
          <input
            id="contribution"
            type="number"
            value={contribution}
            onChange={e => setContribution(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded" disabled={isPending}>
          {isPending ? "Processing..." : "Contribute"}
        </button>
      </form>
      {transactionHash && (
        <div className="mt-4">
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
      {isConfirming && <p className="text-yellow-600">Waiting for confirmation...</p>}
      {isConfirmed && <p className="text-green-600">Contribution successful!</p>}
      {error && <p className="text-red-600">{(error as Error).message}</p>}
    </div>
  );
}
