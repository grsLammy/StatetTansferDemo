import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("DummyERC20ChildToken", {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "DummyERC20ChildToken",
    });
};

func.tags = ["DummyERC20ChildToken"];

export default func;
