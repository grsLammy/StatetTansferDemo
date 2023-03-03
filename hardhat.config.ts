import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import dotenv from "dotenv";
import "hardhat-deploy";
import "solidity-coverage";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      gasPrice: "auto",
      accounts: process.env.PRIVATE_KEY_GOERLI !== undefined ? [process.env.PRIVATE_KEY_GOERLI] : [],
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      gasPrice: "auto", // if txs failing, set manual fast gas price
      accounts: process.env.PRIVATE_KEY_POLYGON !== undefined ? [process.env.PRIVATE_KEY_POLYGON] : [],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      gasPrice: "auto",
      accounts: process.env.PRIVATE_KEY_POLYGON !== undefined ? [process.env.PRIVATE_KEY_POLYGON] : [],
    },
  },
  namedAccounts: {
    deployer: 0,
    admin: 1,
    admin1: 2,
    user: 3,
    user1: 4,
  },
  paths: {
    sources: "src",
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    //apiKey: process.env.EXPLORER_API_KEY_ETHEREUM || "",
    apiKey: process.env.EXPLORER_API_KEY_POLYGON || "",
  },
};

export default config;
