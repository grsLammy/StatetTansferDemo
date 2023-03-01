import { use, setProofApi } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import { FxPortalClient } from "@fxportal/maticjs-fxportal";
import HDWalletProvider from "@truffle/hdwallet-provider";
import config from "../config";
import dotenv from "dotenv";
dotenv.config();

use(Web3ClientPlugin);

// To use withdrawExitFaster(), set the proof api
// Once set, the proof api will be used globally for faster exits.
setProofApi("https://apis.matic.network/");

const polygonPKey: any = process.env.PRIVATE_KEY_POLYGON;
const goerliPKey: any = process.env.PRIVATE_KEY_GOERLI;

async function getFxPortalClient(network = "testnet", version = "mumbai") {
  try {
    const fxPortalClient = new FxPortalClient();
    return await fxPortalClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(
          goerliPKey,
          `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        ),
        defaultConfig: {
          from: config.rootUser,
        },
      },
      child: {
        provider: new HDWalletProvider(
          polygonPKey,
          `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        ),
        defaultConfig: {
          from: config.childUser,
        },
      },
    });
  } catch (error) {
    console.log("error unable to initiate fxPortalClient", error);
  }
}

export { getFxPortalClient };
