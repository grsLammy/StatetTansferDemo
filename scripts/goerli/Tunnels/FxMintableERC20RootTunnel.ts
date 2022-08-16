import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _fxRoot = process.env.FXROOT;
const _checkpointManager = process.env.CHECKPOINT_MANAGER;
const _rootERC20TokenTemplate = process.env.ROOT_ERC20TOKEN_TEMPLATE;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxMintableERC20RootTunnel", {
        from: deployer,
        args: [_checkpointManager, _fxRoot, _rootERC20TokenTemplate],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxMintableERC20RootTunnel",
    });
};

func.tags = ["FxMintableERC20RootTunnel"];

export default func;
