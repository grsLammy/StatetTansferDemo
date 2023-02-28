import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const fxChild = process.env.FXCHILD;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const rootTokenTemplate = await deployments.get("FxERC1155");
    const childTokenTemplate = await deployments.get("FxMintableERC1155");

    await deploy("FxMintableERC1155ChildTunnel", {
        from: deployer,
        args: [fxChild, childTokenTemplate.address, rootTokenTemplate.address],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxMintableERC1155ChildTunnel",
    });
};

func.tags = ["FxMintableERC1155ChildTunnel"];
func.dependencies = ["FxERC1155", "FxMintableERC1155"];
export default func;
