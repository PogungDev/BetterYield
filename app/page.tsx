"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Import tab components
import { ConnectTab } from "@/components/tabs/connect-tab"
import { ScanTab } from "@/components/tabs/scan-tab"
import { AnalyzeTab } from "@/components/tabs/analyze-tab"
import { OptimizeTab } from "@/components/tabs/optimize-tab"
import { AutomateTab } from "@/components/tabs/automate-tab"
import { MonitorTab } from "@/components/tabs/monitor-tab"

const STEPS = ["CONNECT", "SCAN", "ANALYZE", "OPTIMIZE", "AUTOMATE", "MONITOR"]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("connect")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [positions, setPositions] = useState<any[]>([])
  const [strategies, setStrategies] = useState<any[]>([])
  const [isAutomated, setIsAutomated] = useState(false)
  const [activityFeed, setActivityFeed] = useState<string[]>([])

  const getCurrentStep = () => {
    const stepMap: { [key: string]: number } = {
      connect: 0,
      scan: 1,
      analyze: 2,
      optimize: 3,
      automate: 4,
      monitor: 5,
    }
    return stepMap[activeTab] || 0
  }

  const handleConnect = (address: string) => {
    setWalletAddress(address)
    setActiveTab("scan")
  }

  const handleScanComplete = (discoveredPositions: any[]) => {
    setPositions(discoveredPositions)
    setActiveTab("analyze")
  }

  const handleOptimizationComplete = (optimizationStrategies: any[]) => {
    setStrategies(optimizationStrategies)
    setActiveTab("automate")
  }

  const handleAutomationComplete = () => {
    setIsAutomated(true)
    setActiveTab("monitor")
  }

  const handleNewActivity = (activity: string) => {
    setActivityFeed((prev) => [activity, ...prev].slice(0, 10))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "connect":
        return <ConnectTab />
      case "scan":
        return walletAddress ? <ScanTab walletAddress={walletAddress} onScanComplete={handleScanComplete} /> : null
      case "analyze":
        return walletAddress ? (
          <AnalyzeTab walletAddress={walletAddress} onPositionsFound={handleScanComplete} setActiveTab={setActiveTab} />
        ) : null
      case "optimize":
        return walletAddress ? (
          <OptimizeTab
            walletAddress={walletAddress}
            positions={positions}
            onOptimizationComplete={handleOptimizationComplete}
            setActiveTab={setActiveTab}
          />
        ) : null
      case "automate":
        return walletAddress ? (
          <AutomateTab
            walletAddress={walletAddress}
            strategies={strategies}
            onAutomationComplete={handleAutomationComplete}
            onNewActivity={handleNewActivity}
            setActiveTab={setActiveTab}
          />
        ) : null
      case "monitor":
        return walletAddress ? <MonitorTab walletAddress={walletAddress} activityFeed={activityFeed} /> : null
      default:
        return <ConnectTab />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex flex-col">
      <Header walletAddress={walletAddress} onConnect={handleConnect} />

      {walletAddress && (
        <div className="p-6">
          <ProgressIndicator currentStep={getCurrentStep()} steps={STEPS} />
        </div>
      )}

      <div className="flex-1 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {walletAddress && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 glass border-white/20 mb-8 p-1">
                {STEPS.map((step) => (
                  <TabsTrigger
                    key={step.toLowerCase()}
                    value={step.toLowerCase()}
                    disabled={
                      (step === "SCAN" && !walletAddress) ||
                      (step === "ANALYZE" && positions.length === 0) ||
                      (step === "OPTIMIZE" && positions.length === 0) ||
                      (step === "AUTOMATE" && strategies.length === 0) ||
                      (step === "MONITOR" && !isAutomated)
                    }
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white disabled:opacity-30 rounded-lg font-medium transition-all duration-300 hover:bg-white/10"
                  >
                    {step}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {renderTabContent()}
        </div>
      </div>

      <Footer />
    </div>
  )
}
