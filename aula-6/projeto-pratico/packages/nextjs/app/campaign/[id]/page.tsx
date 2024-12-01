"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import { CONTRACT_ABI_CAMPAIGN, CONTRACT_ADDRESS_CAMPAIGN } from "~~/app/init/page";

type Params = {
  id: string;
};

type Campaign = {
  creator: string;
  title: string;
  description: string;
  goal: bigint;
  totalContributed: bigint;
  completed: boolean;
};

export default function CampaignDetails() {
  const params = useParams() as Params;
  const campaignId = params?.id ? parseInt(params.id, 10) : null;

  const {
    data: campaignData,
    isLoading,
    isError,
  } = useReadContract({
    abi: CONTRACT_ABI_CAMPAIGN,
    address: CONTRACT_ADDRESS_CAMPAIGN,
    functionName: "campaigns",
    args: campaignId ? [campaignId] : undefined,
  });

  const formattedCampaigns: Campaign[] = campaignData
    ? [
        {
          creator: campaignData[0] as string,
          title: campaignData[1] as string,
          description: campaignData[2] as string,
          goal: campaignData[3] as bigint,
          totalContributed: campaignData[4] as bigint,
          completed: campaignData[5] as boolean,
        },
      ]
    : [];

  if (isLoading) {
    return <p className="text-center">Carregando campanha...</p>;
  }

  if (isError || formattedCampaigns.length === 0) {
    return <p className="text-center text-red-600">Erro ao carregar os detalhes da campanha.</p>;
  }

  const campaign = formattedCampaigns[0];

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 underline mb-4 inline-block">
        ← Voltar para Campanhas
      </Link>
      <div className="border p-6 rounded shadow">
        <h1 className="text-3xl font-bold">{campaign.title}</h1>
        <p className="mt-2">{campaign.description}</p>
        <div className="mt-4">
          <p>
            <strong>Criador:</strong> {campaign.creator}
          </p>
          <p>
            <strong>Meta:</strong> {formatEther(campaign.goal)} ETH
          </p>
          <p>
            <strong>Contribuído:</strong> {formatEther(campaign.totalContributed)} ETH
          </p>
          <p>
            <strong>Status:</strong> {campaign.completed ? "Finalizada" : "Em andamento"}
          </p>
        </div>
        {!campaign.completed && (
          <Link
            href={`/campaign/${campaignId}/contribute`}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            Contribuir
          </Link>
        )}
        <Link
          href={`/campaign/${campaignId}/withdraw`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
        >
          Sacar
        </Link>
      </div>
    </div>
  );
}
