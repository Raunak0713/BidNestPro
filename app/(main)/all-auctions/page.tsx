"use client";

import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ExternalLink, PlusCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const AllAuctionsPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getAllAuctions = useQuery(api.auction.getAllAuctions);

  useEffect(() => {
    if (getAllAuctions) {
      setLoading(false);
    }
  }, [getAllAuctions]);

  return (
    <div className="min-h-screen p-8">
      {/* Notification will now be above this due to z-index */}
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1"></div>

        <h1 className={`text-4xl curved font-bold decoration-red-500  text-center ${theme === "dark" ? 'text-white/80' : 'text-gray-800'}`}>
          Explore Auctions
        </h1>

        <div className='flex-1 flex justify-end'>
          <Button onClick={() => router.push("/create-auction")} className='cursor-pointer transition-all bg-white text-black hover:bg-white px-6 py-2 rounded-lg border-red-500 border-l-2 border-t-2 border-b-[4px] border-r-2 hover:border-r-4  hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]  active:translate-y-[2px]'>
            Create Auction
            <PlusCircle />
          </Button>
       </div>

      </div>

      {/* Auction Cards Grid */}
      {loading ? (
        <div className={`text-4xl text-center font-bold text-gray-800 ${theme === "dark" ? 'text-white/80' : ''}`}>Loading...</div>
      ) : getAllAuctions?.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className={`text-5xl font-bold text-gray-800 ${theme === "dark" ? 'text-white/80' : ''}`}>
            Be the first one to Create Auctions
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {getAllAuctions?.map((item) => (
            <Card 
              key={item._id} 
              className={`flex pointer-events-aut  flex-col cursor-pointer  overflow-hidden  transition-shadow`}
            >
              

              <div className="relative w-full h-48">
                <Image
                  src={item.productImage}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  />
              </div>
              <CardContent className="flex justify-between p-4">
                <CardTitle className="text-xl font-semibold mb-2">{item.title}</CardTitle>
                <span className="text-lg font-bold text-green-600">${item.currentPrice}</span>
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Button onClick={() => router.push(`/auction/${item._id}`)} className='w-full cursor-pointer transition-all bg-white text-black hover:bg-white px-6 py-2 rounded-lg border-red-500 border-l-2 border-t-2 border-b-[4px] border-r-2 hover:border-r-4  hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]  active:translate-y-[2px]'>
                  View Details
                  <ExternalLink />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAuctionsPage;