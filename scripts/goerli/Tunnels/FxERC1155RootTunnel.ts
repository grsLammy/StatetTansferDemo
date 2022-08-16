import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _checkpointManager = process.env.CHECKPOINT_MANAGER;
const _fxRoot = process.env.FXROOT;
const _fxERC1155Token = process.env.FXERC1155TOKEN;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC1155RootTunnel", {
        from: deployer,
        args: [_checkpointManager, _fxRoot, _fxERC1155Token],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC1155RootTunnel",
    });
};

func.tags = ["FxERC1155RootTunnel"];

export default func;
