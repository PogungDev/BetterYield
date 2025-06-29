"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useMemo } from "react"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

interface ModernTickVisualizerProps {
  poolName: string
  currentPrice: number
  tickLower: number
  tickUpper: number
  optimalTickLower?: number
  optimalTickUpper?: number
}

export function ModernTickVisualizer({
  poolName,
  currentPrice,
  tickLower,
  tickUpper,
  optimalTickLower,
  optimalTickUpper,
}: ModernTickVisualizerProps) {
  const [priceHistory, setPriceHistory] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Simulate real-time price movement
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setPriceHistory((prev) => {
        // Fluktuasi ETH yang lebih realistis: ±2% dari current price
        const fluctuation = currentPrice * 0.02 * (Math.random() - 0.5)
        const newPrice = currentPrice + fluctuation
        const newHistory = [...prev, newPrice].slice(-30)
        return newHistory
      })
      setTimeout(() => setIsAnimating(false), 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentPrice])

  const minDisplayPrice = Math.min(tickLower, optimalTickLower || tickLower) * 0.9 // Extend range for better visualization
  const maxDisplayPrice = Math.max(tickUpper, optimalTickUpper || tickUpper) * 1.1 // Extend range for better visualization
  const priceRange = maxDisplayPrice - minDisplayPrice

  const getPosition = (price: number) => ((price - minDisplayPrice) / priceRange) * 100
  const isInRange = currentPrice >= tickLower && currentPrice <= tickUpper
  const efficiency = isInRange
    ? Math.min(95, 75 + (tickUpper - tickLower > 200 ? 0 : 20))
    : // Narrower range = higher efficiency
      0

  // Simulate liquidity distribution across ticks
  const liquidityData = useMemo(() => {
    const data = []
    const numTicks = 100 // Number of simulated ticks
    const startTick = Math.floor(minDisplayPrice / 10) * 10
    const endTick = Math.ceil(maxDisplayPrice / 10) * 10
    const tickStep = (endTick - startTick) / numTicks

    for (let i = 0; i < numTicks; i++) {
      const tickPrice = startTick + i * tickStep
      // Simple bell curve distribution around current price
      const distanceToCurrent = Math.abs(tickPrice - currentPrice)
      const liquidity = Math.max(0, 100 - distanceToCurrent / 10) + Math.random() * 10 // Base liquidity + noise
      data.push({ price: tickPrice, liquidity: liquidity })
    }
    return data
  }, [minDisplayPrice, maxDisplayPrice, currentPrice])

  const maxLiquidity = Math.max(...liquidityData.map((d) => d.liquidity))

  return (
    <ModernCard className="overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{poolName}</h3>
          <p className="text-white/60 text-sm">Live Price & Liquidity Visualization</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={isInRange ? "default" : "destructive"}
            className={cn(
              "px-3 py-1 rounded-full font-medium",
              isInRange
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30",
            )}
          >
            {isInRange ? "In Range" : "Out of Range"}
          </Badge>
          <div className="flex items-center gap-1 text-white/60">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-mono">${currentPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Modern Price Chart */}
      <div className="relative h-32 mb-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

        <div className="absolute inset-0 flex items-end justify-end p-4 gap-1">
          {priceHistory.map((price, index) => {
            const height = Math.max(10, ((price - minDisplayPrice) / priceRange) * 80)
            const isLatest = index === priceHistory.length - 1
            return (
              <div
                key={index}
                className={cn(
                  "w-2 rounded-t-sm transition-all duration-500 transform",
                  isLatest && isAnimating && "scale-110",
                  price > currentPrice
                    ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                    : "bg-gradient-to-t from-red-500 to-red-300",
                )}
                style={{
                  height: `${height}%`,
                  opacity: 0.4 + (index / priceHistory.length) * 0.6,
                }}
              />
            )
          })}
        </div>

        <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1">
          <span className="text-xs text-white/80 font-mono">Live: ${currentPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Detailed Liquidity & Range Visualization */}
      <div className="relative h-48 mb-6 rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-white/10 overflow-hidden p-2">
        {/* Liquidity Bars */}
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {liquidityData.map((data, index) => (
            <div
              key={index}
              className="w-1 bg-blue-500/30 rounded-t-sm"
              style={{ height: `${(data.liquidity / maxLiquidity) * 90}%` }}
            />
          ))}
        </div>

        {/* Current Range */}
        <div
          className="absolute top-0 h-full bg-red-500/30 border-l-2 border-r-2 border-red-400 transition-all duration-500"
          style={{
            left: `${getPosition(tickLower)}%`,
            width: `${getPosition(tickUpper) - getPosition(tickLower)}%`,
          }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="glass rounded-lg px-2 py-1">
              <span className="text-xs text-red-300 font-medium">Current Range</span>
            </div>
          </div>
          <div className="absolute top-full left-0 right-0 flex justify-between text-xs text-red-300 mt-1">
            <span>${tickLower.toFixed(0)}</span>
            <span>${tickUpper.toFixed(0)}</span>
          </div>
        </div>

        {/* Optimal Range (if provided) */}
        {optimalTickLower && optimalTickUpper && (
          <div
            className="absolute top-0 h-full bg-emerald-500/30 border-l-2 border-r-2 border-emerald-400 transition-all duration-500"
            style={{
              left: `${getPosition(optimalTickLower)}%`,
              width: `${getPosition(optimalTickUpper) - getPosition(optimalTickLower)}%`,
            }}
          >
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="glass rounded-lg px-2 py-1">
                <span className="text-xs text-emerald-300 font-medium">AI Optimal</span>
              </div>
            </div>
            <div className="absolute -bottom-14 left-0 right-0 flex justify-between text-xs text-emerald-300 mt-1">
              <span>${optimalTickLower.toFixed(0)}</span>
              <span>${optimalTickUpper.toFixed(0)}</span>
            </div>
          </div>
        )}

        {/* Current Price Line */}
        <div
          className="absolute top-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-300 shadow-lg shadow-yellow-400/50 transition-all duration-300"
          style={{ left: `${getPosition(currentPrice)}%` }}
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="glass rounded-lg px-2 py-1 animate-pulse">
              <span className="text-xs text-yellow-300 font-mono">${currentPrice.toFixed(0)}</span>
            </div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 -mt-1.5 animate-pulse" />
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Capital Efficiency</span>
            {efficiency > 50 ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{efficiency.toFixed(0)}%</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  efficiency > 50
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                    : "bg-gradient-to-r from-red-500 to-red-400",
                )}
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Range Width</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Current:</span>
              <span className="font-mono text-white">${(tickUpper - tickLower).toFixed(0)}</span>
            </div>
            {optimalTickLower && optimalTickUpper && (
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Optimal:</span>
                <span className="font-mono text-emerald-400">${(optimalTickUpper - optimalTickLower).toFixed(0)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModernCard>
  )
}
