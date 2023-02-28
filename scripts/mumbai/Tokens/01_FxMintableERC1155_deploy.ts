import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxMintableERC1155", {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxMintableERC1155",
    });
};

func.tags = ["FxMintableERC1155"];

export default func;
