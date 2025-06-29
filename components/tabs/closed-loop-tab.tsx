import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCcw, Brain, TrendingUp } from "lucide-react"

export function ClosedLoopTab() {
  return (
    <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Closed Loop: Continuous Optimization</CardTitle>
        <CardDescription className="text-gray-400">
          Understand how BetterYield AI provides continuous, autonomous yield optimization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-left">
        <div className="flex items-start gap-4">
          <RefreshCcw className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Automated Monitoring</h3>
            <p className="text-gray-300">
              Chainlink Data Feeds continuously monitor market prices and on-chain conditions relevant to your liquidity
              positions.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Brain className="w-8 h-8 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">AI-Driven Analysis (Chainlink Functions)</h3>
            <p className="text-gray-300">
              When conditions change, Chainlink Functions securely trigger our off-chain AI model to analyze your
              position, predict price movements, and determine the optimal new tick range for your Uniswap V3 liquidity.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-green-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Automated Execution (Chainlink Automation)</h3>
            <p className="text-gray-300">
              Once the AI provides a new strategy, Chainlink Automation automatically executes the rebalance (unminting
              old position, minting new position in the optimal tick range) and compounds fees, ensuring your liquidity
              is always working efficiently.
            </p>
          </div>
        </div>
        <p className="text-gray-400 mt-4">
          This closed-loop system minimizes impermanent loss, maximizes fee collection, and frees you from constant
          manual management.
        </p>
      </CardContent>
    </Card>
  )
}
