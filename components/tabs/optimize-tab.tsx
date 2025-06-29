"use client"

import { useState, useTransition } from "react"
import { ModernButton } from "@/components/modern-button"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, ArrowRight, Zap, Calculator } from "lucide-react"
import { ModernTickVisualizer } from "@/components/modern-tick-visualizer"
import { generateAiStrategiesSimulation } from "@/lib/contract-interactions"

interface OptimizeTabProps {
  walletAddress: string
  positions: any[]
  onOptimizationComplete: (strategies: any[]) => void
  setActiveTab: (tab: string) => void
}

export function OptimizeTab({ walletAddress, positions, onOptimizationComplete, setActiveTab }: OptimizeTabProps) {
  const [isOptimizing, startOptimizingTransition] = useTransition()
  const [optimizationResults, setOptimizationResults] = useState<any[]>([])

  const handleOptimize = async () => {
    startOptimizingTransition(async () => {
      // Call smart contract simulation for AI strategy generation
      const strategies = await generateAiStrategiesSimulation(walletAddress, positions)
      setOptimizationResults(strategies)
      onOptimizationComplete(strategies)
    })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gradient">AI Optimization</h2>
        <p className="text-white/60 text-lg">
          Get personalized strategies powered by Chainlink Functions for off-chain computation.
        </p>
      </div>

      {/* CHAINLINK NOTICE - PROMINENT */}
      <ModernCard className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">🔗 CHAINLINK FUNCTIONS AI ENGINE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-400 mb-2">📏 Dynamic Range Adjustment</h4>
                <p className="text-sm text-white/70">
                  AI analyzes ETH/USDC trading patterns, historical volatility, and <strong>current TVL</strong> to
                  determine optimal tick range width.{" "}
                  <strong>
                    When TVL drops, AI automatically adjusts narrowing range to concentrate liquidity and maximize fees
                    from remaining volume.
                  </strong>
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-400 mb-2">💰 Fee Maximization Strategy</h4>
                <p className="text-sm text-white/70">
                  Positions liquidity where 80% of ETH/USDC trading volume occurs, based on historical data analysis and
                  real-time market conditions from Chainlink Data Feeds.{" "}
                  <strong>The key is narrow rebalancing for better and stable APR yield.</strong>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-semibold text-emerald-400 mb-2">🔄 Impermanent Loss Mitigation</h4>
                <p className="text-sm text-white/70">
                  Calculates optimal rebalancing frequency to minimize IL while maximizing fee collection. Considers gas
                  costs vs potential gains for each rebalance decision, ensuring profitability.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-400 mb-2">📈 Compound Growth Optimization</h4>
                <p className="text-sm text-white/70">
                  Automatically reinvests collected fees back into ETH/USDC position when economically viable (typically
                  when fees &gt; $10 to cover gas costs).{" "}
                  <strong>Target: LP farming stays on-range with maximum yield.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModernCard>

      {optimizationResults.length === 0 ? (
        <ModernCard>
          {/* APR Calculation Explanation */}
          <ModernCard className="mb-6 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-blue-400">📊 How APR is Calculated:</h3>
            </div>
            <div className="text-sm text-white/70 space-y-3">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="font-semibold text-emerald-300 mb-2">
                  Formula for Concentrated Liquidity LP (Uniswap V3):
                </p>
                <div className="font-mono text-white bg-slate-900 p-3 rounded border-l-4 border-emerald-500">
                  APR = (Fees Collected Over Time / Liquidity Provided) × (365 / Days Active) × 100%
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="font-semibold text-blue-300 mb-2">Concrete Example:</p>
                <p>If you earn $2 fee in 24 hours from $1,000 TVL:</p>
                <div className="font-mono text-white bg-slate-900 p-3 rounded border-l-4 border-blue-500 mt-2">
                  APR ≈ ($2 / $1,000) × 365 × 100% = 73%
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="font-semibold text-purple-300 mb-2">Optimized APR Projection based on:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Historical ETH/USDC trading volume in optimal range</li>
                  <li>Average fee rate (0.05%) × projected trading volume</li>
                  <li>Reduced out-of-range periods (from 15% to 5%)</li>
                  <li>Compound effect from auto-reinvested fees</li>
                </ul>
              </div>

              <p className="text-blue-300 mt-2">
                <strong>Note:</strong> In production, these calculations use real Chainlink Data Feeds and on-chain
                Uniswap V3 data for maximum accuracy.
              </p>
            </div>
          </ModernCard>

          <div className="text-center">
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready for AI Analysis</h3>
            <p className="text-white/60 mb-6">
              Our AI will analyze your positions and create optimal rebalancing strategies using Chainlink Functions.
              This involves calculating current APR based on TVL and trading volume, and determining best tick range to
              maintain high yield.
            </p>
          </div>

          {/* Smart Contract Flow Info */}
          <div className="mb-6 p-4 glass rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">Smart Contract Flow:</span>
            </div>
            <div className="text-purple-200/80 text-xs space-y-1">
              <p>1. BetterYieldMain → OptimizeContract.requestOptimalRange()</p>
              <p>2. OptimizeContract → Chainlink Functions (AI computation)</p>
              <p>3. Chainlink Functions → OptimizeContract.fulfillRequest()</p>
              <p>4. OptimizeContract → VaultStorage (update optimal ranges)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
            <div className="text-center glass rounded-xl p-4">
              <p className="text-white/60 mb-1">Positions to Optimize</p>
              <p className="text-2xl font-bold text-blue-400">{positions.length}</p>
            </div>
            <div className="text-center glass rounded-xl p-4">
              <p className="text-white/60 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-emerald-400">
                ${positions.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center glass rounded-xl p-4">
              <p className="text-white/60 mb-1">Est. Processing Time</p>
              <p className="text-2xl font-bold text-purple-400">{positions.length * 2}s</p>
            </div>
          </div>

          {/* SMART CONTRACT TRIGGER BUTTON */}
          <ModernButton
            onClick={handleOptimize}
            disabled={isOptimizing}
            loading={isOptimizing}
            size="lg"
            className="w-full"
          >
            <Brain className="w-5 h-5 mr-2" />🔗 Generate AI Strategies (Chainlink Functions)
          </ModernButton>

          {isOptimizing && (
            <div className="space-y-2 text-center text-sm text-white/60 mt-4">
              <p>🤖 Calling OptimizeContract.requestOptimalRange()...</p>
              <p>🧠 Chainlink Functions: AI analyzing market conditions...</p>
              <p>📊 AI calculating optimal tick ranges and APR...</p>
              <p>⚡ Generating rebalancing strategies...</p>
              <p>💾 Updating VaultStorage with optimal ranges...</p>
            </div>
          )}
        </ModernCard>
      ) : (
        <div className="space-y-6">
          <ModernCard className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-emerald-500/50">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-lg text-white">AI Optimization Complete!</span>
            </div>
            <p className="text-white/60">
              Generated {optimizationResults.length} personalized strategies via Chainlink Functions. Review each
              position below.
            </p>
          </ModernCard>

          {optimizationResults.map((strategy, index) => {
            const position = positions.find((p) => p.id === strategy.positionId)
            if (!position) return null

            return (
              <div key={strategy.positionId} className="space-y-4">
                <ModernCard>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{strategy.pool} Strategy</h3>
                      <p className="text-white/60 text-sm">AI-Generated via Chainlink Functions</p>
                    </div>
                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                      {strategy.riskLevel} Risk
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Current APR</p>
                      <p className="text-2xl font-bold text-purple-400">{strategy.currentApr}</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">APR Increase</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        +{strategy.estimatedAprIncrease.toFixed(1)}%
                      </p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Efficiency Boost</p>
                      <p className="text-2xl font-bold text-blue-400">
                        +{strategy.estimatedEfficiencyIncrease.toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">Strategy Details:</h4>
                    <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                      <li>
                        Optimal range: ${strategy.optimalTicks[0]} - ${strategy.optimalTicks[1]} (width: $
                        {(strategy.optimalTicks[1] - strategy.optimalTicks[0]).toFixed(0)})
                      </li>
                      <li>Rebalance Frequency: {strategy.rebalanceFrequency}</li>
                      <li>Gas-optimized execution with Chainlink Automation</li>
                      <li>Continuous monitoring with Chainlink Data Feeds</li>
                    </ul>
                    <h4 className="font-semibold text-white mt-4 mb-2">🧠 Detailed AI Analysis & Strategy:</h4>
                    <div className="text-sm text-white/70 space-y-3">
                      <div>
                        <p className="font-semibold text-blue-300">Current Position Issues:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Range too wide: [1800-2200] = $400 width captures only 45% of trading volume</li>
                          <li>Out of range 15% of time = zero fees during those periods</li>
                          <li>Capital efficiency: Only 45% of your $12,500 actively earning fees</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-emerald-300">AI Optimization Strategy:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Narrow to [1950-2050] = $100 width captures 80% of trading volume</li>
                          <li>Rebalance every 2-3 days when price hits boundaries</li>
                          <li>Auto-compound fees daily when accumulated fees &gt; $10</li>
                          <li>Target 95% uptime based on ETH volatility patterns</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-purple-300">Expected Results:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>APR increase: 8.5% → 20.8% (+144% improvement)</li>
                          <li>Capital efficiency: 45% → 87% (+93% improvement)</li>
                          <li>Monthly fees: $85 → $217 (+155% improvement)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ModernCard>

                <ModernTickVisualizer
                  poolName={`${strategy.pool} - AI Optimized Strategy`}
                  currentPrice={position.currentPrice}
                  tickLower={strategy.currentTicks[0]}
                  tickUpper={strategy.currentTicks[1]}
                  optimalTickLower={strategy.optimalTicks[0]}
                  optimalTickUpper={strategy.optimalTicks[1]}
                />
              </div>
            )
          })}

          <ModernCard className="gradient-border" glow>
            <h3 className="text-xl font-bold text-white mb-4">Ready to Activate?</h3>
            <p className="text-white/60 mb-6">
              Proceed to activate Chainlink Automation. This will enable AutomateContract to autonomously execute
              rebalances and compound fees based on AI strategies.
            </p>
            <ModernButton size="lg" className="w-full" onClick={() => setActiveTab("automate")}>
              🔗 Proceed to Automation Setup (Chainlink Automation)
              <ArrowRight className="w-5 h-5 ml-2" />
            </ModernButton>
          </ModernCard>
        </div>
      )}
    </div>
  )
}
