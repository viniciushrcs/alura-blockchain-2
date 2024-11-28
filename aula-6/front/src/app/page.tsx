import { Campaign } from "../../types/Campaign";

const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Campanha 1',
    description: 'Descrição da Campanha 1',
    goal: '10 ETH',
    totalContributed: '3 ETH',
    deadline: '2023-12-31',
  },
];

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Plataforma de Crowdfunding</h1>
        <p className="text-gray-700 mt-4">Conectando pessoas para financiar grandes ideias</p>
      </header>

      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">Campanhas Ativas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">{campaign.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{campaign.description}</p>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Meta:</span> {campaign.goal}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Arrecadado:</span> {campaign.totalContributed}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Prazo:</span> {campaign.deadline}
                  </p>
                </div>

                <a
                  href={`/campaigns/${campaign.id}`}
                  className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Detalhes
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}