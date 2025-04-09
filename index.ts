import { INITIAL_TOKEN_BALANCE, tokens } from "./constants/tokens";
import { wallets } from "./constants/wallets";
import { getSignerAndProvider } from "./core/getSigner";
import { mintTokens } from "./core/mintTokens";

async function main() {
    // Get signer
    const { provider } = await getSignerAndProvider();

    // Mint ETH and Tokens to every wallet in wallets
    for (const walletAddress in wallets) {
        // Mint tokens
        await mintTokens(provider, walletAddress, tokens, INITIAL_TOKEN_BALANCE);

        console.log("");
    }
}

// Run the main script
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
