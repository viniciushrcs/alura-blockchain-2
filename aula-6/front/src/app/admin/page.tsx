'use client';

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

// ABI do contrato
const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "CampaignCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ContributionReceived",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "campaignCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "campaigns",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalContributed",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Endereço do contrato
const CONTRACT_ADDRESS = '0xSeuContratoAqui';

export default function AdminPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para conectar ao contrato e buscar dados
  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      // Conexão com o provedor e contrato
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Chamada para buscar o número total de campanhas
      const campaignCount = await contract.campaignCount();
      const campaignData = [];
      for (let i = 0; i < campaignCount; i++) {
        const campaign = await contract.campaigns(i);
        campaignData.push({
          id: i.toString(),
          title: campaign.title,
          description: campaign.description,
          goal: ethers.formatEther(campaign.goal),
          totalContributed: ethers.formatEther(campaign.totalContributed),
          deadline: new Date(Number(campaign.deadline) * 1000).toLocaleDateString(),
        });
      }
      setCampaigns(campaignData);
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ações de aprovação ou rejeição (exemplo fictício)
  const handleCampaignAction = async (id, action) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      let tx;
      if (action === 'approve') {
        tx = await contract.approveCampaign(id);
      } else if (action === 'reject') {
        tx = await contract.rejectCampaign(id);
      }

      await tx.wait();
      alert(`Campanha ${id} ${action === 'approve' ? 'aprovada' : 'rejeitada'} com sucesso!`);
      fetchCampaigns(); // Atualiza a lista de campanhas
    } catch (error) {
      console.error(`Erro ao ${action === 'approve' ? 'aprovar' : 'rejeitar'} a campanha:`, error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Painel Administrativo</h1>
        <p className="text-gray-600 text-center mt-2 mb-6">
          Gerencie as campanhas ativas e aprove ou rejeite solicitações.
        </p>

        {loading ? (
          <p className="text-center">Carregando campanhas...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Meta
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Contribuído
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Prazo
                </th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-t">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{campaign.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{campaign.goal} ETH</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{campaign.totalContributed} ETH</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{campaign.deadline}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => handleCampaignAction(campaign.id, 'approve')}
                    >
                      Aprovar
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-700 transition-colors"
                      onClick={() => handleCampaignAction(campaign.id, 'reject')}
                    >
                      Rejeitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}