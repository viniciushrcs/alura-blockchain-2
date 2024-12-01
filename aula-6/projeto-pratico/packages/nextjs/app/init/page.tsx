"use client";

import Link from "next/link";
import { Abi, formatEther } from "viem";
import { useReadContract, useReadContracts } from "wagmi";

export const CONTRACT_ADDRESS_CAMPAIGN = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
export const CONTRACT_ABI_CAMPAIGN = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "goal",
        type: "uint256",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ContributionReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "FundsReleased",
    type: "event",
  },
  {
    inputs: [],
    name: "campaignCount",
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
    name: "campaigns",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "goal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalContributed",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "completed",
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
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_goal",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "multisigWallet",
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
        name: "_campaignId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "releaseFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_multisigWallet",
        type: "address",
      },
    ],
    name: "setMultisigWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as Abi;

export type Campaign = {
  creator: string;
  title: string;
  description: string;
  goal: bigint;
  totalContributed: bigint;
  completed: boolean;
} | null;

export default function Home() {
  // Lê o número total de campanhas
  const {
    data: campaignCount,
    isError: countError,
    isLoading: countLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS_CAMPAIGN,
    abi: CONTRACT_ABI_CAMPAIGN,
    functionName: "campaignCount",
  });

  // Lê as campanhas
  const {
    data: campaignsData,
    isLoading: campaignsLoading,
    isError: campaignsError,
  } = useReadContracts({
    contracts: campaignCount
      ? Array.from({ length: Number(campaignCount) }, (_, i) => ({
          address: CONTRACT_ADDRESS_CAMPAIGN,
          abi: CONTRACT_ABI_CAMPAIGN,
          functionName: "campaigns",
          args: [i + 1],
        }))
      : [],
  });

  // Processa os dados das campanhas com tipos explícitos
  const formattedCampaigns: Campaign[] = (campaignsData || []).map(campaign => {
    if (!campaign || campaign.error || !campaign.result) return null; // Ignora resultados inválidos

    const [creator, title, description, goal, totalContributed, completed] = campaign.result as [
      string,
      string,
      string,
      bigint,
      bigint,
      boolean,
    ];

    return {
      creator,
      title,
      description,
      goal,
      totalContributed,
      completed,
    };
  });

  if (countLoading || campaignsLoading) {
    return <p>Carregando campanhas...</p>;
  }

  if (countError || campaignsError) {
    return <p className="text-red-600">Erro ao carregar campanhas.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Campanhas Ativas</h1>
      <Link href="/create" className="text-blue-500 underline">
        Criar Nova Campanha
      </Link>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {formattedCampaigns.map((campaign, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{campaign?.title}</h2>
            <p>{campaign?.description}</p>
            <p>Meta: {formatEther(campaign?.goal || BigInt(0))} ETH</p>
            <p>Contribuído: {formatEther(campaign?.totalContributed || BigInt(0))} ETH</p>
            <p>Status: {campaign?.completed ? "Finalizada" : "Em andamento"}</p>
            <Link href={`/campaign/${index + 1}`} className="text-blue-500 underline">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
