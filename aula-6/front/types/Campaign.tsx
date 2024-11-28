export interface Campaign {
  id: string; // ID único da campanha
  title: string; // Título da campanha
  description: string; // Descrição detalhada
  goal: string; // Meta em ETH
  totalContributed: string; // Quantia arrecadada em ETH
  deadline: string; // Prazo final no formato ISO
}

export interface Contribution {
  contributor: string; // Endereço do contribuinte
  amount: string; // Valor contribuído em ETH
}