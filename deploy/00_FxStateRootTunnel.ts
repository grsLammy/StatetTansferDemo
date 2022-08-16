import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _checkpointManager = process.env.CHECKPOINT_MANAGER;
const _fxRoot = process.env.FXROOT;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxStateRootTunnel", {
        from: deployer,
        args: [_checkpointManager, _fxRoot],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxStateRootTunnel",
    });
};

func.tags = ["FxStateRootTunnel"];

export default func;
