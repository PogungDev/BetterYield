import { 
  useAccount, 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useBlockNumber,
  usePublicClient
} from 'wagmi'
import { parseEther, formatEther, Address } from 'viem'
import { CONTRACT_ADDRESSES } from './wagmi-config'
import { BETTER_YIELD_ABI } from './chainlink-config'

// Position interface
export interface Position {
  tokenId: bigint
  owner: Address
  tickLower: number
  tickUpper: number
  liquidity: bigint
  feeGrowthInside0LastX128: bigint
  feeGrowthInside1LastX128: bigint
  tokensOwed0: bigint
  tokensOwed1: bigint
  isActive: boolean
}

// Hook to get latest ETH price from Chainlink
export function useLatestEthPrice() {
  const { data: priceData, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESSES.BETTER_YIELD_MAIN,
    abi: BETTER_YIELD_ABI,
    functionName: 'getLatestEthPrice',
  })

  return {
    price: priceData ? Number(priceData[0]) / 1e8 : null, // Convert from 8 decimals
    timestamp: priceData ? Number(priceData[1]) : null,
    isLoading,
    error
  }
}

// Hook to get user positions
export function useUserPositions(userAddress?: Address) {
  const { data: positions, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.BETTER_YIELD_MAIN,
    abi: BETTER_YIELD_ABI,
    functionName: 'getUserPositions',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  })

  return {
    positions: positions as Position[] || [],
    isLoading,
    error,
    refetch
  }
}

// Hook to get latest optimization result
export function useLatestOptimization(userAddress?: Address) {
  const { data: optimizationData, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESSES.BETTER_YIELD_MAIN,
    abi: BETTER_YIELD_ABI,
    functionName: 'latestOptimization',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  })

  return {
    optimization: optimizationData ? {
      newTickLower: Number(optimizationData[0]),
      newTickUpper: Number(optimizationData[1]),
      expectedApr: Number(optimizationData[2]),
      timestamp: Number(optimizationData[3]),
      isExecuted: optimizationData[4]
    } : null,
    isLoading,
    error
  }
}

// Hook to create a new position
export function useCreatePosition() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createPosition = async (tickLower: number, tickUpper: number, liquidityAmount: string) => {
    try {
      const liquidity = parseEther(liquidityAmount)
      
      await writeContract({
        address: CONTRACT_ADDRESSES.BETTER_YIELD_MAIN,
        abi: BETTER_YIELD_ABI,
        functionName: 'createPosition',
        args: [tickLower, tickUpper, liquidity],
      })
    } catch (err) {
      console.error('Failed to create position:', err)
      throw err
    }
  }

  return {
    createPosition,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

// Hook to request optimization
export function useRequestOptimization() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const requestOptimization = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.BETTER_YIELD_MAIN,
        abi: BETTER_YIELD_ABI,
        functionName: 'requestOptimization',
      })
    } catch (err) {
      console.error('Failed to request optimization:', err)
      throw err
    }
  }

  return {
    requestOptimization,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

// Hook to execute rebalance
export function useExecuteRebalance() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const executeRebalance = async (positionIndex: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.BETTER_YIELD_MAIN,
        abi: BETTER_YIELD_ABI,
        functionName: 'executeRebalance',
        args: [BigInt(positionIndex)],
      })
    } catch (err) {
      console.error('Failed to execute rebalance:', err)
      throw err
    }
  }

  return {
    executeRebalance,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

// Hook for real-time price monitoring
export function usePriceMonitoring() {
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { price, timestamp } = useLatestEthPrice()
  
  return {
    currentPrice: price,
    lastUpdate: timestamp,
    blockNumber
  }
}

// Utility functions
export function tickToPrice(tick: number): number {
  return Math.pow(1.0001, tick)
}

export function priceToTick(price: number): number {
  return Math.log(price) / Math.log(1.0001)
}

export function calculateAPR(tickLower: number, tickUpper: number, currentPrice: number): number {
  const lowerPrice = tickToPrice(tickLower)
  const upperPrice = tickToPrice(tickUpper)
  const range = upperPrice - lowerPrice
  const rangePercent = range / currentPrice
  
  // Simplified APR calculation - narrower ranges typically have higher APR
  const baseAPR = 1500 // 15%
  const efficiencyMultiplier = Math.min(1 / rangePercent, 3) // Cap at 3x
  
  return Math.floor(baseAPR * efficiencyMultiplier)
}

// Mock data generator for development (when contract not deployed)
export function generateMockPosition(address: Address, index: number): Position {
  const basePrice = 2000
  const tickSpacing = 60
  const tickLower = 75000 + (index * tickSpacing)
  const tickUpper = tickLower + 200
  
  return {
    tokenId: BigInt(100000 + index),
    owner: address,
    tickLower,
    tickUpper,
    liquidity: parseEther("1.5"),
    feeGrowthInside0LastX128: BigInt(0),
    feeGrowthInside1LastX128: BigInt(0),
    tokensOwed0: BigInt(0),
    tokensOwed1: BigInt(0),
    isActive: true
  }
}

// Export service class for compatibility with existing code
export class RealChainlinkService {
  // For gradual migration from simulation to real contracts
  static async getLatestEthPrice(): Promise<{ price: number; timestamp: number }> {
    // This will be replaced by the hook in React components
    return { price: 2000, timestamp: Date.now() }
  }

  static async scanPositions(address: Address): Promise<Position[]> {
    // This will be replaced by the hook in React components
    return [generateMockPosition(address, 0)]
  }
}

// Contract interaction wrapper for non-hook contexts
export async function checkContractDeployment(): Promise<boolean> {
  try {
    const isDeployed = CONTRACT_ADDRESSES.BETTER_YIELD_MAIN !== "0x0000000000000000000000000000000000000000"
    return isDeployed
  } catch (error) {
    return false
  }
} 