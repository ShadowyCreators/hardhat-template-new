// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.28",
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import * as dotenv from "dotenv";
import {INITIAL_ETHER_BALANCE, wallets} from "./constants/wallets";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1,
      forking: {
        url: process.env.ETHEREUM_ALCHEMY_API_KEY ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.ETHEREUM_ALCHEMY_API_KEY}` : "https://ethereum-rpc.publicnode.com",
        blockNumber: 22229838,
      },
      accounts: Object.values(wallets).map((privateKey) => (
        {privateKey, balance: INITIAL_ETHER_BALANCE.toString() }
      ))
    },
  },
  solidity: "0.8.28",
};

export default config;