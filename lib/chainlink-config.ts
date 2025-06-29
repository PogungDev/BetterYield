// Chainlink addresses for Arbitrum Sepolia testnet
export const ARBITRUM_SEPOLIA_CHAINLINK = {
  // Data Feeds
  ETH_USD_FEED: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  USDC_USD_FEED: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
  LINK_USD_FEED: "0xb7c8Eb7d616573F7C2156C2A8471674f2039bc21",

  // Functions
  FUNCTIONS_ROUTER: "0x97083E831F8F0638855e2A515c90EdCF158DF238",
  DON_ID: "0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000",

  // Automation
  AUTOMATION_REGISTRY: "0x75c0530885F385721fddA23C539AF3701d6183D4",
  AUTOMATION_REGISTRAR: "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad",

  // LINK Token
  LINK_TOKEN: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
}

// Contract configuration (UPDATE AFTER DEPLOYMENT)
export const CONTRACT_CONFIG = {
  // Will be updated after deployment
  BETTER_YIELD_MAIN: "0x0000000000000000000000000000000000000000", // TODO: Update after deployment

  // Chainlink subscription IDs (UPDATE AFTER SETUP)
  FUNCTIONS_SUBSCRIPTION_ID: 1, // TODO: Update with your subscription ID
  AUTOMATION_UPKEEP_ID: 0, // TODO: Update after registering upkeep
} as const

// Network configuration
export const NETWORK_CONFIG = {
  chainId: 421614,
  name: "Arbitrum Sepolia",
  rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
  blockExplorer: "https://sepolia.arbiscan.io",
  faucets: {
    ETH: "https://faucet.quicknode.com/arbitrum/sepolia",
    LINK: "https://faucets.chain.link/arbitrum-sepolia",
  },
  chainlinkServices: {
    functions: "https://functions.chain.link/arbitrum-sepolia",
    automation: "https://automation.chain.link/arbitrum-sepolia",
    dataFeeds: "https://data.chain.link/arbitrum-sepolia",
  },
} as const

// Chainlink Functions JavaScript source code for AI optimization
export const CHAINLINK_FUNCTIONS_SOURCE = `
// AI-powered yield optimization calculation
console.log("🤖 Starting AI optimization calculation...");

// Fetch current ETH price
const ethPriceResponse = await Functions.makeHttpRequest({
  url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
  headers: {
    "Accept": "application/json"
  }
});

if (ethPriceResponse.error) {
  throw Error("Failed to fetch ETH price");
}

const currentPrice = ethPriceResponse.data.ethereum.usd;
console.log("📊 Current ETH Price:", currentPrice);

// Get historical volatility (simplified)
const volatilityResponse = await Functions.makeHttpRequest({
  url: "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7",
  headers: {
    "Accept": "application/json"
  }
});

let volatility = 0.05; // Default 5% volatility
if (!volatilityResponse.error && volatilityResponse.data.prices) {
  const prices = volatilityResponse.data.prices.map(p => p[1]);
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i-1]) / prices[i-1]);
  }
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / returns.length;
  volatility = Math.sqrt(variance);
}

console.log("📈 Calculated volatility:", volatility);

// AI-based range optimization
let rangeMultiplier;
if (volatility < 0.02) {
  rangeMultiplier = 0.05; // 5% range for low volatility
} else if (volatility < 0.05) {
  rangeMultiplier = 0.08; // 8% range for medium volatility
} else if (volatility < 0.1) {
  rangeMultiplier = 0.12; // 12% range for high volatility
} else {
  rangeMultiplier = 0.15; // 15% range for very high volatility
}

// Calculate optimal price range
const lowerPrice = currentPrice * (1 - rangeMultiplier);
const upperPrice = currentPrice * (1 + rangeMultiplier);

// Convert to Uniswap V3 ticks
const tickLower = Math.floor(Math.log(lowerPrice) / Math.log(1.0001));
const tickUpper = Math.floor(Math.log(upperPrice) / Math.log(1.0001));

// Calculate expected APR (simplified model)
const baseApr = 1500; // 15% base APR
const efficiencyBonus = Math.floor((1 / rangeMultiplier) * 100); // Efficiency bonus
const expectedApr = Math.min(baseApr + efficiencyBonus, 3000); // Cap at 30%

console.log("🎯 Optimization results:");
console.log("  Range:", lowerPrice.toFixed(2), "-", upperPrice.toFixed(2));
console.log("  Ticks:", tickLower, "-", tickUpper);
console.log("  Expected APR:", expectedApr / 100, "%");

// Encode result: tickLower * 1000000 + tickUpper * 1000 + expectedApr
const result = Math.abs(tickLower) * 1000000 + Math.abs(tickUpper) * 1000 + expectedApr;

return Functions.encodeUint256(result);
`

