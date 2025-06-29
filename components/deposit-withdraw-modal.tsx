"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModernButton } from "@/components/modern-button"
import { ModernCard } from "@/components/modern-card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Zap, AlertTriangle } from "lucide-react"

interface DepositWithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "deposit" | "withdraw"
  position?: any
}

export function DepositWithdrawModal({ isOpen, onClose, mode, position }: DepositWithdrawModalProps) {
  const [activeTab, setActiveTab] = useState("deposit")
  const [amount0, setAmount0] = useState("")
  const [amount1, setAmount1] = useState("")
  const [tickLower, setTickLower] = useState("1800")
  const [tickUpper, setTickUpper] = useState("2200")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDeposit = async () => {
    setIsProcessing(true)
    console.log("🏦 DEPOSIT: Creating new liquidity position...")
    console.log(`📞 Contract: BetterYieldMain.deposit()`)
    console.log(`💰 Amount0: ${amount0} ETH, Amount1: ${amount1} USDC`)
    console.log(`📊 Tick Range: [${tickLower}, ${tickUpper}]`)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    console.log(`✅ Liquidity position created successfully`)
    console.log(`💾 VaultStorage: New position added`)
    console.log(`📝 Transaction: 0x${Math.random().toString(16).substring(2, 12)}...`)

    setIsProcessing(false)
    onClose()
  }

  const handleWithdraw = async () => {
    setIsProcessing(true)
    console.log("🏦 WITHDRAW: Removing liquidity position...")
    console.log(`📞 Contract: BetterYieldMain.withdraw(${position?.id})`)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(`✅ Liquidity withdrawn successfully`)
    console.log(`💾 VaultStorage: Position removed`)
    console.log(`📝 Transaction: 0x${Math.random().toString(16).substring(2, 12)}...`)

    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {mode === "deposit" ? (
              <>
                <Plus className="w-5 h-5 text-emerald-400" />
                Add Liquidity
              </>
            ) : (
              <>
                <Minus className="w-5 h-5 text-red-400" />
                Remove Liquidity
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === "deposit"
              ? "Add liquidity to a Uniswap V3 pool and enable AI optimization"
              : "Remove your liquidity position and withdraw your assets"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="deposit" className="data-[state=active]:bg-emerald-600">
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="data-[state=active]:bg-red-600">
              Withdraw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4">
            <ModernCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">ETH/USDC Pool (0.05%)</h3>
                  <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">Active</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount0" className="text-slate-300">
                      ETH Amount
                    </Label>
                    <Input
                      id="amount0"
                      type="number"
                      placeholder="0.0"
                      value={amount0}
                      onChange={(e) => setAmount0(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount1" className="text-slate-300">
                      USDC Amount
                    </Label>
                    <Input
                      id="amount1"
                      type="number"
                      placeholder="0.0"
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Price Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tickLower" className="text-xs text-slate-400">
                        Lower Tick
                      </Label>
                      <Input
                        id="tickLower"
                        type="number"
                        value={tickLower}
                        onChange={(e) => setTickLower(e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tickUpper" className="text-xs text-slate-400">
                        Upper Tick
                      </Label>
                      <Input
                        id="tickUpper"
                        type="number"
                        value={tickUpper}
                        onChange={(e) => setTickUpper(e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-3 border border-purple-500/30">
                  <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">AI Optimization Available</span>
                  </div>
                  <p className="text-purple-200/80 text-xs">
                    After depositing, you can enable AI-powered optimization for automatic rebalancing and fee
                    compounding.
                  </p>
                </div>
              </div>
            </ModernCard>

            <ModernButton
              onClick={handleDeposit}
              disabled={!amount0 || !amount1 || isProcessing}
              loading={isProcessing}
              size="lg"
              className="w-full"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Liquidity
            </ModernButton>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            {position ? (
              <ModernCard>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{position.pool}</h3>
                    <Badge
                      variant={position.status === "In Range" ? "default" : "destructive"}
                      className={
                        position.status === "In Range"
                          ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                          : "bg-red-600/20 text-red-400 border-red-500/30"
                      }
                    >
                      {position.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-3">
                      <p className="text-sm text-slate-400">Position Value</p>
                      <p className="text-xl font-bold text-white">${position.value.toLocaleString()}</p>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <p className="text-sm text-slate-400">Fees Earned</p>
                      <p className="text-xl font-bold text-emerald-400">${position.feesEarned}</p>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-3 border border-yellow-500/30">
                    <div className="flex items-center gap-2 text-yellow-300 text-sm mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-semibold">Withdrawal Notice</span>
                    </div>
                    <p className="text-yellow-200/80 text-xs">
                      Withdrawing will remove your entire liquidity position and disable any active automation.
                    </p>
                  </div>
                </div>
              </ModernCard>
            ) : (
              <ModernCard>
                <p className="text-slate-400 text-center">No position selected for withdrawal.</p>
              </ModernCard>
            )}

            <ModernButton
              onClick={handleWithdraw}
              disabled={!position || isProcessing}
              loading={isProcessing}
              size="lg"
              variant="secondary"
              className="w-full border-red-500/30 hover:bg-red-900/20"
            >
              <Minus className="w-5 h-5 mr-2" />
              Remove Liquidity
            </ModernButton>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
