# Issues with FxMintableERC1155RootTunnel Smart Contract

## Introduction
- FxMintableERC1155 Root Tunnel allows users to deploy ERC1155 Token on Polygon and upon withdrawal, it deploys a clone ERC1155 Token on Ethereum and mints token. 
- However, the implementation provided in the repository containing the sample smart contract for FxMintableERC1155 is incorrect.
```sh
https://github.com/fx-portal/contracts/blob/main/contracts/examples/mintable-erc1155-transfer/FxMintableERC1155RootTunnel.sol 
```
## Issue with Generating Salt for RootToken in _deployRootToken() Function
- A critical issue was found with the generation of the Computed Create2 Address of the rootToken within the root contract. The computed address did not match the address that was emitted by the event during the deployChildToken() function call.
- When calling the _deployRootToken() function, the wrong argument is passed, resulting in the wrong rootToken address being generated. To resolve this issue, simply pass childToken instead of rootToken.
  
## Issue with _syncWithdraw() and _syncBatchWithdraw()
- After the require statement in both the _syncWithdraw() and _syncBatchWithdraw() functions, there are calls to the safeTransferFrom() and safeBatchTransferFrom() functions, respectively. 
- However, the rootToken has just been deployed, and the requisite tokens must first be minted before they can be transferred. This lack of balance in the rootTunnel contract results in the 'ERC1155: insufficient balance for transfer' error.
- To resolve this, simply add the mint() function and mintBatch() for _syncWithdraw() and _syncBatchWithdraw() functions respectively.