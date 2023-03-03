import axios from "axios";
import ps from "prompt-sync";
import { getFxPortalClient } from "./FxPortalClient";
const prompt = ps();

async function generateExitPayload() {
  try {
    console.log("\n-----------------------------------------");
    console.log("INITIATING ISCHECKPOINTED PROCESS");
    console.log("-----------------------------------------\n");

    const burnTxHash = prompt("Enter the burn transaction hash: ");
    if (!burnTxHash) return console.log("burn transaction hash cannot be null");

    // initiate fxClient
    const fxClient: any = await getFxPortalClient();

    // check if the burn hash has been checkpointed
    const isCheckPointedStatus = await fxClient.isCheckPointed(burnTxHash);
    console.log("\nTransaction Hash checkpoint status: ", isCheckPointedStatus);
    if (!isCheckPointedStatus) return console.log("Reverting back as hash was not checkpointed yet...");

    console.log("\n-----------------------------------------");
    console.log("INITIATING EXIT PAYLOAD PROCESS");
    console.log("-----------------------------------------\n");

    const response = (
      await axios.get(
        `https://apis.matic.network/api/v1/mumbai/exit-payload/${burnTxHash}?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`
      )
    ).data;
    console.log("Payload Generated: ", response.result);
  } catch (error: any) {
    console.log("Error at generateExitPayload", error.response.data);
    process.exit(1);
  }
}

generateExitPayload()
  .then(() => {
    console.log("\n\n---------- ENDING ALL PROCESS ----------\n\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
