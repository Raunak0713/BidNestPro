import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CalendarClock } from "lucide-react"

const BidHistory = () => {
  const mockBids = [
    { bidder: "User1", amount: 350, status: "TOP", time: "3m ago" },
    { bidder: "User2", amount: 325, status: "OUTBID", time: "7m ago" },
    { bidder: "User3", amount: 400, status: "WON", time: "15m ago" },
    { bidder: "User4", amount: 310, status: "OUTBID", time: "22m ago" },
    { bidder: "User5", amount: 290, status: "OUTBID", time: "30m ago" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TOP":
        return "bg-green-100 text-green-800"
      case "OUTBID":
        return "bg-red-100 text-red-800"
      case "WON":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="mt-8">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Bid History</h2>
        <div className="space-y-4">
          {mockBids.map((bid, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm bg-white p-4 rounded-md shadow-[1px_1px_#dc2626] border-[1px] border-red-500"
            >
              <div className="flex-1 font-medium">{bid.bidder}</div>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <DollarSign size={16} />
                  <span className="font-semibold">{`$${bid.amount}`}</span>
                </div>
              </div>
              <div className="flex-1 text-center">
                <Badge className={`px-3 py-1 rounded-md ${getStatusColor(bid.status)} pointer-events-none min-w-[75px] text-center`}> 
                  <div className={`
                    ${bid.status === "OUTBID" ? 'ml-0.5' : ''}
                    ${bid.status === "TOP" ? 'ml-3' : ''}
                    ${bid.status === "WON" ? 'ml-2.5' : ''}
                  `}>
                    {bid.status}
                  </div>
                </Badge>
              </div>
              <div className="flex-1 text-right text-gray-500 flex items-center justify-end space-x-1">
                <CalendarClock className="hidden md:flex" size={16} />
                <span>{bid.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default BidHistory
