"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { requestAiOptimization, configureAutomation } from "@/app/actions/optimize"

export function OptimizationSection() {
  const [walletAddress, setWalletAddress] = useState("")
  const [optimizationResult, setOptimizationResult] = useState<any>(null)
  const [automationResult, setAutomationResult] = useState<any>(null)
  const [isPendingOptimization, startOptimizationTransition] = useTransition()
  const [isPendingAutomation, startAutomationTransition] = useTransition()

  const handleOptimize = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address.")
      return
    }
    setOptimizationResult(null)
    startOptimizationTransition(async () => {
      const result = await requestAiOptimization(walletAddress)
      setOptimizationResult(result)
    })
  }

  const handleConfigureAutomation = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address.")
      return
    }
    setAutomationResult(null)
    startAutomationTransition(async () => {
      const result = await configureAutomation(walletAddress, "daily-rebalance-hourly-compound")
      setAutomationResult(result)
    })
  }

  return (
    <Card className="w-full max-w-2xl bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">AI-Powered Optimization & Automation</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your wallet address to get AI-driven yield optimization strategies and configure Chainlink Automation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="walletAddress" className="text-gray-300">
            Your Wallet Address
          </Label>
          <Input
            id="walletAddress"
            placeholder="0x..."
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleOptimize}
            disabled={isPendingOptimization || !walletAddress}
            className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white py-2 rounded-md text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {isPendingOptimization ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Request AI Optimization"}
          </Button>
          <Button
            onClick={handleConfigureAutomation}
            disabled={isPendingAutomation || !walletAddress}
            className="flex-1 bg-gray-700 border border-gray-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            {isPendingAutomation ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Configure Automation"}
          </Button>
        </div>

        {optimizationResult && (
          <div
            className={`p-4 rounded-md ${optimizationResult.success ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"} text-sm`}
          >
            <div className="flex items-center gap-2 font-semibold mb-2">
              {optimizationResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {optimizationResult.message}
            </div>
            {optimizationResult.optimizationDetails && (
              <div className="mt-2 space-y-1">
                <p className="text-gray-300">
                  <span className="font-semibold">Rebalancing Frequency:</span>{" "}
                  {optimizationResult.optimizationDetails.rebalancingFrequency}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Target Allocation:</span>{" "}
                  {optimizationResult.optimizationDetails.targetAllocation}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Estimated Yield Improvement:</span>{" "}
                  {optimizationResult.optimizationDetails.estimatedYieldImprovement}
                </p>
                <p className="font-semibold mt-2">Recommended Actions:</p>
                <ul className="list-disc list-inside text-gray-300">
                  {optimizationResult.optimizationDetails.recommendedActions.map((action: string, index: number) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </div>
            )}
            {optimizationResult.automationStatus && (
              <p className="text-gray-400 mt-2">{optimizationResult.automationStatus}</p>
            )}
            {optimizationResult.error && <p className="text-red-400 mt-2">Error: {optimizationResult.error}</p>}
          </div>
        )}

        {automationResult && (
          <div
            className={`p-4 rounded-md ${automationResult.success ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"} text-sm`}
          >
            <div className="flex items-center gap-2 font-semibold mb-2">
              {automationResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {automationResult.message}
            </div>
            {automationResult.automationId && (
              <p className="text-gray-300">Automation ID: {automationResult.automationId}</p>
            )}
            {automationResult.error && <p className="text-red-400 mt-2">Error: {automationResult.error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
