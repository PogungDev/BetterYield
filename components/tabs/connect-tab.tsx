"use client"

import { ModernCard } from "@/components/modern-card"
import { Zap, TrendingUp, Shield, Sparkles } from "lucide-react"

type ConnectTabProps = {}

export function ConnectTab({}: ConnectTabProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-black text-gradient">BetterYield</h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <p className="text-2xl md:text-3xl text-white/80 font-light mb-4">AI-Powered Uniswap V3 Optimization</p>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Maximize your liquidity pool yields with intelligent automation powered by Chainlink infrastructure
          </p>
        </div>

        {/* CHAINLINK NOTICE - PROMINENT */}
        <ModernCard className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">🔗 POWERED BY CHAINLINK INFRASTRUCTURE</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-900/20 rounded-xl p-4">
                <h4 className="font-bold text-blue-300">Data Feeds</h4>
                <p className="text-sm text-blue-200/80">Real-time ETH/USDC price monitoring</p>
              </div>
              <div className="bg-purple-900/20 rounded-xl p-4">
                <h4 className="font-bold text-purple-300">Functions</h4>
                <p className="text-sm text-purple-200/80">Secure off-chain AI computation</p>
              </div>
              <div className="bg-emerald-900/20 rounded-xl p-4">
                <h4 className="font-bold text-emerald-300">Automation</h4>
                <p className="text-sm text-emerald-200/80">24/7 decentralized execution</p>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Sub-Features Explanation */}
        <ModernCard className="max-w-4xl mx-auto mb-8">
          <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Tab Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-400">🔐 Secure Wallet Integration</h4>
              <ul className="text-white/70 space-y-1 list-disc list-inside ml-2">
                <li>MetaMask, Coinbase Wallet, WalletConnect support</li>
                <li>Non-custodial connection (you keep control)</li>
                <li>Smart contract registration via WalletManager</li>
                <li>Automatic user profile creation in VaultStorage</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-400">📊 Initial Setup</h4>
              <ul className="text-white/70 space-y-1 list-disc list-inside ml-2">
                <li>Blockchain network detection and switching</li>
                <li>Gas fee estimation for optimization operations</li>
                <li>Permission setup for automated transactions</li>
                <li>Integration with Chainlink infrastructure</li>
              </ul>
            </div>
          </div>
        </ModernCard>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ModernCard className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Rebalancing</h3>
            <p className="text-white/60 leading-relaxed">
              AI automatically adjusts your Uniswap V3 tick ranges for maximum capital efficiency and fee collection
            </p>
          </ModernCard>

          <ModernCard className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Higher Yields</h3>
            <p className="text-white/60 leading-relaxed">
              Narrow ranges mean higher fees. Our AI keeps you in the optimal range 24/7 with automated compounding
            </p>
          </ModernCard>

          <ModernCard className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Chainlink Powered</h3>
            <p className="text-white/60 leading-relaxed">
              Decentralized automation with Chainlink Data Feeds, Functions, and Automation for maximum security
            </p>
          </ModernCard>
        </div>

        {/* CTA Section */}
        <ModernCard className="max-w-2xl mx-auto text-center gradient-border" glow>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Optimize?</h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Connect your wallet to discover and optimize your Uniswap V3 positions. See potential yield improvements
              in seconds.
            </p>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/50">
              <span>✓ Free Analysis</span>
              <span>✓ No Commitment</span>
              <span>✓ Results in 30s</span>
            </div>
          </div>
        </ModernCard>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">$2.5M+</div>
            <div className="text-white/60 text-sm">Total Value Optimized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">15.2%</div>
            <div className="text-white/60 text-sm">Avg APR Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-white/60 text-sm">Automated Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">500+</div>
            <div className="text-white/60 text-sm">Active Positions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
