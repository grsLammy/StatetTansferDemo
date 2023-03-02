import config from "../../config";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("FxMintableERC1155ChildTunnel", {
    from: deployer,
    args: [config.fxChild, config.fxMintableERC1155ChildTemplate, config.fxERC1155RootTemplate],
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "FxMintableERC1155ChildTunnel",
  });
};

func.tags = ["FxMintableERC1155ChildTunnel"];

export default func;
