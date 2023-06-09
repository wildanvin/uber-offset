import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import addresses, { alfajoresAddresses } from "../utils/addresses";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // const addressesToUse = hre.network.name == "alfajores" ? alfajoresAddresses : addresses;
  const addressesToUse = alfajoresAddresses;

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (!deployer) {
    throw new Error("Missing deployer address");
  }

  await deploy("OffsetHelper", {
    from: deployer,
    args: [Object.keys(addressesToUse), Object.values(addressesToUse)],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};
export default func;

func.tags = ["OffsetHelper"];
