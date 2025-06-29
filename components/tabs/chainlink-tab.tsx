import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Server } from "lucide-react"

export function ChainlinkTab() {
  const services = [
    {
      name: "Chainlink Data Feeds",
      status: "Operational",
      icon: <CheckCircle className="text-green-500" />,
      description: "Providing real-time, decentralized price data for AI analysis.",
    },
    {
      name: "Chainlink Functions",
      status: "Operational",
      icon: <CheckCircle className="text-green-500" />,
      description: "Securely executing off-chain AI computations for optimal strategies.",
    },
    {
      name: "Chainlink Automation",
      status: "Operational",
      icon: <CheckCircle className="text-green-500" />,
      description: "Automating rebalancing and compounding based on AI triggers.",
    },
    {
      name: "Chainlink CCIP",
      status: "Ready for Cross-Chain",
      icon: <Server className="text-blue-500" />,
      description: "Enabling secure cross-chain asset and data transfers (future expansion).",
    },
  ]

  return (
    <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Chainlink Infrastructure Status</CardTitle>
        <CardDescription className="text-gray-400">
          Real-time status of the Chainlink services powering BetterYield AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <div className="flex-shrink-0">{service.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-sm text-gray-400">{service.description}</p>
              <p className="text-xs text-gray-500 mt-1">Status: {service.status}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
