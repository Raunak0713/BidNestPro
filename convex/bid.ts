import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

export const placeBid = mutation({
  args: {
    auctionId: v.id("auctions"),
    bidderClerkId: v.string(),
    biddingAmount: v.number()
  },
  handler: async (ctx, args): Promise<Id<"bids">> => {
    const auction = await ctx.db.get(args.auctionId);
    if (!auction) throw new Error("Auction not found");

    if (args.biddingAmount <= auction.currentPrice) {
      throw new Error("Bid must be higher than the current price");
    }

    const bidder = await ctx.runQuery(api.user.getUserByClerkId, { clerkId: args.bidderClerkId });
    if (!bidder) throw new Error("Bidder not found");

    const highestBid = await ctx.runQuery(api.bid.currentHighestBidOfAuction, { auctionId: args.auctionId });

    if (highestBid) {
      await ctx.db.patch(highestBid._id, { status: "OUTBID" });
    }

    await ctx.db.patch(args.auctionId, { currentPrice: args.biddingAmount });

    const newBidId = await ctx.db.insert("bids", {
      bidderId: bidder._id,
      auctionId: args.auctionId,
      status: "TOP",
      biddingAmount: args.biddingAmount,
      biddingTime: Date.now(),
    });

    return newBidId;
  }
});

export const getAllBidsOfAuction = query({
  args : {
    auctionId : v.id("auctions")
  },
  handler : async(ctx, args) => {
    const auction = await ctx.db.get(args.auctionId)
    if(!auction) throw new Error("Auction is not defined")
    
    const allBids = await ctx.db
      .query("bids")
      .filter((q) => q.eq(q.field("auctionId"), args.auctionId))
      .collect()

    return allBids
  },
})

export const currentHighestBidOfAuction = query({
  args: {
    auctionId: v.id("auctions"),
  },
  handler: async (ctx, args) => {
    try {
      const highestBid = await ctx.db
        .query("bids")
        .withIndex("by_auctionId_biddingAmount", (q) => q.eq("auctionId", args.auctionId))
        .order("desc")
        .first();

      return highestBid;
    } catch (error) {
      console.error("Error fetching highest bid:", error);
      throw new Error("Error fetching highest bid");
    }
  },
});

export const getAllBidsByClerkId = query({
  args : {
    clerkId : v.string()
  },
  handler : async(ctx, args) => {
    const user = await ctx.runQuery(api.user.getUserByClerkId, { clerkId : args.clerkId })
    if(!user) throw new Error("No user found")

    const AllBids : Doc<"bids">[] = await ctx.db  
      .query("bids")
      .filter((q) => q.eq(q.field("bidderId"), user._id))
      .collect()
    
    return AllBids;
  },
})