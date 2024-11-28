import { Campaign } from "../../../../types/Campaign";

const campaign: Campaign = {
  id: '1',
  title: 'Campanha 1',
  description: 'Descrição detalhada da Campanha 1',
  goal: '10 ETH',
  totalContributed: '3 ETH',
  deadline: '2023-12-31',
};

export default function CampaignDetailsPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">{campaign.title}</h1>
        <p className="text-gray-600 mt-4">{campaign.description}</p>

        <div className="mt-6 space-y-3">
          <p className="text-lg">
            <span className="font-semibold">Meta:</span> {campaign.goal}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Contribuído:</span> {campaign.totalContributed}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Prazo:</span> {campaign.deadline}
          </p>
        </div>

        <button className="mt-6 w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors">
          Contribuir
        </button>
      </div>
    </div>
  );
}