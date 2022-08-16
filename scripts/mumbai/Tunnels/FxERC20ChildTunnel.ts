import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _fxChild = process.env.FXCHILD;
const _ERC20TokenTemplate = process.env.ERC20TOKEN_TEMPLATE;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxERC20ChildTunnel", {
        from: deployer,
        args: [_fxChild, _ERC20TokenTemplate],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxERC20ChildTunnel",
    });
};

func.tags = ["FxERC20ChildTunnel"];

export default func;
