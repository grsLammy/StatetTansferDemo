# Discord Query

Message Link: https://discord.com/channels/635865020172861441/897771407310716950/1079965153052864512

Hi, I'm also having problems with the FX portal implementation. Look at examples - https://github.com/fx-portal/contracts/tree/eb370b655923162c442077246855affe56809263/contracts/examples/mintable-erc1155-transfer

Someone please correct me if i write mistakes !!!

First create FxMintableERC1155ChildTunnel, in constructor are parameters:
FxChild (Mumbai) 0xCf73231F28B7331BBe3124B907840A94851f9f11
childTokenTemplate - address A on Mumbai deployed token FxMintableERC1155.sol
rootTokenTemplate - address B on Goreli? deployed token FxERC1155.sol

Transact deployChildToken(bytes32 _uniqueId, string calldata _name, string calldata _symbol)
Then you need to copy the data (rootToken and childToken) from the event TokenMapped, you can find them on polygon etherscan
Now you can mint tokens on polygon over address childToken, no childTokenTemplate!!!
After that use method withdraw(address childToken, uint256 amount), copy transaction hash and paste to API url: https://apis.matic.network/api/v1/mumbai/exit-payload/YOU_TRANSACTION_HASH?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036
it takes some time...

Now you can deploy FxMintableERC1155RootTunnel.sol, in constructor are parameters:
checkpointManager 0x2890bA17EfE978480615e330ecB65333b880928e
fxRoot address 0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA
rootTokenTemplate address B

Use method setFxChildTunnel() and paste address FxMintableERC1155ChildTunnel

From the api mentioned above, we copy result (loooooong hexa data), do not copy all text, only result.
Paste result to method receiveMessage in FxMintableERC1155RootTunnel

And that's all.... but in last step i have undefined error 😦 I've been struggling with this for a week, please can anyone help?
https://goerli.etherscan.io/tx/0x3669189d745a42e986e90fcabd610673deeb669b1097d3fc1aebcd6b43596028 