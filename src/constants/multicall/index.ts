import MULTICALL_ABI from "./abi.json";
// import { ChainId } from "..";
const ChainId: any = {
	MAINNET: 1,
	ROPSTEN: 3,
	RINKEBY: 4,
	GÖRLI: 5,
	KOVAN: 42,
	BSCMAINNET: 56,
	MATIC: 137,
	AVALANCHE: 43114,
};
const MULTICALL_NETWORKS: { [chainId in any]: string } = {
  [ChainId.MAINNET]: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
  [ChainId.ROPSTEN]: "0x53C43764255c17BD724F74c4eF150724AC50a3ed",
  [ChainId.KOVAN]: "0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A",
  [ChainId.RINKEBY]: "0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821",
  [ChainId.GÖRLI]: "0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e",
  [ChainId.MATIC]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507", //
  [ChainId.BSCMAINNET]: "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb",
  [ChainId.AVALANCHE]: "0x77300C7f5B9A48b8f6aA5d1CC266F9d00a87A031"
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
