/** @dev Initial balance of every token for each wallet, to then be formatted in token units */
export const INITIAL_TOKEN_BALANCE = parseFloat(process.env.INITIAL_TOKEN_BALANCE || "100000");

export const tokens: string[] = [
    // DAI
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    // USDC
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    // USDT
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    // WBTC
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    // WETH
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    // MATIC
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    // POL (Polygon Ecosystem Token)
    "0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6",
    // NEAR
    "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4",
    // LINK
    "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    // SHIB
    "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    // PEPE
    "0x6982508145454ce325ddbe47a25d4ec3d2311933"
];
