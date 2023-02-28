import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC1155", {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC1155",
    });
};

func.tags = ["FxERC1155"];

export default func;
