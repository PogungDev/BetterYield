"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, ExternalLink, Play } from "lucide-react"

interface LearnMoreModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-900 border-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            How BetterYield AI Works
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Learn about AI-powered Uniswap V3 optimization using Chainlink infrastructure
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chainlink">Chainlink</TabsTrigger>
            <TabsTrigger value="ai">AI Strategy</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ModernCard>
              <h3 className="text-xl font-bold text-white mb-4">Complete Step-by-Step Process</h3>
              <div className="space-y-6">
                {/* Step 1: Connect & Scan */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-400 mb-2">1. Connect & Discover</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Sub-features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Wallet connection via WalletManager smart contract</li>
                      <li>Blockchain scanning for existing Uniswap V3 positions</li>
                      <li>Real-time price fetching via Chainlink Data Feeds</li>
                      <li>Position analysis: APR, efficiency, fees earned</li>
                      <li>Issue detection: out-of-range periods, low efficiency</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2: AI Analysis */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-400 mb-2">2. AI-Powered Analysis</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Sub-features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>**Chainlink Functions triggers off-chain AI computation.**</li>
                      <li>**AI analyzes market data (TVL, volume, volatility) to determine optimal tick range.**</li>
                      <li>**Adjusts range (narrowing/widening) based on TVL changes to maximize fees.**</li>
                      <li>APR improvement estimation and risk assessment.</li>
                      <li>Strategy generation: rebalance frequency, compound timing.</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3: Automation Setup */}
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">3. Chainlink Automation</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Sub-features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Chainlink Keepers registration for 24/7 monitoring.</li>
                      <li>**Price boundary monitoring via `checkUpkeep()` using Chainlink Data Feeds.**</li>
                      <li>
                        **Automated rebalancing: Unmint old position → Empty liquidity → Mint new position in optimal
                        range.**
                      </li>
                      <li>Fee collection and auto-compounding.</li>
                      <li>Gas optimization and slippage protection.</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4: Live Monitoring */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">4. Real-time Monitoring</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Sub-features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Live position tracking and performance metrics</li>
                      <li>Automation activity logs and transaction history</li>
                      <li>APR trend analysis and yield comparisons</li>
                      <li>Risk monitoring: impermanent loss, position health</li>
                      <li>Emergency controls and pause functionality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ModernCard>

            {/* Technical Implementation Details */}
            <ModernCard className="gradient-border">
              <h3 className="text-xl font-bold text-white mb-4">Technical Implementation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">Smart Contract Architecture</h4>
                  <ul className="text-sm text-slate-300 space-y-2">
                    <li>
                      <strong>BetterYieldMain:</strong> Main orchestrator contract
                    </li>
                    <li>
                      <strong>VaultStorage:</strong> Position data management
                    </li>
                    <li>
                      <strong>PositionScanner:</strong> Blockchain position discovery
                    </li>
                    <li>
                      <strong>AIOptimizer:</strong> Chainlink Functions integration
                    </li>
                    <li>
                      <strong>AutomationManager:</strong> Chainlink Keepers integration
                    </li>
                    <li>
                      <strong>LiveMonitor:</strong> Real-time data aggregation
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Uniswap V3 Integration</h4>
                  <ul className="text-sm text-slate-300 space-y-2">
                    <li>
                      <strong>Position Manager:</strong> NFT minting/burning
                    </li>
                    <li>
                      <strong>Pool Interface:</strong> Price and liquidity data
                    </li>
                    <li>
                      <strong>Tick Math:</strong> Range calculations
                    </li>
                    <li>
                      <strong>Fee Collection:</strong> Automated harvesting
                    </li>
                    <li>
                      <strong>Slippage Protection:</strong> MEV resistance
                    </li>
                  </ul>
                </div>
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="chainlink" className="space-y-4">
            <ModernCard>
              <h3 className="text-xl font-bold text-white mb-4">Powered by Chainlink Infrastructure</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">Data Feeds</Badge>
                  <div>
                    <p className="font-semibold text-white">Real-time Price Monitoring</p>
                    <p className="text-slate-300 text-sm">
                      Chainlink Data Feeds provide accurate, tamper-proof price data for all major assets, enabling
                      precise trigger conditions for rebalancing. **For ETH/USDC, it monitors the 5% price volatility
                      threshold before going out of range.**
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">Functions</Badge>
                  <div>
                    <p className="font-semibold text-white">Secure AI Computation</p>
                    <p className="text-slate-300 text-sm">
                      Chainlink Functions securely execute our AI models off-chain, analyzing market conditions and
                      computing optimal strategies without exposing sensitive algorithms. **This is where the optimal
                      tick price range is determined, adjusting for factors like TVL changes.**
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">Automation</Badge>
                  <div>
                    <p className="font-semibold text-white">Decentralized Execution</p>
                    <p className="text-slate-300 text-sm">
                      Chainlink Automation ensures your strategies are executed reliably 24/7 without any centralized
                      points of failure. **It triggers the rebalancing process (unmint old position, mint new optimal
                      position) when conditions are met.**
                    </p>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <h4 className="font-semibold text-white">Security & Reliability</h4>
              </div>
              <p className="text-slate-300 text-sm">
                Chainlink's battle-tested infrastructure secures over $15 billion in DeFi protocols. Your funds never
                leave your control, and all operations are transparent on-chain.
              </p>
            </ModernCard>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <ModernCard>
              <h3 className="text-xl font-bold text-white mb-4">AI Strategy Engine</h3>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">1. Market Analysis</h4>
                  <p className="text-slate-300 text-sm">
                    Our AI continuously analyzes trading volume, price volatility, and liquidity distribution across
                    Uniswap V3 pools to identify optimal opportunities. **It specifically monitors ETH/USDC market depth
                    and TVL to inform range adjustments.**
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">2. Range Optimization</h4>
                  <p className="text-slate-300 text-sm">
                    The AI calculates the optimal tick range that maximizes fee collection while maintaining high
                    capital efficiency, typically achieving 80-95% uptime. **This includes narrowing the range if TVL
                    decreases to maintain concentrated liquidity.**
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">3. Risk Management</h4>
                  <p className="text-slate-300 text-sm">
                    Advanced algorithms monitor impermanent loss and adjust strategies to minimize risk while maximizing
                    returns.
                  </p>
                </div>
              </div>
            </ModernCard>

            <ModernCard className="gradient-border">
              <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">15.2%</p>
                  <p className="text-slate-400 text-sm">Avg APR Increase</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">87%</p>
                  <p className="text-slate-400 text-sm">Avg Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-400">2.1x</p>
                  <p className="text-slate-400 text-sm">Fee Multiplier</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">24/7</p>
                  <p className="text-slate-400 text-sm">Monitoring</p>
                </div>
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModernCard>
                <h3 className="text-lg font-bold text-emerald-400 mb-3">Higher Yields</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• 5-15% higher APR on average</li>
                  <li>• Optimal capital efficiency (80-95%)</li>
                  <li>• Automatic fee compounding</li>
                  <li>• Reduced impermanent loss</li>
                </ul>
              </ModernCard>

              <ModernCard>
                <h3 className="text-lg font-bold text-blue-400 mb-3">Hands-Free Management</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• 24/7 automated monitoring</li>
                  <li>• No manual rebalancing needed</li>
                  <li>• Gas-optimized transactions</li>
                  <li>• Set-and-forget operation</li>
                </ul>
              </ModernCard>

              <ModernCard>
                <h3 className="text-lg font-bold text-purple-400 mb-3">Advanced Technology</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• AI-powered optimization</li>
                  <li>• Chainlink infrastructure</li>
                  <li>• Decentralized execution</li>
                  <li>• Transparent on-chain operations</li>
                </ul>
              </ModernCard>

              <ModernCard>
                <h3 className="text-lg font-bold text-yellow-400 mb-3">Risk Management</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Non-custodial (you keep control)</li>
                  <li>• Audited smart contracts</li>
                  <li>• Configurable risk parameters</li>
                  <li>• Emergency pause functionality</li>
                </ul>
              </ModernCard>
            </div>

            <ModernCard className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Ready to Get Started?</h3>
                  <p className="text-slate-300 text-sm">
                    Connect your wallet and discover your optimization potential in under 30 seconds.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 text-sm">Watch Demo</span>
                </div>
              </div>
            </ModernCard>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-4">
          <a
            href="https://docs.betteryield.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Read Full Documentation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
