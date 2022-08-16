import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _checkpointManager = process.env.CHECKPOINT_MANAGER;
const _fxRoot = process.env.FXROOT;
const _fxERC20Token = process.env.FXERC20TOKEN;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC20RootTunnel", {
        from: deployer,
        args: [_checkpointManager, _fxRoot, _fxERC20Token],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC20RootTunnel",
    });
};

func.tags = ["FxERC20RootTunnel"];

export default func;
