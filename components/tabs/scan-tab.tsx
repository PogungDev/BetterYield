"use client"

import { useState, useTransition } from "react"
import { ModernButton } from "@/components/modern-button"
import { ModernCard } from "@/components/modern-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, CheckCircle, AlertTriangle, Wallet, Activity, Zap } from "lucide-react"
import { scanPositionsSimulation } from "@/lib/contract-interactions"
import { Badge } from "@/components/ui/badge"
import { ModernTickVisualizer } from "@/components/modern-tick-visualizer"

interface ScanTabProps {
  walletAddress: string
  onScanComplete: (positions: any[]) => void
}

export function ScanTab({ walletAddress, onScanComplete }: ScanTabProps) {
  const [isScanning, startScanningTransition] = useTransition()
  const [scanResult, setScanResult] = useState<any>(null)
  const [scanProgress, setScanProgress] = useState(0)

  // Simulate live ETH price updates
  const [currentEthPrice, setCurrentEthPrice] = useState(2000)

  const handleScan = async () => {
    setScanResult(null)
    setScanProgress(0)

    startScanningTransition(async () => {
      // Animated progress
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 200)

      // Call smart contract simulation - focused on ETH/USDC only
      const positions = await scanPositionsSimulation(walletAddress)

      setScanProgress(100)
      clearInterval(progressInterval)

      const position = positions[0] // Single ETH/USDC position
      setScanResult({
        totalValue: position.value,
        totalFees: position.feesEarned,
        avgEfficiency: position.efficiency,
        positionsCount: 1,
        positions,
      })

      onScanComplete(positions)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gradient mb-4">Discover Your ETH/USDC Position</h2>
          <p className="text-white/70 text-lg">
            We'll scan the blockchain to find your ETH/USDC liquidity position and analyze its performance in detail
          </p>

          {/* CHAINLINK NOTICE - PROMINENT */}
          <div className="mt-6 p-6 glass rounded-xl border-2 border-blue-500/50 max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <h3 className="text-xl font-bold text-blue-400 mb-3">🔗 CHAINLINK INTEGRATION ACTIVE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-300 mb-2">📡 Blockchain Scanning</h4>
                <ul className="text-blue-200/80 space-y-1 list-disc list-inside ml-2">
                  <li>ETH/USDC position discovery via Uniswap V3 contracts</li>
                  <li>Real-time position value calculation</li>
                  <li>Historical performance analysis</li>
                  <li>Fee collection tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-300 mb-2">📊 Performance Analysis</h4>
                <ul className="text-blue-200/80 space-y-1 list-disc list-inside ml-2">
                  <li>APR calculation using Chainlink ETH/USD feeds</li>
                  <li>Capital efficiency measurement</li>
                  <li>Out-of-range period detection</li>
                  <li>Optimization opportunity identification</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 glass rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">Smart Contract Flow:</span>
            </div>
            <p className="text-blue-200/80 text-xs mt-2">
              BetterYieldMain → ScanAnalyzeContract → VaultStorage + Chainlink ETH/USD Data Feed
            </p>
          </div>
        </div>

        {/* Current ETH/USDC Position Visualization */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white text-center mb-4">Current ETH/USDC Position Analysis</h3>
          <ModernTickVisualizer
            poolName="ETH/USDC (0.05%) - Current Position"
            currentPrice={currentEthPrice}
            tickLower={1800}
            tickUpper={2200}
          />
        </div>

        <ModernCard className="gradient-border">
          <div className="space-y-8">
            {/* Wallet Input */}
            <div className="space-y-3">
              <Label htmlFor="wallet" className="text-white/80 font-medium">
                Connected Wallet Address
              </Label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="wallet"
                  value={walletAddress}
                  readOnly
                  className="pl-12 glass border-white/20 text-white font-mono text-lg py-4 rounded-xl"
                />
              </div>
            </div>

            {/* Scan Button - SMART CONTRACT TRIGGER */}
            <ModernButton
              onClick={handleScan}
              disabled={isScanning}
              loading={isScanning}
              size="lg"
              className="w-full group"
            >
              {isScanning ? (
                <>
                  <Activity className="w-5 h-5 mr-3 animate-spin" />
                  Scanning for ETH/USDC Position...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />🔗 Scan ETH/USDC
                  Position (Chainlink Powered)
                </>
              )}
            </ModernButton>

            {/* Progress Bar */}
            {isScanning && (
              <div className="space-y-4">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>

                <div className="space-y-2 text-center text-sm text-white/60">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span>Calling BetterYieldMain.getETHUSDCPosition()...</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span>ScanAnalyzeContract reading ETH/USDC VaultStorage...</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                    <span>🔗 Fetching ETH/USD price via Chainlink Data Feed...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {scanResult && (
              <>
                <ModernCard className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">ETH/USDC Position Found!</h3>
                      <p className="text-white/60">Analyzing your liquidity position performance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">
                        ${scanResult.totalValue.toLocaleString()}
                      </div>
                      <div className="text-white/60 text-sm">Position Value</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-1">${scanResult.totalFees}</div>
                      <div className="text-white/60 text-sm">Fees Earned</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">ETH/USDC</div>
                      <div className="text-white/60 text-sm">Pool (0.05%)</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">
                        {scanResult.avgEfficiency.toFixed(0)}%
                      </div>
                      <div className="text-white/60 text-sm">Capital Efficiency</div>
                    </div>
                  </div>

                  {scanResult.avgEfficiency < 50 && (
                    <div className="mt-6 glass rounded-xl p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-semibold">Major Optimization Opportunity Detected!</span>
                      </div>
                      <p className="text-yellow-300/80 text-sm mt-2">
                        Your ETH/USDC position is running at only {scanResult.avgEfficiency}% efficiency. AI
                        optimization could potentially <strong>double your yields</strong>.
                      </p>
                    </div>
                  )}
                </ModernCard>

                {/* Detailed ETH/USDC Position Analysis */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">ETH/USDC Position Deep Analysis</h3>
                  {scanResult.positions.map((position: any, index: number) => (
                    <div key={index} className="space-y-4">
                      <ModernCard>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-white">ETH/USDC Pool (0.05% fee tier)</h4>
                            <p className="text-white/60 text-sm">Position Value: ${position.value.toLocaleString()}</p>
                            <p className="text-white/60 text-sm">Current ETH Price: ${position.currentPrice}</p>
                          </div>
                          <Badge
                            variant={position.status === "In Range" ? "default" : "destructive"}
                            className={
                              position.status === "In Range"
                                ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                                : "bg-red-600/20 text-red-400 border-red-500/30"
                            }
                          >
                            {position.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="glass rounded-xl p-3">
                            <p className="text-sm text-white/60">Current APR</p>
                            <p className="text-xl font-bold text-purple-400">{position.apr}%</p>
                            <p className="text-xs text-red-300">Below potential</p>
                          </div>
                          <div className="glass rounded-xl p-3">
                            <p className="text-sm text-white/60">Capital Efficiency</p>
                            <p className="text-xl font-bold text-blue-400">{position.efficiency}%</p>
                            <p className="text-xs text-yellow-300">Needs optimization</p>
                          </div>
                          <div className="glass rounded-xl p-3">
                            <p className="text-sm text-white/60">Fees Earned</p>
                            <p className="text-xl font-bold text-emerald-400">${position.feesEarned}</p>
                            <p className="text-xs text-emerald-300">Could be 2.4x higher</p>
                          </div>
                          <div className="glass rounded-xl p-3">
                            <p className="text-sm text-white/60">Days Out of Range</p>
                            <p className="text-xl font-bold text-yellow-400">{position.daysOutOfRange || 12}</p>
                            <p className="text-xs text-red-300">Lost opportunities</p>
                          </div>
                        </div>

                        {/* Before vs After Comparison */}
                        <div className="glass rounded-xl p-4 mb-4">
                          <h5 className="font-semibold text-white mb-3">📊 Before vs After Optimization Preview:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-red-500 pl-3">
                              <p className="font-semibold text-red-400">❌ Current Performance</p>
                              <ul className="text-sm text-white/70 space-y-1">
                                <li>• Wide range: $1800-$2200 ($400 width)</li>
                                <li>• APR: 8.5% (below market average)</li>
                                <li>• Capital efficiency: 45%</li>
                                <li>• Monthly fees: $85</li>
                                <li>• Out of range: 15% of time</li>
                              </ul>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-3">
                              <p className="font-semibold text-emerald-400">✅ After AI Optimization</p>
                              <ul className="text-sm text-white/70 space-y-1">
                                <li>• Narrow range: $1950-$2050 ($100 width)</li>
                                <li>• APR: 20.8% (+144% improvement)</li>
                                <li>• Capital efficiency: 87% (+93% boost)</li>
                                <li>• Monthly fees: $217 (+155% increase)</li>
                                <li>• Out of range: 5% of time</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Optimization Potential Preview */}
                        <div className="glass rounded-xl p-4 border border-emerald-500/30">
                          <h5 className="font-semibold text-emerald-400 mb-2">🚀 Optimization Potential Preview:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-white/60">Potential APR</p>
                              <p className="text-2xl font-bold text-emerald-400">20.8%</p>
                              <p className="text-xs text-emerald-300">+12.3% increase</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white/60">Target Efficiency</p>
                              <p className="text-2xl font-bold text-blue-400">87%</p>
                              <p className="text-xs text-blue-300">+42% improvement</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white/60">Optimal Range</p>
                              <p className="text-lg font-bold text-purple-400">[1950-2050]</p>
                              <p className="text-xs text-purple-300">$100 width</p>
                            </div>
                          </div>
                        </div>
                      </ModernCard>

                      {/* ETH/USDC Tick Price Visualizer */}
                      <ModernTickVisualizer
                        poolName="ETH/USDC (0.05%) - Current Position Analysis"
                        currentPrice={position.currentPrice}
                        tickLower={position.tickLower}
                        tickUpper={position.tickUpper}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </ModernCard>
      </div>
    </div>
  )
}
