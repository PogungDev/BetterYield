"use client"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModernButton } from "@/components/modern-button"
import { Badge } from "@/components/ui/badge"
import { Wallet, CheckCircle, AlertCircle } from "lucide-react"
import { connectWalletSimulation } from "@/lib/contract-interactions"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string) => void
}

export function WalletConnectionModal({ isOpen, onClose, onConnect }: WalletConnectionModalProps) {
  const [isConnecting, startConnectingTransition] = useTransition()
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle")

  const handleConnect = async (walletType: string) => {
    setConnectionStatus("connecting")

    startConnectingTransition(async () => {
      try {
        const address = await connectWalletSimulation()
        setConnectionStatus("success")

        setTimeout(() => {
          onConnect(address)
          onClose()
          setConnectionStatus("idle")
        }, 1500)
      } catch (error) {
        setConnectionStatus("error")
        setTimeout(() => setConnectionStatus("idle"), 3000)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Choose your preferred wallet to connect to BetterYield AI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {connectionStatus === "idle" && (
            <>
              <ModernButton
                onClick={() => handleConnect("metamask")}
                disabled={isConnecting}
                className="w-full justify-start"
                size="lg"
              >
                <div className="w-6 h-6 bg-orange-500 rounded mr-3" />
                MetaMask
                <Badge className="ml-auto bg-emerald-600/20 text-emerald-400 border-emerald-500/30">Recommended</Badge>
              </ModernButton>

              <ModernButton
                onClick={() => handleConnect("coinbase")}
                disabled={isConnecting}
                variant="secondary"
                className="w-full justify-start"
                size="lg"
              >
                <div className="w-6 h-6 bg-blue-500 rounded mr-3" />
                Coinbase Wallet
              </ModernButton>

              <ModernButton
                onClick={() => handleConnect("walletconnect")}
                disabled={isConnecting}
                variant="secondary"
                className="w-full justify-start"
                size="lg"
              >
                <div className="w-6 h-6 bg-purple-500 rounded mr-3" />
                WalletConnect
              </ModernButton>
            </>
          )}

          {connectionStatus === "connecting" && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-white font-medium">Connecting to wallet...</p>
              <p className="text-slate-400 text-sm mt-2">Please approve the connection in your wallet</p>
            </div>
          )}

          {connectionStatus === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-white font-medium">Successfully Connected!</p>
              <p className="text-slate-400 text-sm mt-2">Redirecting to position scanner...</p>
            </div>
          )}

          {connectionStatus === "error" && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-white font-medium">Connection Failed</p>
              <p className="text-slate-400 text-sm mt-2">Please try again or choose a different wallet</p>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 text-center mt-4">
          <p>🔒 Your wallet stays secure. We never store your private keys.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
