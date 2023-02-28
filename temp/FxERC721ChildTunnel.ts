import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _fxChild = process.env.FXCHILD;
const _ERC721TokenTemplate = process.env.ERC721TOKEN_TEMPLATE;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC721ChildTunnel", {
        from: deployer,
        args: [_fxChild, _ERC721TokenTemplate],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC721ChildTunnel",
    });
};

func.tags = ["FxERC721ChildTunnel"];

export default func;
