import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({

  users : defineTable({
    name : v.string(),
    email : v.string(),
    clerkId : v.string(),
    profileImg : v.string(),
    role : v.union(v.literal('USER'),v.literal('ADMIN')),
  }),

  auctions : defineTable({
    creatorId : v.id("users"),
    title : v.string(),
    description : v.string(),
    productImage : v.string(),
    status : v.union(v.literal('ACTIVE'),v.literal('ENDED')),
    currentPrice : v.number(),
    startingPrice : v.number(),
    winnerId : v.optional(v.id("users")),
    endingTime : v.number(),
  }),

  bids : defineTable({
    bidderId : v.id("users"),
    auctionId : v.id("auctions"),
    status : v.union(v.literal('TOP'),v.literal('OUTBID'),v.literal('WON')),
    biddingAmount : v.number(),
    biddingTime : v.number(),
  })
  .index("by_auctionId_biddingAmount", ["auctionId", "biddingAmount"]),

  notifications : defineTable({
    userId : v.id("users"),
    content : v.string(),
    read : v.boolean(),
    buttonText : v.optional(v.string()),
    buttonUrl : v.optional(v.string())
  }),

})