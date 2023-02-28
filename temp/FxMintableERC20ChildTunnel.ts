import dotenv from "dotenv";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

const _fxChild = process.env.FXCHILD;
const _childERC20TokenTemplate = process.env.CHILD_ERC20TOKEN_TEMPLATE;
const _rootERC20TokenTemplate = process.env.ROOT_ERC20TOKEN_TEMPLATE;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("FxMintableERC20ChildTunnel", {
        from: deployer,
        args: [_fxChild, _childERC20TokenTemplate, _rootERC20TokenTemplate],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "FxMintableERC20ChildTunnel",
    });
};

func.tags = ["FxMintableERC20ChildTunnel"];

export default func;
