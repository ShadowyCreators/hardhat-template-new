import { ethers } from "ethers";

const getSignerAndProvider = async () => {
    // Connect to the Hardhat local network
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Get the first account (signer) from the local Hardhat node
    const signer = await provider.getSigner(0);

    // Log hardhat chain
    console.log(
        `INFO: Hardhat chainID: ${Number(
            await provider.send("eth_chainId", [])
        )} \n`
    );

    return { provider, signer };
};

export { getSignerAndProvider };
