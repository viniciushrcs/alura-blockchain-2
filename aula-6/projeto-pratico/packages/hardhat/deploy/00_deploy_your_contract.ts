import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
 * Deploy MultisigWallet and Campaign contracts, and configure their dependencies.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  log("Deploying Campaign...");

  // Deploy Campaign contract
  const campaignDeployment = await deploy("Campaign", {
    from: deployer,
    args: [], // No arguments for Campaign constructor
    log: true,
    autoMine: true,
  });

  const campaignAddress = campaignDeployment.address;
  log(`Campaign deployed at ${campaignAddress}`);

  log("Deploying MultisigWallet...");

  // Owners for the multisig wallet
  const owners = [
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  ];
  const requiredApprovals = 1;

  // Deploy MultisigWallet with Campaign address
  const multisigDeployment = await deploy("MultisigWallet", {
    from: deployer,
    args: [owners, requiredApprovals, campaignAddress], // Pass Campaign address to the MultisigWallet constructor
    log: true,
    autoMine: true,
  });

  const multisigWalletAddress = multisigDeployment.address;
  log(`MultisigWallet deployed at ${multisigWalletAddress}`);

  // Configure MultisigWallet in Campaign contract
  log("Configuring MultisigWallet in Campaign...");
  const campaignContract = await ethers.getContractAt("Campaign", campaignAddress);
  const tx = await campaignContract.setMultisigWallet(multisigWalletAddress);
  await tx.wait();
  log("MultisigWallet configured in Campaign!");
};

export default deployContracts;

deployContracts.tags = ["Campaign", "MultisigWallet"];