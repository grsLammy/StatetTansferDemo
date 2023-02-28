import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _checkpointManager = process.env.CHECKPOINT_MANAGER;
const _fxRoot = process.env.FXROOT;
const _fxERC721Token = process.env.FXERC721TOKEN;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC721RootTunnel", {
        from: deployer,
        args: [_checkpointManager, _fxRoot, _fxERC721Token],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC721RootTunnel",
    });
};

func.tags = ["FxERC721RootTunnel"];

export default func;
