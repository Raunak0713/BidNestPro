import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

export const createAuction = mutation({
  args: {
    creatorClerkId: v.string(),
    title: v.string(),
    description: v.string(),
    productImage: v.string(),
    currentPrice: v.number(),
    startingPrice: v.number(),
    endingTime: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const userinDB : Doc<"users"> | null = await ctx.runQuery(api.user.getUserByClerkId, { clerkId: args.creatorClerkId });

      if (!userinDB) throw new Error("User not found");

      const auction : Id<"auctions"> = await ctx.db.insert("auctions", {
        creatorId: userinDB._id,
        title: args.title,
        description: args.description,
        productImage: args.productImage,
        status: "ACTIVE",
        currentPrice: args.currentPrice,
        startingPrice: args.startingPrice,
        endingTime: args.endingTime,
      });

      await ctx.runMutation(api.notification.createAuctionNotification, { clerkId : userinDB.clerkId })

      return auction;

    } catch (error) {
      console.error("Error creating auction:", error);
      throw new Error("Error creating auction")
    }
  },
});

export const getAllAuctionsByClerkId = query({
  args : {
    clerkId : v.string()
  },
  handler : async(ctx, args) => {
    try {
      const user : Doc<"users"> | null = await ctx.runQuery(api.user.getUserByClerkId, { clerkId : args.clerkId  })
  
      if(!user) throw new Error("user not defined")
  
      const AllAuctions : Doc<"auctions">[] = await ctx.db
        .query("auctions")
        .filter((q) => q.eq(q.field("creatorId"), user._id))
        .collect()
      
      return AllAuctions
    } catch (error) {
      console.log("Error getting all auctions by clerkId", error)
      throw new Error("Error getting all auctions by clerk Id")
    }
  }
})

export const getAllAuctions = query({
  args : {},
  handler : async (ctx, args) => {
    try {
      const auctions : Doc<"auctions">[] = await ctx.db
        .query("auctions")
        .collect()
      return auctions  
    } catch (error) {
     console.log("Error getting all auctions", error) 
     throw new Error("Error getting all auctions")
    }
  }
})

export const getCurrentPriceOfAuction = query({
  args : {
    auctionId : v.id("auctions")
  },
  handler : async(ctx, args) => {
    const auction : Doc<"auctions"> | null = await ctx.db.get(args.auctionId)

    if(!auction) throw new Error("Auction is not defined")
    
    return auction.currentPrice
  },
})

export const getAuctionId = query({
  args : {
    title : v.string(),
    description : v.string(),
    startingPrice : v.number()
  },
  handler : async(ctx, args) => {
    const findAuction = await ctx.db
      .query("auctions")
      .filter(q => q.eq(q.field("title"), args.title))
      .filter(q => q.eq(q.field("description"), args.description))
      .filter(q => q.eq(q.field("startingPrice"), args.startingPrice))
      .first()
    return findAuction?._id || null
  },
})

export const getAuctionById = query({
  args : {
    auctionId : v.id("auctions")
  },
  handler : async(ctx, args) => {
    const auction = await ctx.db.get(args.auctionId)
    if(!auction) return null;
    return auction
  },
})