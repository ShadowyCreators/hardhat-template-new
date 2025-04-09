import { ethers } from "ethers";
import { Wallets } from "../types";

/** @dev Initial balance (ETH) for every wallet */
export const INITIAL_ETHER_BALANCE = ethers.parseEther(process.env.INITIAL_ETHER_BALANCE || "100000");

export const wallets: Wallets = {
    // testWallet1
    "0xC78c504B91598E6ca72059C4Ea4d2dE8f3e77E38":
        "0215f18477a0decb036f30ae60629e5d3280ff90fce6e476f6308202056a271b",
    // testWallet2
    "0xfc152f89c03DAbDb02AC3822e117Dc88b6c34b94":
        "ffaacf95130564328868e81f6aed4bb8cc97d0a40465a8bb1ce3df54c5ae7cb4",
    // testWallet3
    "0xFd7296c8aAAa5b0Be7Cf937485D2b419B9d985Bc":
        "5143923a5eafe45d28bd9f9ce6339aed7f0506f66758143e8035c35d31920d19",
};
