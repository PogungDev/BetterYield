"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, ExternalLink, Play, Calculator, Zap } from "lucide-react"

interface HowItWorksModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl bg-slate-900 border-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            How BetterYield AI Works
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Complete technical breakdown of AI-powered Uniswap V3 optimization using Chainlink infrastructure
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical-flow">Technical Flow</TabsTrigger>
            <TabsTrigger value="apr-formula">APR Formula</TabsTrigger>
            <TabsTrigger value="chainlink">Chainlink</TabsTrigger>
            <TabsTrigger value="ai-strategy">AI Strategy</TabsTrigger>
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
                      <strong>Features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Wallet connection via WalletManager smart contract</li>
                      <li>Blockchain scanning for existing Uniswap V3 positions</li>
                      <li>Real-time price fetching via Chainlink Data Feeds</li>
                      <li>Position analysis: APR calculation, efficiency, fees earned</li>
                      <li>Issue detection: out-of-range periods, low efficiency</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2: AI Analysis */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-400 mb-2">2. AI-Powered Analysis via Chainlink Functions</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>
                        <strong>Chainlink Functions triggers off-chain AI computation</strong>
                      </li>
                      <li>
                        <strong>AI analyzes market data: TVL, volume, volatility patterns</strong>
                      </li>
                      <li>
                        <strong>
                          When TVL drops → AI automatically adjusts narrowing range for liquidity concentration
                        </strong>
                      </li>
                      <li>
                        <strong>Determines optimal tick price range to maximize fee collection</strong>
                      </li>
                      <li>APR improvement estimation using concentrated liquidity formula</li>
                      <li>Strategy generation: rebalance frequency, compound timing</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3: Automation Setup */}
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">3. Chainlink Automation - Rebalancing Process</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Features:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Chainlink Keepers registration for 24/7 monitoring</li>
                      <li>
                        <strong>Price boundary monitoring: trigger 5% before out of range</strong>
                      </li>
                      <li>
                        <strong>Chainlink Data Feeds → monitors ETH/USDC price volatility</strong>
                      </li>
                      <li>
                        <strong>Automated rebalancing process:</strong>
                        <ul className="list-disc list-inside ml-6 mt-1">
                          <li>1. Unmint old position (decreaseLiquidity)</li>
                          <li>2. Collect accumulated fees (collect)</li>
                          <li>3. Calculate new optimal range</li>
                          <li>4. Mint new position in optimal range</li>
                          <li>5. Compound collected fees</li>
                        </ul>
                      </li>
                      <li>Gas optimization and slippage protection</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4: Live Monitoring */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">4. Real-time Monitoring</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Features:</strong>
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

            {/* System Architecture Diagram */}
            <ModernCard className="gradient-border">
              <h3 className="text-xl font-bold text-white mb-4">System Architecture</h3>
              <div className="bg-slate-800/50 rounded-xl p-4">
                {'```mermaid title="BetterYield AI Architecture" type="diagram"'}
                {"graph TD"}
                {'    A["User Wallet"] --> B["BetterYieldMain Contract"]'}
                {'    B --> C["Position Scanner"]'}
                {'    B --> D["AI Optimizer"]'}
                {'    B --> E["Automation Manager"]'}
                {'    B --> F["Live Monitor"]'}

                {'    C --> G["Uniswap V3 Pool"]'}
                {'    D --> H["Chainlink Functions"]'}
                {'    E --> I["Chainlink Automation"]'}
                {'    F --> J["Chainlink Data Feeds"]'}

                {'    H --> K["AI Model Off-chain"]'}
                {'    I --> L["Rebalancing Logic"]'}
                {'    J --> M["Price Monitoring"]'}

                {'    L --> N["Unmint Position"]'}
                {'    N --> O["Collect Fees"]'}
                {'    O --> P["Calculate New Range"]'}
                {'    P --> Q["Mint New Position"]'}
                {'    Q --> R["Compound Fees"]'}
                {"```"}
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="technical-flow" className="space-y-4">
            <ModernCard>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Complete Rebalancing Technical Flow</h3>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                {'```mermaid title="Rebalancing Process Flow" type="diagram"'}
                {"sequenceDiagram"}
                {"    participant CL as Chainlink Automation"}
                {"    participant AI as AI Optimizer"}
                {"    participant PM as Position Manager"}
                {"    participant UV3 as Uniswap V3 Pool"}

                {"    CL->>AI: checkUpkeep() - Price near boundary?"}
                {"    AI->>UV3: getCurrentPrice()"}
                {"    UV3-->>AI: Current price data"}
                {"    AI->>AI: Calculate if rebalancing needed"}
                {"    AI-->>CL: performUpkeep() if needed"}

                {"    CL->>PM: executeRebalance()"}
                {"    PM->>UV3: decreaseLiquidity(tokenId, liquidity, 0, 0)"}
                {"    UV3-->>PM: amount0, amount1"}
                {"    PM->>UV3: collect(tokenId, recipient, MAX, MAX)"}
                {"    UV3-->>PM: collected0, collected1"}

                {"    PM->>AI: calculateOptimalRange(price, volatility, tvl)"}
                {"    AI-->>PM: newTickLower, newTickUpper"}

                {"    PM->>UV3: mint(recipient, fee, tickLower, tickUpper, amount0, amount1)"}
                {"    UV3-->>PM: tokenId, liquidity, amount0, amount1"}

                {"    PM->>PM: compoundFees()"}
                {"```"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
                    <h4 className="font-semibold text-red-300 mb-3">🔄 Step 1: Unmint Position</h4>
                    <div className="text-sm text-slate-300 space-y-2">
                      <p>
                        <strong>Smart Contract Call:</strong>
                      </p>
                      <code className="bg-slate-900 p-2 rounded block text-xs">
                        decreaseLiquidity(tokenId, liquidity, 0, 0)
                      </code>
                      <p>
                        Removes all liquidity from current position, converting LP tokens back to underlying assets.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-3">💰 Step 2: Collect Fees</h4>
                    <div className="text-sm text-slate-300 space-y-2">
                      <p>
                        <strong>Smart Contract Call:</strong>
                      </p>
                      <code className="bg-slate-900 p-2 rounded block text-xs">
                        collect(tokenId, recipient, MAX_UINT128, MAX_UINT128)
                      </code>
                      <p>Harvests all accumulated trading fees from the position before closing it.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-3">🧠 Step 3: AI Calculation</h4>
                    <div className="text-sm text-slate-300 space-y-2">
                      <p>
                        <strong>Chainlink Functions Call:</strong>
                      </p>
                      <code className="bg-slate-900 p-2 rounded block text-xs">
                        calculateOptimalRange(currentPrice, volatility, tvl)
                      </code>
                      <p>AI determines new tick range based on market conditions and volatility analysis.</p>
                    </div>
                  </div>

                  <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-500/30">
                    <h4 className="font-semibold text-emerald-300 mb-3">🎯 Step 4: Mint New Position</h4>
                    <div className="text-sm text-slate-300 space-y-2">
                      <p>
                        <strong>Smart Contract Call:</strong>
                      </p>
                      <code className="bg-slate-900 p-2 rounded block text-xs">
                        mint(recipient, fee, tickLower, tickUpper, amount0, amount1)
                      </code>
                      <p>
                        Creates new position with optimized range, including compounded fees for maximum efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-500/30">
              <h3 className="text-lg font-bold text-white mb-4">🔒 Safety Mechanisms</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-emerald-300 mb-2">Slippage Protection</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Maximum 1% slippage tolerance</li>
                    <li>• Price impact validation</li>
                    <li>• MEV protection mechanisms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Gas Optimization</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Batch operations when possible</li>
                    <li>• Gas price monitoring</li>
                    <li>• Optimal execution timing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">Emergency Controls</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Pause functionality</li>
                    <li>• Manual override options</li>
                    <li>• Position recovery mechanisms</li>
                  </ul>
                </div>
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="apr-formula" className="space-y-4">
            <ModernCard className="border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">APR Formula for Concentrated Liquidity LP</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-300 mb-3">Base Formula:</h4>
                  <div className="text-lg font-mono text-white bg-slate-900 p-3 rounded border-l-4 border-emerald-500">
                    APR = (Fees Collected Over Time / Liquidity Provided) × (365 / Days Active) × 100%
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">Concrete Example:</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong>Scenario:</strong> You earn $2 fees in 24 hours from $1,000 TVL
                    </p>
                    <div className="font-mono text-white bg-slate-900 p-3 rounded border-l-4 border-blue-500">
                      APR ≈ ($2 / $1,000) × 365 × 100% = 73%
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">For Subgraph Implementation:</h4>
                  <div className="font-mono text-white bg-slate-900 p-3 rounded border-l-4 border-purple-500">
                    APR = (feesUSD / totalLiquidityUSD) * 365 * 100%
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl p-4 border border-emerald-500/30">
                  <h4 className="font-semibold text-white mb-3">🎯 Optimization Strategy:</h4>
                  <div className="text-sm text-slate-300 space-y-2">
                    <p>
                      <strong>The key is narrow range rebalancing for better and stable APR yield:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Narrow range = high fee rate but requires more frequent rebalancing</li>
                      <li>Wide range = low fee rate but more stable</li>
                      <li>AI determines optimal sweet spot based on volatility and TVL</li>
                      <li>Target: LP farming stays in-range with maximum yield</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard>
              <h3 className="text-lg font-bold text-white mb-4">Real Example: ETH/USDC Position</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
                  <h4 className="font-semibold text-red-300 mb-2">❌ Before Optimization</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>Range: $1800-$2200 (width: $400)</li>
                    <li>Out of range: 15% of time</li>
                    <li>Capital efficiency: 45%</li>
                    <li>Monthly fees: $85</li>
                    <li>APR: 8.5%</li>
                  </ul>
                </div>
                <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-300 mb-2">✅ After AI Optimization</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>Range: $1950-$2050 (width: $100)</li>
                    <li>Out of range: 5% of time</li>
                    <li>Capital efficiency: 87%</li>
                    <li>Monthly fees: $217</li>
                    <li>APR: 20.8% (+144% improvement)</li>
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
                      Chainlink Data Feeds provide accurate, tamper-proof price data for ETH/USDC.
                      <strong> Monitors price volatility and triggers 5% before out of range for rebalancing.</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">Functions</Badge>
                  <div>
                    <p className="font-semibold text-white">Secure AI Computation</p>
                    <p className="text-slate-300 text-sm">
                      Chainlink Functions securely execute AI models off-chain, analyzing market conditions and
                      <strong>
                        {" "}
                        determining optimal tick price range. When TVL drops, automatically adjusts narrowing for
                        liquidity concentration.
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">Automation</Badge>
                  <div>
                    <p className="font-semibold text-white">Decentralized Execution</p>
                    <p className="text-slate-300 text-sm">
                      Chainlink Automation ensures strategies execute 24/7.
                      <strong>
                        {" "}
                        Triggers rebalancing process: unmint → collect liquidity → mint new position in optimal range.
                      </strong>
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

          <TabsContent value="ai-strategy" className="space-y-4">
            <ModernCard>
              <h3 className="text-xl font-bold text-white mb-4">AI Strategy Engine</h3>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">1. Market Analysis</h4>
                  <p className="text-slate-300 text-sm">
                    AI continuously analyzes trading volume, price volatility, and liquidity distribution across Uniswap
                    V3 pools.
                    <strong> Specifically monitors ETH/USDC market depth and TVL to inform range adjustments.</strong>
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">2. Range Optimization</h4>
                  <p className="text-slate-300 text-sm">
                    AI calculates optimal tick range that maximizes fee collection while maintaining high capital
                    efficiency, typically achieving 80-95% uptime.
                    <strong> Includes narrowing range if TVL decreases to maintain concentrated liquidity.</strong>
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">3. Risk Management</h4>
                  <p className="text-slate-300 text-sm">
                    Advanced algorithms monitor impermanent loss and adjust strategies to minimize risk while maximizing
                    returns.
                    <strong> Maintains stable APR and high yield, staying in range.</strong>
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

            <ModernCard>
              <h3 className="text-lg font-bold text-white mb-4">AI Decision Making Process</h3>
              <div className="bg-slate-800/50 rounded-xl p-4">
                {'```mermaid title="AI Strategy Decision Flow" type="diagram"'}
                {"flowchart TD"}
                {'    A["Market Data Input"] --> B["Volatility Analysis"]'}
                {'    A --> C["TVL Monitoring"]'}
                {'    A --> D["Volume Analysis"]'}

                {'    B --> E["Calculate Optimal Range Width"]'}
                {'    C --> F["Determine Liquidity Concentration"]'}
                {'    D --> G["Assess Fee Potential"]'}

                {'    E --> H["AI Strategy Engine"]'}
                {"    F --> H"}
                {"    G --> H"}

                {'    H --> I{"Range Adjustment Needed?"}'}
                {'    I -->|Yes| J["Calculate New Ticks"]'}
                {'    I -->|No| K["Maintain Current Position"]'}

                {'    J --> L["Execute Rebalancing"]'}
                {'    L --> M["Monitor Performance"]'}
                {"    K --> M"}
                {"    M --> A"}
                {"```"}
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
                    Connect your wallet and discover optimization potential in 30 seconds.
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
