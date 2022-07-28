import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _fxchild = process.env.FXCHILD;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxStateChildTunnel", {
        from: deployer,
        args: [_fxchild],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxStateChildTunnel",
    });
};

func.tags = ["FxStateChildTunnel"];

export default func;
