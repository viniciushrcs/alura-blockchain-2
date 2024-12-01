## Fluxo básico de implementação

	1.	Implantar LogicV1: Implantar o contrato inicial.
	2.	Implantar TransparentProxy: Passar o endereço do LogicV1 como argumento para o Proxy.
	3.	Atualizar para LogicV2: Usar a função updateImplementation no Proxy para apontar para o novo contrato (LogicV2).
	4.	Testar a Continuidade: Verificar que o estado (valor armazenado) foi mantido e a lógica foi alterada.
