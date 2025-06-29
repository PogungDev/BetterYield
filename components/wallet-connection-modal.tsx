"use client"

import { useState, useEffect } from "react"
import { useConnect, useAccount, useDisconnect } from "wagmi"
import { ModernCard } from "@/components/modern-card"
import { ModernButton } from "@/components/modern-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string) => void
}

export function WalletConnectionModal({ isOpen, onClose, onConnect }: WalletConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle")
  
  const { connect, connectors, error, isPending } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  // Handle successful connection
  useEffect(() => {
    if (isConnected && address) {
      setConnectionStatus("success")
      setTimeout(() => {
        onConnect(address)
        onClose()
        setConnectionStatus("idle")
      }, 1500)
    }
  }, [isConnected, address, onConnect, onClose])

  // Handle connection error
  useEffect(() => {
    if (error) {
      setConnectionStatus("error")
      setIsConnecting(false)
      setTimeout(() => {
        setConnectionStatus("idle")
      }, 3000)
    }
  }, [error])

  const handleConnect = async (connector: any) => {
    try {
      setIsConnecting(true)
      setConnectionStatus("connecting")
      await connect({ connector })
    } catch (err) {
      console.error("Connection failed:", err)
      setConnectionStatus("error")
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      onConnect("")
    } catch (err) {
      console.error("Disconnect failed:", err)
    }
  }

  const getConnectorIcon = (connectorName: string) => {
    switch (connectorName.toLowerCase()) {
      case 'metamask':
      case 'injected':
        return "🦊"
      case 'walletconnect':
        return "🔗"
      case 'coinbase wallet':
      case 'coinbasewallet':
        return "🔵"
      default:
        return "👛"
    }
  }

  const renderContent = () => {
    if (connectionStatus === "connecting" || isPending) {
      return (
        <div className="text-center py-8">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-400" />
          <h3 className="text-xl font-bold text-white mb-2">Connecting Wallet...</h3>
          <p className="text-white/60">Please approve the connection in your wallet</p>
        </div>
      )
    }

    if (connectionStatus === "success") {
      return (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <h3 className="text-xl font-bold text-white mb-2">Connected Successfully!</h3>
          <p className="text-white/60 font-mono">{address}</p>
        </div>
      )
    }

    if (connectionStatus === "error") {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <h3 className="text-xl font-bold text-white mb-2">Connection Failed</h3>
          <p className="text-white/60 mb-4">{error?.message || "Failed to connect wallet"}</p>
          <ModernButton onClick={() => setConnectionStatus("idle")} variant="secondary">
            Try Again
          </ModernButton>
        </div>
      )
    }

    // Show wallet options
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <Wallet className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-white/60">Choose your preferred wallet to connect to BetterYield</p>
        </div>

        {isConnected && address && (
          <ModernCard className="mb-4 bg-green-900/20 border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 font-semibold">Currently Connected</p>
                <p className="text-white/80 font-mono text-sm">{address}</p>
              </div>
                             <ModernButton onClick={handleDisconnect} variant="secondary" size="sm">
                 Disconnect
               </ModernButton>
            </div>
          </ModernCard>
        )}

        <div className="space-y-3">
          {connectors.map((connector) => (
            <ModernButton
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              disabled={isConnecting || isPending}
                             className="w-full justify-start text-left p-4 h-auto"
               variant="secondary"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getConnectorIcon(connector.name)}</span>
                <div>
                  <div className="font-semibold text-white">{connector.name}</div>
                  <div className="text-sm text-white/60">
                    {connector.name === 'MetaMask' && 'Connect using MetaMask browser extension'}
                    {connector.name === 'WalletConnect' && 'Connect using WalletConnect'}
                    {connector.name === 'Coinbase Wallet' && 'Connect using Coinbase Wallet'}
                    {!['MetaMask', 'WalletConnect', 'Coinbase Wallet'].includes(connector.name) && 'Connect using injected wallet'}
                  </div>
                </div>
              </div>
            </ModernButton>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <p className="text-blue-400 text-sm font-semibold mb-2">🔗 Network: Arbitrum Sepolia</p>
          <p className="text-blue-300/80 text-xs">
            Make sure your wallet is connected to Arbitrum Sepolia testnet. Need testnet ETH? 
            <a 
              href="https://faucet.quicknode.com/arbitrum/sepolia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline ml-1"
            >
              Get from faucet
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Wallet Connection</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
