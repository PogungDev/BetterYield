import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DashboardTabProps {
  walletAddress: string | null
}

export function DashboardTab({ walletAddress }: DashboardTabProps) {
  if (!walletAddress) {
    return (
      <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Monitor & Control</CardTitle>
          <CardDescription className="text-gray-400">
            Connect your wallet to monitor your optimized positions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Please connect your wallet and optimize positions to see your dashboard.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Monitor & Control</CardTitle>
        <CardDescription className="text-gray-400">
          Overview of your active AI-optimized positions for wallet:{" "}
          <span className="font-semibold">{walletAddress}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-lg">Total Optimized Value</h4>
            <p className="text-3xl font-bold text-green-400">$20,500</p>
            <p className="text-sm text-gray-400">Across 2 active positions</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-lg">Estimated Monthly Yield</h4>
            <p className="text-3xl font-bold text-purple-400">$250</p>
            <p className="text-sm text-gray-400">Based on current strategies</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Optimizations</h3>
          <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">ETH/USDC Pool (0.05%)</h4>
              <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
            </div>
            <p className="text-sm text-gray-400">Strategy: AI-Optimized Dynamic Rebalancing</p>
            <p className="text-sm text-gray-400">Next Rebalance: ~12 hours (Automation ID: auto-1719782400000)</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-20">Progress:</span>
              <Progress
                value={75}
                className="w-full h-2 bg-gray-700 [&>*]:bg-gradient-to-r [&>*]:from-[#6366F1] [&>*]:to-[#EC4899]"
              />
              <span>75% in current range</span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">WBTC/USDT Pool (0.3%)</h4>
              <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending Rebalance</Badge>
            </div>
            <p className="text-sm text-gray-400">Strategy: AI-Optimized Re-entry</p>
            <p className="text-sm text-gray-400">Trigger: Price touch barrier (Automation ID: auto-1719782500000)</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-20">Progress:</span>
              <Progress
                value={20}
                className="w-full h-2 bg-gray-700 [&>*]:bg-gradient-to-r [&>*]:from-[#6366F1] [&>*]:to-[#EC4899]"
              />
              <span>20% to rebalance point</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
