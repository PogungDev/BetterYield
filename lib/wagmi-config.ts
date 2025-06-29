import { createConfig, http } from "wagmi"
import { arbitrumSepolia } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

// Get project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

if (!projectId) {
  console.warn("⚠️ WalletConnect Project ID is missing. Some wallet connections may not work.")
}

// Wagmi configuration
export const wagmiConfig = createConfig({
  chains: [arbitrumSepolia],
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({ appName: "BetterYield" }),
    ...(projectId ? [walletConnect({ projectId })] : []),
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
  
  // Chainlink addresses for Arbitrum Sepolia
  CHAINLINK: {
    ETH_USD_FEED: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612" as `0x${string}`,
    USDC_USD_FEED: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3" as `0x${string}`,
    FUNCTIONS_ROUTER: "0x97083E831F8F0638855e2A515c90EdCF158DF238" as `0x${string}`,
    LINK_TOKEN: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E" as `0x${string}`,
  }
} as const

// Chainlink service URLs
export const CHAINLINK_SERVICES = {
  functions: "https://functions.chain.link/arbitrum-sepolia",
  automation: "https://automation.chain.link/arbitrum-sepolia",
  dataFeeds: "https://data.chain.link/arbitrum-sepolia",
  faucet: "https://faucets.chain.link/arbitrum-sepolia",
}

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig
  }
}
