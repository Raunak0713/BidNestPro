"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';

const MyBidsPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme()

  const getAllAuctions = useQuery(api.bid.getAllBidsByClerkId, {
    clerkId: user?.id || "",
  });

  useEffect(() => {
    if (getAllAuctions) {
      setLoading(false);
    }
  }, [getAllAuctions]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h1 className="text-5xl font-bold text-gray-800">
          Please sign in to view your auctions.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      {loading ? (
        <div className={`text-4xl font-bold text-gray-800 ${theme === "dark" ? 'text-white/80' : ''}`}>Loading...</div>
      ) : getAllAuctions?.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className={`text-5xl font-semibold ${theme === 'dark' ? 'text-white/80' : ''}`}>
            No active bids yet!
          </h1>
          <p className="text-xl text-gray-600">
            Ready to join the excitement and place your first bid?
          </p>
        </div>
      ) : (
        <div className="text-5xl font-semibold text-green-600 animate-pulse">
          Wooww!
        </div>
      )}
      <Button
        size="lg"
        className="flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all"
      >
        Explore Auctions
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default MyBidsPage;
