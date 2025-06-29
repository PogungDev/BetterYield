"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TickVisualizerProps {
  poolName: string
  currentPrice: number
  tickLower: number
  tickUpper: number
  optimalTickLower?: number
  optimalTickUpper?: number
}

export function TickVisualizer({
  poolName,
  currentPrice,
  tickLower,
  tickUpper,
  optimalTickLower,
  optimalTickUpper,
}: TickVisualizerProps) {
  const [priceHistory, setPriceHistory] = useState<number[]>([])

  // Simulate real-time price movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory((prev) => {
        const newPrice = currentPrice + (Math.random() - 0.5) * 100
        const newHistory = [...prev, newPrice].slice(-20) // Keep last 20 points
        return newHistory
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentPrice])

  const minPrice = Math.min(tickLower, optimalTickLower || tickLower) - 200
  const maxPrice = Math.max(tickUpper, optimalTickUpper || tickUpper) + 200
  const priceRange = maxPrice - minPrice

  const getPosition = (price: number) => ((price - minPrice) / priceRange) * 100

  const currentPricePos = getPosition(currentPrice)
  const isInRange = currentPrice >= tickLower && currentPrice <= tickUpper
  const wouldBeInOptimalRange =
    optimalTickLower && optimalTickUpper ? currentPrice >= optimalTickLower && currentPrice <= optimalTickUpper : false

  return (
    <Card className="w-full bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{poolName} - Tick Range Visualization</span>
          <Badge variant={isInRange ? "default" : "destructive"} className={isInRange ? "bg-green-600" : "bg-red-600"}>
            {isInRange ? "In Range" : "Out of Range"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Chart */}
        <div className="h-32 bg-gray-900 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-end p-4">
            {priceHistory.map((price, index) => (
              <div
                key={index}
                className="w-1 bg-blue-400 mr-1 transition-all duration-300"
                style={{
                  height: `${Math.max(5, ((price - minPrice) / priceRange) * 100)}%`,
                  opacity: 0.3 + (index / priceHistory.length) * 0.7,
                }}
              />
            ))}
          </div>
          <div className="absolute top-2 left-4 text-xs text-gray-400">Live Price: ${currentPrice.toFixed(2)}</div>
        </div>

        {/* Tick Range Visualization */}
        <div className="relative h-16 bg-gray-900 rounded-lg overflow-hidden">
          {/* Current Range */}
          <div
            className="absolute top-0 h-full bg-red-500/30 border-l-2 border-r-2 border-red-500"
            style={{
              left: `${getPosition(tickLower)}%`,
              width: `${getPosition(tickUpper) - getPosition(tickLower)}%`,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 whitespace-nowrap">
              Current Range
            </div>
          </div>

          {/* Optimal Range (if provided) */}
          {optimalTickLower && optimalTickUpper && (
            <div
              className="absolute top-0 h-full bg-green-500/30 border-l-2 border-r-2 border-green-500"
              style={{
                left: `${getPosition(optimalTickLower)}%`,
                width: `${getPosition(optimalTickUpper) - getPosition(optimalTickLower)}%`,
              }}
            >
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 whitespace-nowrap">
                AI Optimal Range
              </div>
            </div>
          )}

          {/* Current Price Indicator */}
          <div className="absolute top-0 h-full w-0.5 bg-yellow-400 z-10" style={{ left: `${currentPricePos}%` }}>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 whitespace-nowrap">
              Current Price
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full -mt-1"></div>
          </div>
        </div>

        {/* Range Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-gray-400">Current Range:</p>
            <p className="font-mono">
              ${tickLower} - ${tickUpper}
            </p>
            <p className="text-xs text-gray-500">Width: ${tickUpper - tickLower}</p>
          </div>
          {optimalTickLower && optimalTickUpper && (
            <div className="space-y-1">
              <p className="text-gray-400">AI Optimal Range:</p>
              <p className="font-mono text-green-400">
                ${optimalTickLower} - ${optimalTickUpper}
              </p>
              <p className="text-xs text-gray-500">Width: ${optimalTickUpper - optimalTickLower}</p>
            </div>
          )}
        </div>

        {/* Efficiency Metrics */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Capital Efficiency</span>
            <span className="text-lg font-bold text-purple-400">{isInRange ? "85%" : "0%"}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isInRange ? "bg-gradient-to-r from-green-500 to-purple-500" : "bg-red-500"
              }`}
              style={{ width: isInRange ? "85%" : "0%" }}
            ></div>
          </div>
          {wouldBeInOptimalRange && (
            <p className="text-xs text-green-400 mt-1">✓ Would be 95% efficient with AI optimization</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
