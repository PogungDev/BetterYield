"use client"

import { useState, useEffect } from "react"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { ModernButton } from "@/components/modern-button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Activity, DollarSign, Settings, RefreshCw, Zap, Play, Pause, RotateCcw } from "lucide-react"
import { getAggregatedStatsSimulation } from "@/lib/contract-interactions"
import { ModernTickVisualizer } from "@/components/modern-tick-visualizer"

interface MonitorTabProps {
  walletAddress: string
  activityFeed: string[]
}

export function MonitorTab({ walletAddress, activityFeed }: MonitorTabProps) {
  const [liveData, setLiveData] = useState({
    totalValue: 12500,
    totalFees: 285,
    avgApr: 20.8,
    activeStrategies: 1,
    rebalancesToday: 1,
    nextRebalance: "~4 hours",
    currentEthPrice: 2000,
    currentRange: { lower: 1950, upper: 2050 },
    targetApr: 20.8,
  })

  const [rebalanceStatus, setRebalanceStatus] = useState({
    isActive: false,
    stage: "monitoring", // monitoring, detecting, calculating, executing, completed
    progress: 0,
    priceThreshold: 5, // 5% from range boundary
    distanceToRange: 15, // 15% from boundary (safe)
    nextOptimalRange: { lower: 0, upper: 0 },
    estimatedGas: 0,
    chainlinkJobId: "",
  })

  const [smartContractLogs, setSmartContractLogs] = useState([
    {
      timestamp: "2024-01-15 14:30:25",
      function: "performUpkeep()",
      status: "success",
      message: "✅ Automated rebalance completed",
      txHash: "0xabc123...",
      gasUsed: "142,350",
      details: "Range updated: [1900-2100] → [1950-2050]",
    },
    {
      timestamp: "2024-01-15 14:29:45",
      function: "executeRebalance()",
      status: "pending",
      message: "🔄 Executing position rebalance",
      txHash: "0xdef456...",
      gasUsed: "0",
      details: "Waiting for transaction confirmation...",
    },
    {
      timestamp: "2024-01-15 14:29:30",
      function: "fulfillRequest()",
      status: "success",
      message: "🧮 Chainlink Functions response received",
      txHash: "0x789abc...",
      gasUsed: "89,240",
      details: "Optimal ticks calculated: [-276324, -276224]",
    },
  ])

  const [rebalanceLog, setRebalanceLog] = useState([
    {
      timestamp: "2024-01-15 14:30:25",
      stage: "completed",
      message: "✅ Rebalance completed successfully",
      details: "Range adjusted from [1900-2100] to [1950-2050] | Gas: $2.15 | New APR: 20.8%",
      txHash: "0xabc123...",
    },
    {
      timestamp: "2024-01-15 14:29:45",
      stage: "executing",
      message: "🔄 Executing rebalance transaction",
      details: "Chainlink Automation triggered rebalance | Estimated gas: $2.15",
      txHash: "0xabc123...",
    },
    {
      timestamp: "2024-01-15 14:29:30",
      stage: "calculating",
      message: "🧮 Chainlink Functions calculating optimal ticks",
      details: "Current price: $2045 | Target range: [1950-2050] | Maintaining APR: 20.8%",
      txHash: "",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [automationEnabled, setAutomationEnabled] = useState(true)
  const [manualRebalanceLoading, setManualRebalanceLoading] = useState(false)

  // Simulate live ETH price updates
  useEffect(() => {
    if (!automationEnabled) return

    const interval = setInterval(() => {
      setLiveData((prev) => {
        // Simulate ETH price movement
        const priceChange = (Math.random() - 0.5) * 20 // ±$20 movement
        const newPrice = Math.max(1800, Math.min(2200, prev.currentEthPrice + priceChange))

        // Calculate distance to range boundaries
        const lowerBoundary = prev.currentRange.lower
        const upperBoundary = prev.currentRange.upper
        const distanceToLower = ((newPrice - lowerBoundary) / lowerBoundary) * 100
        const distanceToUpper = ((upperBoundary - newPrice) / newPrice) * 100
        const minDistance = Math.min(distanceToLower, distanceToUpper)

        return {
          ...prev,
          currentEthPrice: newPrice,
          totalFees: prev.totalFees + Math.random() * 0.3,
          avgApr: prev.avgApr + (Math.random() - 0.5) * 0.05,
        }
      })

      // Update rebalance status based on price proximity
      setRebalanceStatus((prev) => {
        const currentPrice = liveData.currentEthPrice
        const { lower, upper } = liveData.currentRange

        // Calculate distance to boundaries as percentage
        const distanceToLower = ((currentPrice - lower) / lower) * 100
        const distanceToUpper = ((upper - currentPrice) / currentPrice) * 100
        const minDistance = Math.min(distanceToLower, distanceToUpper)

        // Auto-trigger rebalance when price gets within 5% of boundary (only if automation enabled)
        if (minDistance <= 5 && !prev.isActive && prev.stage === "monitoring" && automationEnabled) {
          // Start rebalance process
          simulateRebalanceProcess()
          return {
            ...prev,
            isActive: true,
            stage: "detecting",
            distanceToRange: minDistance,
            chainlinkJobId: `job_${Date.now()}`,
          }
        }

        return {
          ...prev,
          distanceToRange: minDistance,
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [liveData.currentEthPrice, liveData.currentRange, automationEnabled])

  // Manual rebalance trigger
  const handleManualRebalance = async () => {
    if (rebalanceStatus.isActive) return

    setManualRebalanceLoading(true)

    // Add smart contract log for manual trigger
    const manualTriggerLog = {
      timestamp: new Date().toLocaleString(),
      function: "requestOptimization()",
      status: "pending",
      message: "🔗 Manual rebalance requested",
      txHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      gasUsed: "0",
      details: `User triggered rebalance | Current price: $${liveData.currentEthPrice.toFixed(2)}`,
    }

    setSmartContractLogs((prev) => [manualTriggerLog, ...prev].slice(0, 10))

    // Start rebalance process
    setRebalanceStatus((prev) => ({
      ...prev,
      isActive: true,
      stage: "detecting",
      chainlinkJobId: `manual_${Date.now()}`,
    }))

    await simulateRebalanceProcess()
    setManualRebalanceLoading(false)
  }

  // Simulate the complete rebalance process with smart contract interactions
  const simulateRebalanceProcess = async () => {
    const stages = [
      { stage: "detecting", duration: 2000, progress: 20, contractFunction: "checkUpkeep()" },
      { stage: "calculating", duration: 3000, progress: 50, contractFunction: "requestOptimization()" },
      { stage: "executing", duration: 4000, progress: 80, contractFunction: "executeRebalance()" },
      { stage: "completed", duration: 1000, progress: 100, contractFunction: "performUpkeep()" },
    ]

    for (const { stage, duration, progress, contractFunction } of stages) {
      await new Promise((resolve) => setTimeout(resolve, duration))

      setRebalanceStatus((prev) => ({
        ...prev,
        stage,
        progress,
      }))

      // Add smart contract log for each stage
      const contractLog = {
        timestamp: new Date().toLocaleString(),
        function: contractFunction,
        status: stage === "completed" ? "success" : "pending",
        message: getContractMessage(stage),
        txHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
        gasUsed: stage === "completed" ? Math.floor(120000 + Math.random() * 50000).toLocaleString() : "0",
        details: getContractDetails(stage, liveData.currentEthPrice),
      }

      setSmartContractLogs((prev) => [contractLog, ...prev].slice(0, 10))

      // Add regular log entry
      const logEntry = {
        timestamp: new Date().toLocaleString(),
        stage,
        message: getStageMessage(stage),
        details: getStageDetails(stage, liveData.currentEthPrice),
        txHash: stage === "executing" || stage === "completed" ? `0x${Math.random().toString(16).substr(2, 8)}...` : "",
      }

      setRebalanceLog((prev) => [logEntry, ...prev].slice(0, 10))

      // Calculate new optimal range during calculation stage
      if (stage === "calculating") {
        const newRange = calculateOptimalRange(liveData.currentEthPrice, liveData.targetApr)
        setRebalanceStatus((prev) => ({
          ...prev,
          nextOptimalRange: newRange,
          estimatedGas: 2.15 + Math.random() * 0.5, // $2.15-2.65
        }))
      }

      // Update actual range when completed
      if (stage === "completed") {
        setLiveData((prev) => ({
          ...prev,
          currentRange: rebalanceStatus.nextOptimalRange,
          rebalancesToday: prev.rebalancesToday + 1,
        }))

        // Reset rebalance status after completion
        setTimeout(() => {
          setRebalanceStatus((prev) => ({
            ...prev,
            isActive: false,
            stage: "monitoring",
            progress: 0,
          }))
        }, 3000)
      }
    }
  }

  const getContractMessage = (stage: string) => {
    switch (stage) {
      case "detecting":
        return "🔍 checkUpkeep() - Price boundary detected"
      case "calculating":
        return "🧮 Chainlink Functions request sent"
      case "executing":
        return "🔄 executeRebalance() transaction submitted"
      case "completed":
        return "✅ performUpkeep() completed successfully"
      default:
        return "📊 Contract monitoring active"
    }
  }

  const getContractDetails = (stage: string, price: number) => {
    switch (stage) {
      case "detecting":
        return `Price: $${price.toFixed(2)} | Boundary check: TRIGGERED`
      case "calculating":
        return `Chainlink Functions calculating optimal range for $${price.toFixed(2)}`
      case "executing":
        return `Rebalancing position | New range: [${rebalanceStatus.nextOptimalRange.lower}-${rebalanceStatus.nextOptimalRange.upper}]`
      case "completed":
        return `Position updated | Gas used: ${Math.floor(120000 + Math.random() * 50000).toLocaleString()}`
      default:
        return `Monitoring price movements`
    }
  }

  const getStageMessage = (stage: string) => {
    switch (stage) {
      case "detecting":
        return "🔍 Chainlink Data Feed detected price near boundary"
      case "calculating":
        return "🧮 Chainlink Functions calculating optimal tick range"
      case "executing":
        return "🔄 Chainlink Automation executing rebalance"
      case "completed":
        return "✅ Rebalance completed successfully"
      default:
        return "📊 Monitoring ETH/USDC position"
    }
  }

  const getStageDetails = (stage: string, price: number) => {
    switch (stage) {
      case "detecting":
        return `ETH price: $${price.toFixed(2)} | Distance to boundary: ${rebalanceStatus.distanceToRange.toFixed(1)}%`
      case "calculating":
        return `Calculating optimal ticks for price $${price.toFixed(2)} | Target APR: ${liveData.targetApr}%`
      case "executing":
        return `Rebalancing to range [${rebalanceStatus.nextOptimalRange.lower}-${rebalanceStatus.nextOptimalRange.upper}] | Gas: $${rebalanceStatus.estimatedGas.toFixed(2)}`
      case "completed":
        return `New range: [${rebalanceStatus.nextOptimalRange.lower}-${rebalanceStatus.nextOptimalRange.upper}] | APR maintained: ${liveData.targetApr}%`
      default:
        return `Monitoring price movements | Current range: [${liveData.currentRange.lower}-${liveData.currentRange.upper}]`
    }
  }

  // Chainlink Functions: Calculate optimal tick range based on current price and target APR
  const calculateOptimalRange = (currentPrice: number, targetApr: number) => {
    // Simplified tick calculation (in production, this would be more complex)
    const rangeWidth = 100 // Maintain $100 range width for consistent APR
    const buffer = 25 // $25 buffer from current price

    return {
      lower: Math.round(currentPrice - buffer - rangeWidth / 2),
      upper: Math.round(currentPrice + buffer + rangeWidth / 2),
    }
  }

  const handleRefreshStats = async () => {
    setIsRefreshing(true)
    try {
      const stats = await getAggregatedStatsSimulation(walletAddress)
      setLiveData((prev) => ({
        ...prev,
        totalValue: stats.totalValue,
        totalFees: stats.totalFees,
        avgApr: stats.avgApr,
        activeStrategies: stats.activeStrategies,
      }))
    } catch (error) {
      console.error("Failed to refresh stats:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case "detecting":
        return "text-yellow-400"
      case "calculating":
        return "text-blue-400"
      case "executing":
        return "text-purple-400"
      case "completed":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gradient">ETH/USDC Live Dashboard</h2>
        <p className="text-white/60 text-lg">Monitor your automated ETH/USDC position optimization in real-time</p>

        {/* MANUAL CONTROLS */}
        <div className="flex justify-center gap-4 mt-6">
          <ModernButton
            onClick={handleManualRebalance}
            disabled={rebalanceStatus.isActive || manualRebalanceLoading}
            loading={manualRebalanceLoading}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Trigger Manual Rebalance
          </ModernButton>

          <ModernButton
            onClick={() => setAutomationEnabled(!automationEnabled)}
            variant={automationEnabled ? "secondary" : "outline"}
            className={automationEnabled ? "bg-green-600/20 border-green-500/50" : "bg-red-600/20 border-red-500/50"}
          >
            {automationEnabled ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Automation
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume Automation
              </>
            )}
          </ModernButton>
        </div>

        {/* CHAINLINK REBALANCE STATUS - PROMINENT */}
        <div className="mt-6 p-6 glass rounded-xl border-2 border-emerald-500/50 max-w-4xl mx-auto bg-gradient-to-r from-emerald-900/30 to-blue-900/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-emerald-400">🔗 CHAINLINK REBALANCE MONITOR</h3>
            <div className="flex items-center gap-2">
              {rebalanceStatus.isActive ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400 font-medium">REBALANCING ACTIVE</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${automationEnabled ? "bg-green-400" : "bg-gray-400"}`}></div>
                  <span className={`font-medium ${automationEnabled ? "text-green-400" : "text-gray-400"}`}>
                    {automationEnabled ? "MONITORING" : "PAUSED"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-300 mb-3">📊 Current Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">ETH Price:</span>
                  <span className="text-white font-mono">${liveData.currentEthPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Current Range:</span>
                  <span className="text-white font-mono">
                    [{liveData.currentRange.lower}-{liveData.currentRange.upper}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Distance to Boundary:</span>
                  <span
                    className={`font-mono ${rebalanceStatus.distanceToRange <= 5 ? "text-red-400" : rebalanceStatus.distanceToRange <= 10 ? "text-yellow-400" : "text-green-400"}`}
                  >
                    {rebalanceStatus.distanceToRange.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Rebalance Trigger:</span>
                  <span className="text-white font-mono">≤ {rebalanceStatus.priceThreshold}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-300 mb-3">🔄 Rebalance Process</h4>
              {rebalanceStatus.isActive && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(rebalanceStatus.stage).replace("text-", "bg-")}`}
                    ></div>
                    <span className={`text-sm ${getStatusColor(rebalanceStatus.stage)}`}>
                      {getStageMessage(rebalanceStatus.stage)}
                    </span>
                  </div>
                  <Progress value={rebalanceStatus.progress} className="h-2" />
                  <p className="text-xs text-white/60">
                    {getStageDetails(rebalanceStatus.stage, liveData.currentEthPrice)}
                  </p>
                  {rebalanceStatus.chainlinkJobId && (
                    <p className="text-xs text-blue-300">Job ID: {rebalanceStatus.chainlinkJobId}</p>
                  )}
                </div>
              )}
              {!rebalanceStatus.isActive && (
                <div className="text-sm text-white/70">
                  <p>✅ System monitoring price movements</p>
                  <p>🔍 Chainlink Data Feed: {automationEnabled ? "Active" : "Paused"}</p>
                  <p>🤖 Automation: {automationEnabled ? "Ready" : "Disabled"}</p>
                  <p>⚡ Next check: {automationEnabled ? "~30 seconds" : "Paused"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 glass rounded-xl border border-green-500/30">
          <div className="flex items-center gap-2 text-green-300 text-sm">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">Smart Contract Flow:</span>
          </div>
          <p className="text-green-200/80 text-xs mt-2">
            ChainlinkDataFeed → PriceMonitor → ChainlinkFunctions(calculateTicks) → ChainlinkAutomation → Rebalance
          </p>
        </div>
      </div>

      {/* SMART CONTRACT INTERACTION LOGS */}
      <ModernCard>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Smart Contract Interactions
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {smartContractLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 p-3 glass rounded-lg border border-white/5">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${getContractStatusColor(log.status).replace("text-", "bg-")}`}
              ></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-mono text-sm">{log.function}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        log.status === "success"
                          ? "bg-green-600/20 text-green-400"
                          : log.status === "pending"
                            ? "bg-yellow-600/20 text-yellow-400"
                            : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-white/40">{log.timestamp}</span>
                </div>
                <p className="text-sm text-white/80 mb-1">{log.message}</p>
                <p className="text-xs text-white/60 mb-1">{log.details}</p>
                <div className="flex items-center gap-4 text-xs">
                  {log.txHash && <span className="text-blue-400 font-mono">Tx: {log.txHash}</span>}
                  {log.gasUsed !== "0" && <span className="text-orange-400">Gas: {log.gasUsed}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModernCard>

      {/* Before vs After Performance Comparison */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white text-center mb-6">Performance: Before vs After Optimization</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-red-400 mb-4 text-center">❌ Before: Manual Management</h4>
            <ModernTickVisualizer
              poolName="ETH/USDC - Before Optimization"
              currentPrice={liveData.currentEthPrice}
              tickLower={1800}
              tickUpper={2200}
            />
            <div className="mt-4 glass rounded-xl p-4 border border-red-500/30">
              <h5 className="font-semibold text-red-400 mb-2">Previous Performance:</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">APR</p>
                  <p className="text-lg font-bold text-red-400">8.5%</p>
                </div>
                <div>
                  <p className="text-white/60">Efficiency</p>
                  <p className="text-lg font-bold text-red-400">45%</p>
                </div>
                <div>
                  <p className="text-white/60">Monthly Fees</p>
                  <p className="text-lg font-bold text-red-400">$85</p>
                </div>
                <div>
                  <p className="text-white/60">Out of Range</p>
                  <p className="text-lg font-bold text-red-400">15%</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-emerald-400 mb-4 text-center">
              ✅ After: AI + Chainlink Automation
            </h4>
            <ModernTickVisualizer
              poolName="ETH/USDC - After Optimization (Live)"
              currentPrice={liveData.currentEthPrice}
              tickLower={liveData.currentRange.lower}
              tickUpper={liveData.currentRange.upper}
            />
            <div className="mt-4 glass rounded-xl p-4 border border-emerald-500/30">
              <h5 className="font-semibold text-emerald-400 mb-2">Current Performance:</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">APR</p>
                  <p className="text-lg font-bold text-emerald-400">{liveData.avgApr.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-white/60">Efficiency</p>
                  <p className="text-lg font-bold text-emerald-400">87%</p>
                </div>
                <div>
                  <p className="text-white/60">Monthly Fees</p>
                  <p className="text-lg font-bold text-emerald-400">$217</p>
                </div>
                <div>
                  <p className="text-white/60">Out of Range</p>
                  <p className="text-lg font-bold text-emerald-400">5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <ModernButton
          onClick={handleRefreshStats}
          disabled={isRefreshing}
          loading={isRefreshing}
          size="sm"
          variant="secondary"
          className="group"
        >
          <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />🔗 Refresh
          ETH/USDC Data (Chainlink)
        </ModernButton>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ModernCard className="bg-gradient-to-br from-emerald-900/50 to-emerald-900/50 border-emerald-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">ETH/USDC Value</p>
              <p className="text-2xl font-bold text-emerald-400">${liveData.totalValue.toLocaleString()}</p>
              <p className="text-xs text-emerald-300">+18.5% since optimization</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-400" />
          </div>
        </ModernCard>

        <ModernCard className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Fees Earned</p>
              <p className="text-2xl font-bold text-blue-400">${liveData.totalFees.toFixed(2)}</p>
              <p className="text-xs text-blue-300">Auto-compounded</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-400" />
          </div>
        </ModernCard>

        <ModernCard className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Current APR</p>
              <p className="text-2xl font-bold text-purple-400">{liveData.avgApr.toFixed(1)}%</p>
              <p className="text-xs text-purple-300">Maintained stable</p>
            </div>
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
        </ModernCard>

        <ModernCard className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">ETH Price</p>
              <p className="text-2xl font-bold text-orange-400">${liveData.currentEthPrice.toFixed(0)}</p>
              <p className="text-xs text-orange-300">Live Chainlink feed</p>
            </div>
            <Settings className="w-8 h-8 text-orange-400" />
          </div>
        </ModernCard>
      </div>

      {/* Rebalance Activity Log */}
      <ModernCard>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Chainlink Rebalance Activity Log
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rebalanceLog.map((log, index) => (
            <div key={index} className="flex items-start gap-3 p-3 glass rounded-lg border border-white/5">
              <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(log.stage).replace("text-", "bg-")}`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${getStatusColor(log.stage)}`}>{log.message}</span>
                  <span className="text-xs text-white/40">{log.timestamp}</span>
                </div>
                <p className="text-xs text-white/60 mb-1">{log.details}</p>
                {log.txHash && <p className="text-xs text-blue-400 font-mono">Tx: {log.txHash}</p>}
              </div>
            </div>
          ))}
        </div>
      </ModernCard>

      {/* Live Position Monitoring */}
      <ModernCard>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-bold text-white">ETH/USDC (0.05% fee tier)</h4>
            <p className="text-white/60 text-sm">
              ${liveData.totalValue.toLocaleString()} • Strategy: AI Dynamic Range
            </p>
            <p className="text-white/60 text-sm">Current ETH Price: ${liveData.currentEthPrice.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">In Range</Badge>
            <Badge
              className={`${automationEnabled ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-gray-600/20 text-gray-400 border-gray-500/30"}`}
            >
              {automationEnabled ? "Auto-Active" : "Manual Mode"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="glass rounded-xl p-3">
            <p className="text-sm text-white/60">Live APR</p>
            <p className="text-xl font-bold text-emerald-400">{liveData.avgApr.toFixed(1)}%</p>
            <p className="text-xs text-emerald-300">Stable & optimized</p>
          </div>
          <div className="glass rounded-xl p-3">
            <p className="text-sm text-white/60">Capital Efficiency</p>
            <p className="text-xl font-bold text-blue-400">87%</p>
            <p className="text-xs text-blue-300">Optimal range</p>
          </div>
          <div className="glass rounded-xl p-3">
            <p className="text-sm text-white/60">24h Fees</p>
            <p className="text-xl font-bold text-purple-400">$28.50</p>
            <p className="text-xs text-purple-300">Auto-compounded</p>
          </div>
          <div className="glass rounded-xl p-3">
            <p className="text-sm text-white/60">Rebalances</p>
            <p className="text-xl font-bold text-yellow-400">{liveData.rebalancesToday}</p>
            <p className="text-xs text-yellow-300">Today</p>
          </div>
        </div>

        {/* Range Status */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">
              ETH Price vs Range [{liveData.currentRange.lower}-{liveData.currentRange.upper}]
            </span>
            <span className="text-white">87% utilized</span>
          </div>
          <Progress
            value={87}
            className="h-2 bg-white/10 [&>*]:bg-gradient-to-r [&>*]:from-purple-500 [&>*]:to-pink-500"
          />
        </div>

        <div className="text-sm text-white/60">
          <p>
            Next rebalance: When ETH hits ${liveData.currentRange.lower} or ${liveData.currentRange.upper} (±5%)
          </p>
          <p>Automation status: {automationEnabled ? "Active" : "Paused"} • Gas budget: $25/month</p>
          <p>Target APR: {liveData.targetApr}% (maintained through rebalancing)</p>
        </div>
      </ModernCard>

      {/* Live Tick Visualizer */}
      <ModernTickVisualizer
        poolName="ETH/USDC - Live Monitoring (Auto-Rebalanced Range)"
        currentPrice={liveData.currentEthPrice}
        tickLower={liveData.currentRange.lower}
        tickUpper={liveData.currentRange.upper}
      />
    </div>
  )
}
