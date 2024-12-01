"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ABI_CAMPAIGN, CONTRACT_ADDRESS_CAMPAIGN } from "~~/app/init/page";

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const { writeContract, isPending, data: transactionHash, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    writeContract({
      address: CONTRACT_ADDRESS_CAMPAIGN,
      abi: CONTRACT_ABI_CAMPAIGN,
      functionName: "createCampaign",
      args: [title, description, BigInt(goal)],
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Create a New Campaign</h1>
      <form onSubmit={handleCreateCampaign} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="goal" className="block text-sm font-medium">
            Goal (in WEI)
          </label>
          <input
            id="goal"
            type="number"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded" disabled={isPending}>
          {isPending ? "Processing..." : "Create Campaign"}
        </button>
      </form>
      {transactionHash && (
        <div className="mt-4">
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
      {isConfirming && <p className="text-yellow-600">Waiting for confirmation...</p>}
      {isConfirmed && <p className="text-green-600">Transaction confirmed!</p>}
      {error && <p className="text-red-600">{(error as Error).message}</p>}
    </div>
  );
}
