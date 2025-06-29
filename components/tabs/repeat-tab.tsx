import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, ShieldCheck, DollarSign } from "lucide-react"

export function RepeatTab() {
  return (
    <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Repeat: Automated Improvement</CardTitle>
        <CardDescription className="text-gray-400">
          Experience the benefits of continuous, automated yield optimization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-left">
        <div className="flex items-start gap-4">
          <Zap className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Maximized Yield</h3>
            <p className="text-gray-300">
              By constantly adjusting your liquidity ranges to market conditions, our AI ensures your capital is always
              concentrated where it earns the most fees.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-green-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Reduced Risk & Effort</h3>
            <p className="text-gray-300">
              Automated rebalancing helps mitigate impermanent loss and eliminates the need for constant manual
              monitoring and adjustments.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <DollarSign className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Compounding Power</h3>
            <p className="text-gray-300">
              Fees are automatically reinvested, leveraging the power of compounding to grow your returns exponentially
              over time.
            </p>
          </div>
        </div>
        <p className="text-gray-400 mt-4">
          BetterYield AI transforms passive liquidity provision into an active, high-performing strategy, all on
          autopilot.
        </p>
      </CardContent>
    </Card>
  )
}
