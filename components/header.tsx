"use client"

import { useState } from "react"
import { ModernButton } from "@/components/modern-button"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { Brain, Wallet, HelpCircle } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  walletAddress?: string | null
  onConnect: (address: string) => void
}

export function Header({ walletAddress, onConnect }: HeaderProps) {
  const [showWalletModal, setShowWalletModal] = useState(false)

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-gradient">BetterYield</span>
              <span className="text-sm text-white/60 ml-2">AI-Powered Uniswap V3 Optimization</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/how-it-works">
                <ModernButton variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  How It Works
                </ModernButton>
              </Link>

              {walletAddress ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              ) : (
                <ModernButton onClick={() => setShowWalletModal(true)} size="sm">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </ModernButton>
              )}
            </div>
          </div>
        </div>
      </header>

      <WalletConnectionModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} onConnect={onConnect} />
    </>
  )
}
