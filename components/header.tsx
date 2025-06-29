"use client"

import { useState } from "react"
import { useAccount, useDisconnect } from "wagmi"
import { ModernButton } from "@/components/modern-button"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { Brain, Wallet, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  walletAddress?: string | null
  onConnect: (address: string) => void
}

export function Header({ onConnect }: HeaderProps) {
  const [showWalletModal, setShowWalletModal] = useState(false)
  
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleDisconnect = async () => {
    try {
      await disconnect()
      onConnect("")
    } catch (err) {
      console.error("Disconnect failed:", err)
    }
  }

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

              {isConnected && address ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-sm font-mono">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  </div>
                                     <ModernButton 
                     onClick={handleDisconnect} 
                     variant="secondary" 
                     size="sm"
                     className="text-white/70 hover:text-white"
                   >
                     <LogOut className="w-4 h-4" />
                   </ModernButton>
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

      <WalletConnectionModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
        onConnect={onConnect} 
      />
    </>
  )
}
