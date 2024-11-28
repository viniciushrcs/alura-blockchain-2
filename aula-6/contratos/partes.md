Planejamento do Projeto Prático de Crowdfunding

Aqui está uma visão detalhada do que será necessário para implementar o projeto prático.

1. Contratos Inteligentes

1.1 Campaign.sol

Responsável por:
	•	Registrar campanhas de arrecadação com título, descrição, meta, prazo, etc.
	•	Gerenciar contribuições e associá-las aos participantes.
	•	Interagir com o contrato MultisigWallet.sol para liberação de fundos.

Funcionalidades principais:
	•	Criação de campanhas (dados: título, descrição, meta, prazo, endereço do criador).
	•	Registro de contribuições com eventos para cada doação.
	•	Monitoramento do progresso da campanha (total arrecadado e status).
	•	Emissão de eventos como criação de campanha, recebimento de doação e conclusão da meta.
	•	Lógica de encerramento automático ao atingir a meta ou ao término do prazo.

1.2 MultisigWallet.sol

Responsável por:
	•	Gerenciar os fundos arrecadados em campanhas.
	•	Garantir que as transações sejam aprovadas por múltiplas partes (criador da campanha e administrador da plataforma).

Funcionalidades principais:
	•	Adicionar proprietários (signatários).
	•	Propor transações para liberação de fundos.
	•	Aprovar ou rejeitar transações.
	•	Liberação dos fundos apenas após a aprovação de ambas as partes.
	•	Emissão de eventos para cada aprovação e transação concluída.

2. Interface Front-End

2.1 Tecnologias e Bibliotecas

	•	React.js: Para a criação da interface gráfica.
	•	Ethers.js ou Web3.js: Para conectar a aplicação aos contratos inteligentes na blockchain Ethereum.
	•	Bootstrap/Material-UI: Para estilização rápida e responsiva.

2.2 Páginas Necessárias

	1.	Página Inicial
	•	Listagem de campanhas ativas com informações como título, meta, prazo e progresso da arrecadação.
	2.	Página de Detalhes da Campanha
	•	Informações completas da campanha (descrição, histórico de doações, botão para contribuir).
	•	Exibição de etapas de liberação de fundos (escrow).
	3.	Página de Criação de Campanha
	•	Formulário para o criador da campanha definir título, descrição, meta e prazo.
	4.	Painel de Administração
	•	Listagem de todas as campanhas.
	•	Opção para aprovar ou rejeitar transações no contrato MultisigWallet.sol.

3. Outros Itens Necessários

3.1 Ambiente de Desenvolvimento

	•	Remix IDE ou Hardhat: Para desenvolvimento e teste de contratos inteligentes.
	•	Ganache: Para simular a blockchain localmente.
	•	MetaMask: Para conectar contas de usuário à aplicação descentralizada (DApp).

3.2 Funcionalidades Adicionais

	•	Integração de eventos para atualizações em tempo real (por exemplo, exibir doações recebidas imediatamente).
	•	Tratamento de erros e mensagens claras para os usuários (ex.: saldo insuficiente, erro na transação).

Divisão em Partes para Implementação

	1.	Contratos Inteligentes:
	•	Implementar o contrato Campaign.sol.
	•	Implementar o contrato MultisigWallet.sol.
	2.	Testes Locais:
	•	Testar funcionalidades dos contratos no Remix ou Hardhat.
	3.	Interface Front-End:
	•	Criar páginas básicas com React.js.
	•	Conectar as páginas aos contratos inteligentes.
	4.	Implantação:
	•	Implantar os contratos na rede de teste (Goerli, Sepolia, etc.).
	•	Atualizar a aplicação para interagir com a rede de teste.

Se estiver pronto, podemos começar pelo contrato Campaign.sol. 🚀