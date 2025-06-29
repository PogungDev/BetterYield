import { AlertCircle, ArrowDownRight, DollarSign, Zap } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export function ProblemSolutionCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <Card className="bg-[#1A1A1A] border border-[#EF4444] rounded-xl p-6 flex flex-col items-center text-center space-y-3">
        <AlertCircle className="w-10 h-10 text-[#EF4444]" />
        <CardTitle className="text-lg font-semibold text-[#EF4444]">Wide Ranges = Low Fees</CardTitle>
        <CardContent className="text-sm text-gray-400 p-0">
          Your range might be too wide, collecting minimal fees from trading activity
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A1A] border border-[#F59E0B] rounded-xl p-6 flex flex-col items-center text-center space-y-3">
        <ArrowDownRight className="w-10 h-10 text-[#F59E0B]" />
        <CardTitle className="text-lg font-semibold text-[#F59E0B]">No Auto-Rebalancing</CardTitle>
        <CardContent className="text-sm text-gray-400 p-0">
          When prices move, your position becomes less efficient without manual intervention
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A1A] border border-[#EAB308] rounded-xl p-6 flex flex-col items-center text-center space-y-3">
        <DollarSign className="w-10 h-10 text-[#EAB308]" />
        <CardTitle className="text-lg font-semibold text-[#EAB308]">Fees Not Compounded</CardTitle>
        <CardContent className="text-sm text-gray-400 p-0">
          Earned fees just sit there instead of being reinvested to earn more fees
        </CardContent>
      </Card>

      <div className="md:col-span-3 w-full">
        <Card
          className="bg-[#1A1A1A] border-2 border-transparent rounded-xl p-8 space-y-6 relative overflow-hidden
          before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-br before:from-[#6366F1] before:via-[#A855F7] before:to-[#EC4899] before:z-0 before:content-['']
          after:absolute after:inset-0 after:rounded-xl after:bg-[#1A1A1A] after:z-10 after:content-['']
        "
        >
          <div className="relative z-20 flex flex-col items-center text-center space-y-4">
            <Zap className="w-12 h-12 text-[#A855F7]" />
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              BetterYield AI optimizes everything automatically
            </CardTitle>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full p-0">
              <div className="flex items-start gap-2">
                <span className="text-[#34D399] text-xl">•</span>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Smart Range Optimization</span>
                  <br />
                  Automatically adjusts ranges for maximum capital efficiency
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#34D399] text-xl">•</span>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">24/7 Auto-Rebalancing</span>
                  <br />
                  Chainlink automation keeps your position optimal
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#34D399] text-xl">•</span>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Auto-Compounding</span>
                  <br />
                  Fees are automatically reinvested every hour
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
