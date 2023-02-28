import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const fxRoot = process.env.FXROOT;
const checkpointManager = process.env.CHECKPOINT_MANAGER;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const rootTokenTemplate = await deployments.get("FxERC1155");

    await deploy("FxMintableERC1155RootTunnel", {
        from: deployer,
        args: [checkpointManager, fxRoot, rootTokenTemplate.address],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxMintableERC1155RootTunnel",
    });
};

func.tags = ["FxMintableERC1155RootTunnel"];
func.dependencies = ["FxERC1155"];

export default func;