// Smart contract ABI
export const BETTER_YIELD_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_functionsRouter", type: "address" },
      { internalType: "bytes32", name: "_donId", type: "bytes32" },
      { internalType: "uint64", name: "_subscriptionId", type: "uint64" },
      { internalType: "address", name: "_ethUsdPriceFeed", type: "address" },
      { internalType: "address", name: "_usdcUsdPriceFeed", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getLatestEthPrice",
    outputs: [
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int24", name: "_tickLower", type: "int24" },
      { internalType: "int24", name: "_tickUpper", type: "int24" },
      { internalType: "uint128", name: "_liquidity", type: "uint128" },
    ],
    name: "createPosition",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestOptimization",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "positionIndex", type: "uint256" }],
    name: "executeRebalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserPositions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint128", name: "liquidity", type: "uint128" },
          { internalType: "uint256", name: "feeGrowthInside0LastX128", type: "uint256" },
          { internalType: "uint256", name: "feeGrowthInside1LastX128", type: "uint256" },
          { internalType: "uint128", name: "tokensOwed0", type: "uint128" },
          { internalType: "uint128", name: "tokensOwed1", type: "uint128" },
          { internalType: "bool", name: "isActive", type: "bool" },
        ],
        internalType: "struct BetterYieldMain.Position[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "latestOptimization",
    outputs: [
      { internalType: "int24", name: "newTickLower", type: "int24" },
      { internalType: "int24", name: "newTickUpper", type: "int24" },
      { internalType: "uint256", name: "expectedApr", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "bool", name: "isExecuted", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractStats",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "int256", name: "", type: "int256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "checkData", type: "bytes" }],
    name: "checkUpkeep",
    outputs: [
      { internalType: "bool", name: "upkeepNeeded", type: "bool" },
      { internalType: "bytes", name: "performData", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "performData", type: "bytes" }],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "int24", name: "tickLower", type: "int24" },
      { indexed: false, internalType: "int24", name: "tickUpper", type: "int24" },
    ],
    name: "PositionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "bytes32", name: "requestId", type: "bytes32" },
    ],
    name: "OptimizationRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "int24", name: "oldTickLower", type: "int24" },
      { indexed: false, internalType: "int24", name: "oldTickUpper", type: "int24" },
      { indexed: false, internalType: "int24", name: "newTickLower", type: "int24" },
      { indexed: false, internalType: "int24", name: "newTickUpper", type: "int24" },
    ],
    name: "PositionRebalanced",
    type: "event",
  },
] as const

// Mock data for demo
export const MOCK_DATA = {
  positions: [
    {
      id: "1",
      pool: "ETH/USDC",
      value: 12500,
      apr: 8.5,
      efficiency: 45,
      feesEarned: 85,
      tickLower: 1800,
      tickUpper: 2200,
      currentPrice: 2000,
      outOfRangeTime: 15,
      daysOutOfRange: 12,
      potentialAprIncrease: 12.3,
      issues: ["Wide Range", "Low Efficiency"],
      opportunities: ["Narrow Range", "Higher Fees"],
      status: "In Range",
    },
  ],
  aprData: {
    current: 8.5,
    optimized: 20.8,
    increase: 12.3,
  },
  aggregatedStats: {
    totalValue: 12500,
    totalFees: 285,
    avgApr: 20.8,
    activeStrategies: 1,
  },
}

// Utility functions
export function formatPrice(price: bigint): string {
  return (Number(price) / 1e8).toFixed(2)
}

export function formatTick(tick: number): string {
  const price = Math.pow(1.0001, tick)
  return price.toFixed(2)
}

export function tickToPrice(tick: number): number {
  return Math.pow(1.0001, tick)
}

export function priceToTick(price: number): number {
  return Math.floor(Math.log(price) / Math.log(1.0001))
}

export function calculateAPR(tickLower: number, tickUpper: number, currentPrice: number): number {
  const lowerPrice = tickToPrice(tickLower)
  const upperPrice = tickToPrice(tickUpper)
  const rangeWidth = upperPrice - lowerPrice
  const efficiency = Math.min(1, 200 / rangeWidth) // Simplified efficiency calculation
  return 15 + efficiency * 10 // Base 15% + up to 10% efficiency bonus
}
