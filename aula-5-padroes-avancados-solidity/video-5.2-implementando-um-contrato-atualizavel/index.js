const { AbiCoder, keccak256, toUtf8Bytes } = require("ethers");

// Nome da função e tipos/valores dos parâmetros
const functionName = "setValue";
const parameterTypes = ["uint256"];
const parameterValues = [30];

// Crie um codificador ABI
const abiCoder = AbiCoder.defaultAbiCoder();

// Codifique os parâmetros
const encodedParameters = abiCoder.encode(parameterTypes, parameterValues);

// Calcule o selector da função
const functionSignature = `${functionName}(${parameterTypes.join(",")})`;
const selector = keccak256(toUtf8Bytes(functionSignature)).slice(0, 10);

// Concatene o selector com os dados codificados
const calldata = selector + encodedParameters.slice(2);

console.log("ABI Codificado:", calldata);

// ------------->><<-------------

