import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _fxChild = process.env.FXCHILD;
const _ERC1155TokenTemplate = process.env.ERC1155TOKEN_TEMPLATE;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC1155ChildTunnel", {
        from: deployer,
        args: [_fxChild, _ERC1155TokenTemplate],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC1155ChildTunnel",
    });
};

func.tags = ["FxERC1155ChildTunnel"];

export default func;
