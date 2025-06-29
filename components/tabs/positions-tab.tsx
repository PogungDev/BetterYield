import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface PositionsTabProps {
  walletAddress: string | null
  positions: any[]
}

export function PositionsTab({ walletAddress, positions }: PositionsTabProps) {
  if (!walletAddress || positions.length === 0) {
    return (
      <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Analyze Performance</CardTitle>
          <CardDescription className="text-gray-400">
            No positions found or wallet not connected. Please go to the SCAN tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Connect your wallet and scan to see your liquidity positions here.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl bg-[#1A1A1A] border border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Analyze Performance</CardTitle>
        <CardDescription className="text-gray-400">
          Detailed view of your liquidity pool positions for wallet:{" "}
          <span className="font-semibold">{walletAddress}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-400">Pool</TableHead>
              <TableHead className="text-gray-400">Value</TableHead>
              <TableHead className="text-gray-400">Current Price</TableHead>
              <TableHead className="text-gray-400">Tick Range</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Fees Earned</TableHead>
              <TableHead className="text-gray-400">APR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((pos) => (
              <TableRow key={pos.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell className="font-medium">{pos.pool}</TableCell>
                <TableCell>{pos.value}</TableCell>
                <TableCell>{pos.currentPrice}</TableCell>
                <TableCell>{pos.tickRange}</TableCell>
                <TableCell>
                  <Badge
                    variant={pos.status === "In Range" ? "default" : "destructive"}
                    className={
                      pos.status === "In Range" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                    }
                  >
                    {pos.status}
                  </Badge>
                </TableCell>
                <TableCell>{pos.feesEarned}</TableCell>
                <TableCell>{pos.apr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
