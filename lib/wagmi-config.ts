import { createConfig, http } from "wagmi"
import { arbitrumSepolia } from "wagmi/chains"
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors"

// WalletConnect project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

export const wagmiConfig = createConfig({
  chains: [arbitrumSepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: "BetterYield - AI-Powered Yield Optimizer",
      appLogoUrl: "https://betteryield.ai/logo.png",
    }),
    walletConnect({
      projectId,
      metadata: {
        name: "BetterYield",
        description: "AI-Powered Uniswap V3 Yield Optimizer",
        url: "https://betteryield.ai",
        icons: ["https://betteryield.ai/logo.png"],
      },
    }),
  ],
  transports: {
    [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc"),
  },
})

// Network configuration
export const NETWORK_CONFIG = {
  chainId: arbitrumSepolia.id,
  name: arbitrumSepolia.name,
  nativeCurrency: arbitrumSepolia.nativeCurrency,
  rpcUrls: arbitrumSepolia.rpcUrls,
  blockExplorers: arbitrumSepolia.blockExplorers,
  testnet: arbitrumSepolia.testnet,
}

// Contract addresses
export const CONTRACT_ADDRESSES = {
  BETTER_YIELD_MAIN:
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0000000000000000000000000000000000000000",
}

// Chainlink service URLs
export const CHAINLINK_SERVICES = {
  functions: "https://functions.chain.link/arbitrum-sepolia",
  automation: "https://automation.chain.link/arbitrum-sepolia",
  dataFeeds: "https://data.chain.link/arbitrum-sepolia",
  faucet: "https://faucets.chain.link/arbitrum-sepolia",
}
