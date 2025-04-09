import { expect } from "chai";
import { BigNumberish, ethers, Signer } from "ethers";
import { network } from "hardhat";
import { tokens } from "../constants/tokens";
import { wallets } from "../constants/wallets";
import { getSignerAndProvider } from "../core/getSigner";
import { mintTokens } from "../core/mintTokens";
import ERC20ABI from "../utils/abis/ERC20.json";

describe("Test mintTokens", () => {
    // Variables
    let provider: ethers.JsonRpcProvider;
    let signer: Signer;
    let snapshot: any;

    // Types
    interface TestToken {
        contract: ethers.Contract;
        amount: BigNumberish;
    }

    // Fixtures
    before(async () => {
        // Setup signer
        ({ provider, signer } = await getSignerAndProvider());
    });

    beforeEach(async () => {
        snapshot = await network.provider.send("evm_snapshot");
    });
    afterEach(async () => {
        await network.provider.send("evm_revert", [snapshot]);
    });

    // Utility functions
    const getTokenBalance = async (
        tokenContract: ethers.Contract,
        userAddress: string
    ) => {
        return await tokenContract.balanceOf(userAddress);
    };

    [12, 123, 1234, 12345].forEach((amount) => {
        it(`Should mint ${amount} of each token to wallets`, async () => {
            // -- SETUP -- //
            let testTokens: TestToken[] = [];

            // setup tokens
            for (let token of tokens) {
                // setup token
                const tokenContract = new ethers.Contract(
                    token,
                    ERC20ABI,
                    signer
                );
                const tokenDecimals = await tokenContract.decimals();
                const tokenAmount = ethers.parseUnits(
                    amount.toString(),
                    tokenDecimals
                );

                // add token
                testTokens.push({
                    contract: tokenContract,
                    amount: tokenAmount,
                });
            }

            // -- TEST -- //
            for (let walletAddress in wallets) {
                await mintTokens(provider, walletAddress, tokens, amount);
            }

            // -- ASSERT IN LOOP -- //
            for (let walletAddress in wallets) {
                for (let token of testTokens) {
                    expect(
                        await getTokenBalance(token.contract, walletAddress)
                    ).to.equal(token.amount);
                }
            }
        });
    });
});
