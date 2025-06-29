"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabsNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  walletConnected: boolean
}

export function TabsNavigation({ activeTab, onTabChange, walletConnected }: TabsNavigationProps) {
  const tabs = [
    { id: "landing", label: "LANDING" },
    { id: "scan", label: "SCAN", requiresWallet: true },
    { id: "positions", label: "POSITIONS", requiresWallet: true },
    { id: "optimize", label: "OPTIMIZE", requiresWallet: true },
    { id: "dashboard", label: "DASHBOARD", requiresWallet: true },
    { id: "chainlink", label: "CHAINLINK" },
    { id: "closed-loop", label: "CLOSED LOOP" },
    { id: "repeat", label: "REPEAT" },
  ]

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-6xl mt-4">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-8 h-auto flex-wrap bg-gray-800 text-white">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            disabled={tab.requiresWallet && !walletConnected && tab.id !== "landing"}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6366F1] data-[state=active]:via-[#A855F7] data-[state=active]:to-[#EC4899] data-[state=active]:text-white data-[state=active]:shadow-lg
                       text-gray-300 hover:text-white transition-colors py-2 px-2 sm:px-4 text-xs sm:text-sm flex-1 whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
