"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
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
  const [positions, setPositions] = useState<any[]>([])
  const [strategies, setStrategies] = useState<any[]>([])
  const [isAutomated, setIsAutomated] = useState(false)
  const [activityFeed, setActivityFeed] = useState<string[]>([])

  // Use wagmi's useAccount hook for real wallet connection
  const { address: walletAddress, isConnected } = useAccount()

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
    // When wallet connects, automatically move to scan tab
    if (address && isConnected) {
      setActiveTab("scan")
    } else if (!address) {
      // When wallet disconnects, go back to connect tab
      setActiveTab("connect")
      setPositions([])
      setStrategies([])
      setIsAutomated(false)
      setActivityFeed([])
    }
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
    // If wallet not connected, always show connect tab
    if (!isConnected || !walletAddress) {
      return <ConnectTab />
    }

    switch (activeTab) {
      case "connect":
        return <ConnectTab />
      case "scan":
        return <ScanTab walletAddress={walletAddress} onScanComplete={handleScanComplete} />
      case "analyze":
        return (
          <AnalyzeTab 
            walletAddress={walletAddress} 
            onPositionsFound={handleScanComplete} 
            setActiveTab={setActiveTab} 
          />
        )
      case "optimize":
        return (
          <OptimizeTab
            walletAddress={walletAddress}
            positions={positions}
            onOptimizationComplete={handleOptimizationComplete}
            setActiveTab={setActiveTab}
          />
        )
      case "automate":
        return (
          <AutomateTab
            walletAddress={walletAddress}
            strategies={strategies}
            onAutomationComplete={handleAutomationComplete}
            onNewActivity={handleNewActivity}
            setActiveTab={setActiveTab}
          />
        )
      case "monitor":
        return <MonitorTab walletAddress={walletAddress} activityFeed={activityFeed} />
      default:
        return <ConnectTab />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex flex-col">
      <Header onConnect={handleConnect} />

      {isConnected && walletAddress && (
        <div className="p-6">
          <ProgressIndicator currentStep={getCurrentStep()} steps={STEPS} />
        </div>
      )}

      <div className="flex-1 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {isConnected && walletAddress && (
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
