"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Tag } from "lucide-react"
import { Input } from '@/components/ui/input'
import BidHistory from '@/components/BiddingHistory'
import { toast } from 'sonner'
import Image from 'next/image'

const AuctionPage = () => {
  const { id: auctionId } = useParams()
  const [biddingPrice, setBiddingPrice] = useState(0);
  const auctionDetails = useQuery(api.auction.getAuctionById, { 
    auctionId: auctionId as Id<"auctions"> 
  })
  
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    if (!auctionDetails) return

    const calculateTimeLeft = () => {
      const hoursLeft = auctionDetails.endingTime
      const minutesLeft = hoursLeft * 60
      setTimeLeft(minutesLeft)
    }

    calculateTimeLeft()
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 60000)

    return () => clearInterval(timer)
  }, [auctionDetails])


  const HandleNewBid = async () => {
    if(!auctionDetails) return
    if(biddingPrice < auctionDetails.currentPrice){
      toast.error("Place a Higher Bid than Current Price")
      return;
    }
    toast.success("New Bid Placed Successfully")
    setBiddingPrice(0)
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatTimeLeft = (minutes: number) => {
    if (minutes <= 0) return "Auction ended"
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      return `${days}d ${remainingHours}h ${remainingMinutes}m remaining`
    }
    
    return `${hours}h ${remainingMinutes}m remaining`
  }

  if (!auctionDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const isEnded = timeLeft <= 0 || auctionDetails.status === 'ENDED'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={auctionDetails.productImage} 
                alt={auctionDetails.title}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{auctionDetails.title}</h1>
            <p className="text-gray-600 text-lg">{auctionDetails.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-red-500">
              <Clock/>
              <span className="text-lg">{formatTimeLeft(timeLeft)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Tag className="text-gray-500" />
                <span className="text-lg text-gray-500 line-through">
                  Starting at {formatPrice(auctionDetails.startingPrice)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-red-500">
                <DollarSign size={24} />
                <span className="text-lg">Current Bid: {formatPrice(auctionDetails.currentPrice)}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-5">
            <Input
              type="number"
              value={biddingPrice}
              onChange={e => setBiddingPrice(Number(e.target.value))}
              placeholder="Type your Bid $"
              aria-label="Auction Description"
              className="border-2 py-8 border-red-500 focus:outline-none active:outline-none shadow-[2px_2px_#dc2626]"
            />
            <Button 
              className="cursor-pointer transition-all bg-white text-black hover:bg-white px-6 py-8 rounded-lg border-red-500 border-l-2 border-t-2 border-b-[4px] border-r-2"
              disabled={isEnded}
              variant={isEnded ? "secondary" : "default"}
              onClick={() => HandleNewBid()}
            >
              {isEnded ? "Auction Ended" : "Place Bid"}
            </Button>
          </div>

          <Card className="mt-6 rounded-md border-2 border-red-500 shadow-[2px_2px_#dc2626]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Status</span>
                <span className={`px-3 py-1 rounded-full ${
                  auctionDetails.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {auctionDetails.status}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bid History Section */}
      <BidHistory />
    </div>
  )
}

export default AuctionPage
