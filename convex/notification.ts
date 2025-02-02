import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const createNotification = mutation({
  args : {
    clerkId : v.string(),
    content : v.string(),
    buttonText : v.optional(v.string()),
    buttonUrl : v.optional(v.string())
  },
  handler : async(ctx, args) => {
    const dbuser = await ctx.runQuery(api.user.getUserByClerkId, { clerkId : args.clerkId })
    if(!dbuser) return null;

    const notifications = await ctx.db.insert("notifications", {
      content : args.content,
      userId: dbuser._id,
      read : false,
      buttonText : args.buttonText,
      buttonUrl : args.buttonUrl
    })

    return "success"
  }
})

export const getAllNotificationsByClerkId = query({
  args : {
    clerkId : v.string()
  },
  handler : async (ctx, args) => {
    const user = await ctx.runQuery(api.user.getUserByClerkId, { clerkId : args.clerkId })
    if(!user) return null;

    const allNotifications : Doc<"notifications">[] = await ctx.db
      .query("notifications")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect()

    return allNotifications
  }
})

export const deleteNotificationById = mutation({
  args : {
    notiId : v.id("notifications")
  },
  handler : async(ctx, args) => {
    const notification = await ctx.db.get(args.notiId)
    if(!notification) return null;

    await ctx.db.delete(args.notiId)
  },
})

export const createAuctionNotification = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.user.getUserByClerkId, { clerkId: args.clerkId });
    if (!user) return;

    const otherUsers: Doc<'users'>[] | null = await ctx.runQuery(api.user.getAllUsersByClerkExceptSelf, { userId: user._id });
    if (!otherUsers) return;

    for (const use of otherUsers) {
      await ctx.runMutation(api.notification.createNotification, {
        clerkId: use.clerkId,
        content: `Hey ${use.name || "there"}!! 👋 New Auction Alert! 🔥 Something amazing just dropped in the marketplace! Don't miss out!`,
        buttonText: "Let's Go",
        buttonUrl: "auction/123",
      });
    }
  },
});
