"use client"

import { useState, useTransition } from "react"
import { ModernButton } from "@/components/modern-button"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle, Settings, Activity, Clock } from "lucide-react"
import { ModernTickVisualizer } from "@/components/modern-tick-visualizer"
import { activateAutomationSimulation } from "@/lib/contract-interactions"

interface AutomateTabProps {
  walletAddress: string
  strategies: any[]
  onAutomationComplete: () => void
  onNewActivity: (activity: string) => void
  setActiveTab: (tab: string) => void
}

export function AutomateTab({
  walletAddress,
  strategies,
  onAutomationComplete,
  onNewActivity,
  setActiveTab,
}: AutomateTabProps) {
  const [isActivating, startActivatingTransition] = useTransition()
  const [automationActive, setAutomationActive] = useState(false)
  const [automationSettings, setAutomationSettings] = useState({
    rebalanceThreshold: 5, // 5% before out of range
    gasLimit: 500000,
    slippageTolerance: 0.5,
    compoundThreshold: 10, // $10 minimum fees to compound
  })

  const handleActivateAutomation = async () => {
    startActivatingTransition(async () => {
      await activateAutomationSimulation(walletAddress, strategies, automationSettings)
      setAutomationActive(true)
      onAutomationComplete()
      onNewActivity("Automation activated for ETH/USDC pool.")
    })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gradient">Chainlink Automation</h2>
        <p className="text-white/60 text-lg">
          Set up 24/7 automated rebalancing and fee compounding for your optimized positions.
        </p>
      </div>

      {/* CHAINLINK NOTICE - PROMINENT */}
      <ModernCard className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-2 border-emerald-500/50">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-emerald-400 mb-4">🔗 CHAINLINK AUTOMATION ENGINE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-400 mb-2">📊 Price Monitoring</h4>
                <p className="text-sm text-white/70">
                  <strong>Chainlink Data Feeds continuously monitor ETH/USDC price volatility.</strong>
                  Triggers rebalancing when price reaches 5% before out of range to maintain optimal position.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-semibold text-emerald-400 mb-2">🤖 Automated Rebalancing Process</h4>
                <p className="text-sm text-white/70">
                  <strong>Smart contract process: Unmint old position → Empty liquidity → Mint new position</strong>
                  in optimal range determined by AI via Chainlink Functions.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-400 mb-2">💰 Fee Compounding</h4>
                <p className="text-sm text-white/70">
                  Automatically collects and reinvests fees back into position when accumulated fees exceed threshold
                  (default $10 to cover gas costs). Maximizes compound growth.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-400 mb-2">⚡ Gas Optimization</h4>
                <p className="text-sm text-white/70">
                  Chainlink Keepers execute transactions during optimal gas periods. Includes slippage protection and
                  MEV resistance for secure execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModernCard>

      {/* Rebalancing Process Explanation */}
      <ModernCard className="border border-blue-500/30">
        <h3 className="text-xl font-bold text-white mb-4">🔄 Detailed Rebalancing Process (Mint/Unmint)</h3>
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-400 mb-3">Step-by-Step Rebalancing Process:</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-red-300">UNMINT Old Position</p>
                  <p>Call Uniswap V3 decreaseLiquidity() to remove liquidity from current range [1800-2200]</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-yellow-300">COLLECT Fees & Assets</p>
                  <p>Call collect() to withdraw accumulated fees and remaining ETH/USDC tokens</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-purple-300">CALCULATE New Amounts</p>
                  <p>AI determines optimal token amounts for new range [1950-2050] based on current price</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <div>
                  <p className="font-semibold text-emerald-300">MINT New Position</p>
                  <p>Call Uniswap V3 mint() to create new position in optimal range with concentrated liquidity</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  5
                </span>
                <div>
                  <p className="font-semibold text-blue-300">UPDATE Storage</p>
                  <p>Update VaultStorage with new position data and reset monitoring parameters</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-500/30">
            <h4 className="font-semibold text-emerald-400 mb-2">🎯 Result:</h4>
            <p className="text-sm text-white/70">
              Your liquidity is now concentrated in the optimal [1950-2050] range, capturing 80% of trading volume
              instead of 45%, resulting in 2.4x higher fee collection rate.
            </p>
          </div>
        </div>
      </ModernCard>

      {!automationActive ? (
        <div className="space-y-6">
          {/* Automation Settings */}
          <ModernCard>
            <h3 className="text-lg font-bold text-white mb-4">⚙️ Automation Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">Rebalance Threshold</p>
                    <p className="text-sm text-white/60">
                      Trigger rebalancing when price moves X% towards range boundary
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-400">{automationSettings.rebalanceThreshold}%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">Compound Threshold</p>
                    <p className="text-sm text-white/60">Minimum fees to trigger auto-compounding</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-400">${automationSettings.compoundThreshold}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">Gas Limit</p>
                    <p className="text-sm text-white/60">Maximum gas for each automation transaction</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-400">{automationSettings.gasLimit.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">Slippage Tolerance</p>
                    <p className="text-sm text-white/60">Maximum acceptable slippage for rebalancing</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-400">{automationSettings.slippageTolerance}%</p>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Strategy Summary */}
          <ModernCard>
            <h3 className="text-lg font-bold text-white mb-4">📋 Strategies to Automate</h3>
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <div key={strategy.positionId} className="glass rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{strategy.pool}</h4>
                      <p className="text-sm text-white/60">Position ID: {strategy.positionId}</p>
                    </div>
                    <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">Ready</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Target APR</p>
                      <p className="font-semibold text-emerald-400">{strategy.targetApr}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Rebalance Freq</p>
                      <p className="font-semibold text-blue-400">{strategy.rebalanceFrequency}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Risk Level</p>
                      <p className="font-semibold text-purple-400">{strategy.riskLevel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>

          {/* Smart Contract Flow */}
          <ModernCard className="border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-300 text-sm mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-semibold text-lg text-white">Smart Contract Automation Flow:</span>
            </div>
            <div className="text-purple-200/80 text-sm space-y-2">
              <p>
                1. <strong>AutomateContract.registerUpkeep()</strong> → Register with Chainlink Keepers
              </p>
              <p>
                2. <strong>checkUpkeep()</strong> → Monitor price boundaries via Chainlink Data Feeds
              </p>
              <p>
                3. <strong>performUpkeep()</strong> → Execute rebalancing when conditions met:
              </p>
              <div className="ml-6 space-y-1 text-xs">
                <p>• Call Uniswap V3 decreaseLiquidity() → Unmint old position</p>
                <p>• Collect fees and empty liquidity</p>
                <p>• Call Uniswap V3 mint() → Create new position in optimal range</p>
                <p>• Update VaultStorage with new position data</p>
              </div>
              <p>
                4. <strong>Continuous monitoring</strong> → Repeat process 24/7
              </p>
            </div>
          </ModernCard>

          <ModernButton
            onClick={handleActivateAutomation}
            disabled={isActivating || strategies.length === 0}
            loading={isActivating}
            size="lg"
            className="w-full"
          >
            <Zap className="w-5 h-5 mr-2" />🔗 Activate Chainlink Automation
          </ModernButton>

          {isActivating && (
            <div className="space-y-2 text-center text-sm text-white/60 mt-4">
              <p>🔗 Registering with Chainlink Keepers...</p>
              <p>⚙️ Setting up automation parameters...</p>
              <p>🤖 Deploying AutomateContract.registerUpkeep()...</p>
              <p>📊 Connecting to Chainlink Data Feeds...</p>
              <p>✅ Automation activated successfully!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <ModernCard className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-emerald-500/50">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-lg text-white">Automation Active!</span>
            </div>
            <p className="text-white/60">
              Chainlink Keepers are now monitoring your positions 24/7. Rebalancing will occur automatically when price
              moves within 5% of range boundaries.
            </p>
          </ModernCard>

          {/* Live Automation Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModernCard>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-white">Status</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">Active</p>
              <p className="text-sm text-white/60">Monitoring {strategies.length} positions</p>
            </ModernCard>

            <ModernCard>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Next Check</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">2m 15s</p>
              <p className="text-sm text-white/60">Chainlink Keepers interval</p>
            </ModernCard>

            <ModernCard>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Gas Balance</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">0.05 ETH</p>
              <p className="text-sm text-white/60">Sufficient for ~50 rebalances</p>
            </ModernCard>
          </div>

          {/* Automated Position Visualization */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white text-center mb-4">Live Automated Position</h3>
            <ModernTickVisualizer
              poolName="ETH/USDC - Automated Position (Live)"
              currentPrice={2000}
              tickLower={1950}
              tickUpper={2050}
            />
          </div>

          <ModernCard className="gradient-border" glow>
            <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
            <p className="text-white/60 mb-6">
              Your positions are now fully automated! Monitor performance and automation activity in Monitor tab. You
              can pause or modify settings anytime.
            </p>
            <ModernButton size="lg" className="w-full" onClick={() => setActiveTab("monitor")}>
              🔗 Go to Live Monitoring (Chainlink Powered)
              <Activity className="w-5 h-5 ml-2" />
            </ModernButton>
          </ModernCard>
        </div>
      )}
    </div>
  )
}
