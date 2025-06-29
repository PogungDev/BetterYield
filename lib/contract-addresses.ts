// Smart Contract Addresses for BetterYield dApp
// These would be the actual deployed contract addresses on the blockchain

export const CONTRACT_ADDRESSES = {
  // Core Contracts
  BETTER_YIELD_MAIN: "0x1234567890123456789012345678901234567890",
  VAULT_STORAGE: "0x2345678901234567890123456789012345678901",

  // Module Contracts
  WALLET_MANAGER: "0x3456789012345678901234567890123456789012", // CONNECT TAB
  POSITION_SCANNER: "0x4567890123456789012345678901234567890123", // SCAN TAB
  AI_OPTIMIZER: "0x5678901234567890123456789012345678901234", // OPTIMIZE TAB
  AUTOMATION_MANAGER: "0x6789012345678901234567890123456789012345", // AUTOMATE TAB
  LIVE_MONITOR: "0x7890123456789012345678901234567890123456", // MONITOR TAB

  // Chainlink Contracts
  CHAINLINK_PRICE_FEED: "0x8901234567890123456789012345678901234567",
  CHAINLINK_FUNCTIONS_ORACLE: "0x9012345678901234567890123456789012345678",

  // External Contracts
  UNISWAP_V3_POSITION_MANAGER: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  UNISWAP_V3_ROUTER: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
} as const

export const CHAINLINK_CONFIG = {
  FUNCTIONS_DON_ID: "0x66756e2d657468657265756d2d6d61696e6e65742d3100000000000000000000",
  AUTOMATION_REGISTRY: "0x02777053d6764996e594c3E88AF1D58D5363a2e6",
  DATA_FEED_ETH_USD: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
} as const

// Contract ABI fragments for frontend integration
export const CONTRACT_ABIS = {
  BETTER_YIELD_MAIN: [
    "function registerUser(address _user) external returns (bool)",
    "function scanUserPositions(address _user) external returns (uint256[])",
    "function requestAIOptimization(uint256 _positionId) external returns (bytes32)",
    "function activateAutomation(uint256 _positionId, bool _enable) external",
    "function getAggregatedStats(address _user) external view returns (tuple)",
    "function getContractAddresses() external view returns (address,address,address,address,address,address)",
  ],

  WALLET_MANAGER: [
    "function registerUser(address _user) external returns (bool)",
    "function getUserProfile(address _user) external view returns (tuple)",
  ],

  POSITION_SCANNER: [
    "function scanUserPositions(address _user) external returns (uint256[])",
    "function getCurrentPrice() external view returns (int256)",
    "function analyzePosition(uint256 _positionId) external view returns (tuple)",
  ],

  AI_OPTIMIZER: [
    "function requestOptimalRange(uint256 _positionId) external returns (bytes32)",
    "function getOptimizationResult(uint256 _positionId) external view returns (tuple)",
  ],

  AUTOMATION_MANAGER: [
    "function toggleAutomation(uint256 _positionId, bool _enable) external",
    "function getAutomationStatus(uint256 _positionId) external view returns (tuple)",
  ],

  LIVE_MONITOR: [
    "function getAggregatedStats(address _user) external view returns (tuple)",
    "function getRecentActivity(address _user) external view returns (tuple[])",
  ],
} as const
