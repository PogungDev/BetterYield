"use client"

import { useState, useTransition } from "react"
import { ModernButton } from "@/components/modern-button"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, ArrowRight, Brain, Zap } from "lucide-react"
import { ModernTickVisualizer } from "@/components/modern-tick-visualizer"
import { scanPositionsSimulation, getAggregatedStatsSimulation } from "@/lib/contract-interactions"

interface AnalyzeTabProps {
  walletAddress: string
  onPositionsFound: (positions: any[]) => void
  setActiveTab: (tab: string) => void
}

export function AnalyzeTab({ walletAddress, onPositionsFound, setActiveTab }: AnalyzeTabProps) {
  const [isScanning, startScanningTransition] = useTransition()
  const [scanResults, setScanResults] = useState<any[]>([])
  const [aggregatedStats, setAggregatedStats] = useState<any>(null)

  const handleScan = async () => {
    startScanningTransition(async () => {
      // Call smart contract simulation for position scanning
      const positions = await scanPositionsSimulation(walletAddress)
      const stats = await getAggregatedStatsSimulation(positions)

      setScanResults(positions)
      setAggregatedStats(stats)
      onPositionsFound(positions)
    })
  }

  const proceedToOptimization = () => {
    setActiveTab("optimize")
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gradient">Analyze Positions</h2>
        <p className="text-white/60 text-lg">
          Discover and analyze your existing Uniswap V3 positions for optimization opportunities.
        </p>
      </div>

      {/* CHAINLINK NOTICE - PROMINENT */}
      <ModernCard className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">🔗 CHAINLINK ANALYSIS ENGINE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-400 mb-2">🔗 Blockchain Position Discovery</h4>
                <p className="text-sm text-white/70">
                  PositionScanner smart contract scans blockchain for all your Uniswap V3 NFT positions. Retrieves
                  position data: tick ranges, liquidity amounts, fees earned.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-semibold text-emerald-400 mb-2">📊 Real-time Price Analysis</h4>
                <p className="text-sm text-white/70">
                  Integrates with Chainlink Data Feeds for real-time ETH/USDC price data. Calculates current position
                  efficiency and identifies out-of-range periods.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-400 mb-2">💰 APR Calculation & Analysis</h4>
                <p className="text-sm text-white/70">
                  Calculates current APR using formula: (Fees Collected / Liquidity Provided) × (365 / Days Active) ×
                  100%. Identifies low-performing positions that need optimization.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Issue Detection</h4>
                <p className="text-sm text-white/70">
                  Detects common issues: wide ranges with low capital efficiency, frequent out-of-range periods,
                  uncollected fees, and suboptimal tick positioning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModernCard>

      {scanResults.length === 0 ? (
        <ModernCard>
          <div className="text-center">
            <Search className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Scan</h3>
            <p className="text-white/60 mb-6">
              We'll scan the blockchain for your Uniswap V3 positions and analyze their performance. This process calls
              PositionScanner smart contract and integrates with Chainlink Data Feeds for accurate analysis.
            </p>
          </div>

          {/* Smart Contract Flow Info */}
          <div className="mb-6 p-4 glass rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-2">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">Smart Contract Flow:</span>
            </div>
            <div className="text-blue-200/80 text-xs space-y-1">
              <p>1. BetterYieldMain → PositionScanner.scanUserPositions()</p>
              <p>2. PositionScanner → Uniswap V3 NonfungiblePositionManager</p>
              <p>3. Retrieve position data → Chainlink Data Feeds (current prices)</p>
              <p>4. Calculate APR, efficiency, fees → VaultStorage (store results)</p>
            </div>
          </div>

          <ModernButton onClick={handleScan} disabled={isScanning} loading={isScanning} size="lg" className="w-full">
            <Search className="w-5 h-5 mr-2" />🔗 Scan My Positions (Chainlink Powered)
          </ModernButton>

          {isScanning && (
            <div className="space-y-2 text-center text-sm text-white/60 mt-4">
              <p>🔍 Calling PositionScanner.scanUserPositions()...</p>
              <p>🔗 Connecting to Uniswap V3 contracts...</p>
              <p>📊 Fetching position data and current prices...</p>
              <p>🧮 Calculating APR and efficiency metrics...</p>
              <p>💾 Storing results in VaultStorage...</p>
            </div>
          )}
        </ModernCard>
      ) : (
        <div className="space-y-6">
          <ModernCard className="bg-gradient-to-r from-blue-900/30 to-emerald-900/30 border-blue-500/50">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-lg text-white">Scan Complete!</span>
            </div>
            <p className="text-white/60">
              Found {scanResults.length} Uniswap V3 positions. Review analysis below and proceed to AI optimization.
            </p>
          </ModernCard>

          {/* Aggregated Stats */}
          {aggregatedStats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ModernCard>
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-blue-400">${aggregatedStats.totalValue.toLocaleString()}</p>
                </div>
              </ModernCard>
              <ModernCard>
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-1">Total Fees Earned</p>
                  <p className="text-2xl font-bold text-emerald-400">${aggregatedStats.totalFees.toLocaleString()}</p>
                </div>
              </ModernCard>
              <ModernCard>
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-1">Average APR</p>
                  <p className="text-2xl font-bold text-purple-400">{aggregatedStats.avgApr}%</p>
                </div>
              </ModernCard>
              <ModernCard>
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-1">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-yellow-400">{aggregatedStats.avgEfficiency}%</p>
                </div>
              </ModernCard>
            </div>
          )}

          {/* Individual Position Analysis */}
          <div className="space-y-4">
            {scanResults.map((position, index) => (
              <div key={position.id} className="space-y-4">
                <ModernCard>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{position.pool}</h3>
                      <p className="text-white/60 text-sm">Position #{position.id}</p>
                    </div>
                    <div className="flex gap-2">
                      {position.issues?.map((issue: string, i: number) => (
                        <Badge key={i} className="bg-red-600/20 text-red-400 border-red-500/30">
                          {issue}
                        </Badge>
                      ))}
                      {position.opportunities?.map((opp: string, i: number) => (
                        <Badge key={i} className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">
                          {opp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="glass rounded-xl p-3">
                      <p className="text-sm text-white/60 mb-1">Value</p>
                      <p className="text-lg font-bold text-blue-400">${position.value.toLocaleString()}</p>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <p className="text-sm text-white/60 mb-1">Current APR</p>
                      <p className="text-lg font-bold text-purple-400">{position.apr}%</p>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <p className="text-sm text-white/60 mb-1">Efficiency</p>
                      <p className="text-lg font-bold text-yellow-400">{position.efficiency}%</p>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <p className="text-sm text-white/60 mb-1">Fees Earned</p>
                      <p className="text-lg font-bold text-emerald-400">${position.feesEarned}</p>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">Analysis Details:</h4>
                    <div className="text-sm text-white/70 space-y-1">
                      <p>
                        <strong>Range:</strong> ${position.tickLower} - ${position.tickUpper} (Current: $
                        {position.currentPrice})
                      </p>
                      <p>
                        <strong>Out of Range:</strong> {position.outOfRangeTime}% of time
                      </p>
                      <p>
                        <strong>Capital Efficiency:</strong> {position.efficiency}% of capital actively earning fees
                      </p>
                      <p>
                        <strong>Potential Improvement:</strong> +{position.potentialAprIncrease}% APR with optimization
                      </p>
                    </div>
                  </div>
                </ModernCard>

                {/* Position Tick Visualizer */}
                <ModernTickVisualizer
                  poolName={`${position.pool} - Current Position Analysis`}
                  currentPrice={position.currentPrice}
                  tickLower={position.tickLower}
                  tickUpper={position.tickUpper}
                />
              </div>
            ))}
          </div>

          {/* Proceed to AI Optimization Button */}
          <ModernCard className="gradient-border" glow>
            <h3 className="text-xl font-bold text-white mb-4">Ready for AI Optimization?</h3>
            <p className="text-white/60 mb-6">
              Based on analysis, your positions have significant optimization potential. Proceed to generate AI-powered
              strategies using Chainlink Functions to maximize your yields.
            </p>
            <ModernButton size="lg" className="w-full" onClick={proceedToOptimization}>
              <Brain className="w-5 h-5 mr-2" />🔗 Proceed to AI Optimization (Chainlink Functions)
              <ArrowRight className="w-5 h-5 ml-2" />
            </ModernButton>
          </ModernCard>
        </div>
      )}
    </div>
  )
}
