import { BigNumberish, Contract, ethers } from "ethers";
import ERC20ABI from "../utils/abis/ERC20.json";
import { network } from "hardhat";

/**
 * @dev Find the right balancOf slot for 'token'
 */
async function getBalanceSlot(walletAddress: string, provider: ethers.JsonRpcProvider, token: Contract): Promise<number | undefined> {
    for (let i = 0; i < 100; i++) {
        const snapshot = await network.provider.send("evm_snapshot");
        const checkSlot = ethers.stripZerosLeft(
            ethers.keccak256(
                ethers.AbiCoder.defaultAbiCoder().encode(
                    ["address", "uint256"],
                    [walletAddress, i]
                )
            )
        );
        const value = 3451234;
        const newValue = ethers.AbiCoder.defaultAbiCoder().encode(["uint256"], [value]);
        await provider.send("hardhat_setStorageAt", [
            token.target,
            checkSlot,
            newValue
        ]);
        const result = await token.balanceOf(walletAddress);
        await network.provider.send("evm_revert", [snapshot]);
        if (result == value) {
            return i;
        }
    }
    return undefined;
}

/**
 *  @dev Set 'userAddress' balance (mint tokens) for 'tokenContract.address' to 'value'
 */
const setUserBalance = async (
    provider: ethers.JsonRpcProvider,
    tokenContract: Contract,
    userAddress: string,
    value: any
) => {
    // Get slot for this user
    const userBalanceSlot = ethers.stripZerosLeft(
        ethers.keccak256(
            ethers.AbiCoder.defaultAbiCoder().encode(
                ["address", "uint256"],
                [userAddress, await getBalanceSlot(userAddress, provider, tokenContract)]
            )
        )
    );

    // Encode to keccak256
    const encodedValue = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256"],
        [value]
    );

    // Set storage
    await provider.send("hardhat_setStorageAt", [
        tokenContract.target,
        userBalanceSlot,
        encodedValue,
    ]);
    await provider.send("evm_mine", []);
};

/**
 * @dev Mint 'amount' of all tokens in 'tokens' to 'to'
 */
const mintTokens = async (
    provider: ethers.JsonRpcProvider,
    to: string,
    tokens: string[],
    amount: BigNumberish
) => {

    // Prepare tokens to mint
    let promises: Promise<boolean>[] = [];

    // Setup transactions and amounts of tokens to mint
    for (let token of tokens) {
        const promise = new Promise<boolean>(async (resolve, reject) => {
            try {
                // Load token values
                const tokenContract = new ethers.Contract(
                    token,
                    ERC20ABI,
                    provider
                );
                const tokenDecimals = await tokenContract.decimals();
                const tokenAmount = ethers.parseUnits(
                    amount.toString(),
                    tokenDecimals
                );

                // Mint tokens
                await setUserBalance(provider, tokenContract, to, tokenAmount);

                resolve(true);
            } catch (error) {
                console.error(`Error minting token ${token}:`, error);
                reject(error);
            }
        });

        promises.push(promise);
    }

    await Promise.all(promises);
    console.log(`Minted ${amount.toString()} of all tokens to ${to}`);
};

export { mintTokens };
