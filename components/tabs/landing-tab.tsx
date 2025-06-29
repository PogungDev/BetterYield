"use client"

import { Button } from "@/components/ui/button"
import { Search, ArrowRight, AlertCircle, ArrowDownRight, DollarSign, Zap } from "lucide-react"

interface LandingTabProps {
  onConnectWallet: () => void
}

export function LandingTab({ onConnectWallet }: LandingTabProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {"More than AI Powered Yield Optimizer, "}
          <span className="text-[#6366F1]">Chainlink Fund Manager?</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-400">
          Monitored by Data Feeds. 24/7 by Automation. Optimized by Functions.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-[#1A1A1A] border border-[#EF4444] rounded-xl p-6 flex flex-col items-center text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-[#EF4444]" />
          <h3 className="text-lg font-semibold text-[#EF4444]">Wide Ranges = Low Fees</h3>
          <p className="text-sm text-gray-400">
            Your range might be too wide, collecting minimal fees from trading activity
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#F59E0B] rounded-xl p-6 flex flex-col items-center text-center space-y-3">
          <ArrowDownRight className="w-10 h-10 text-[#F59E0B]" />
          <h3 className="text-lg font-semibold text-[#F59E0B]">No Auto-Rebalancing</h3>
          <p className="text-sm text-gray-400">
            When prices move, your position becomes less efficient without manual intervention
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#EAB308] rounded-xl p-6 flex flex-col items-center text-center space-y-3">
          <DollarSign className="w-10 h-10 text-[#EAB308]" />
          <h3 className="text-lg font-semibold text-[#EAB308]">Fees Not Compounded</h3>
          <p className="text-sm text-gray-400">
            Earned fees just sit there instead of being reinvested to earn more fees
          </p>
        </div>

        <div
          className="md:col-span-3 w-full bg-[#1A1A1A] border-2 border-transparent rounded-xl p-8 space-y-6 relative overflow-hidden
          before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-br before:from-[#6366F1] before:via-[#A855F7] before:to-[#EC4899] before:z-0 before:content-['']
          after:absolute after:inset-0 after:rounded-xl after:bg-[#1A1A1A] after:z-10 after:content-['']
        "
        >
          <div className="relative z-20 flex flex-col items-center text-center space-y-4">
            <Zap className="w-12 h-12 text-[#A855F7]" />
            <h3 className="text-2xl sm:text-3xl font-bold">BetterYield AI optimizes everything automatically</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full p-0">
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
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-4xl">
        <Button
          onClick={onConnectWallet}
          className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Search className="w-5 h-5" />
          Connect Wallet & Scan
          <ArrowRight className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          className="bg-transparent border border-gray-600 text-white px-8 py-6 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          How It Works
        </Button>
      </section>
    </div>
  )
}
