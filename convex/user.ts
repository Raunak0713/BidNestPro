import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";


export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    profileImg: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      console.log("createUser mutation called with args:", args); // Debug log

      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
        .first();

      if (existingUser) {
        console.log("User already exists, skipping creation"); // Debug log
        return;
      }

      const newUser = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        clerkId: args.clerkId,
        role: "USER",
        profileImg: args.profileImg || "",
      });

      console.log("New user created:", newUser); // Debug log

      const user = await ctx.runQuery(api.user.getUserByClerkId, {
        clerkId: args.clerkId,
      });


      await ctx.runMutation(api.notification.createNotification, { 
        clerkId : args.clerkId, 
        content : `Hey ${user?.name || "there"} ✨ Your personalized notification center is ready to keep you updated on all the exciting auctions!`
      })
  
      return newUser;
    } catch (error) {
      console.error("Error in createUser mutation:", error); // Debug log
      throw new Error("Error creating user");
    }
  },
});

export const existingUser = query({
  args : {
    clerkId : v.string()
  },
  handler : async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first()
    return !!user
  },
})

export const getUserByClerkId = query({
  args : {
    clerkId : v.string(),
  },
  handler : async (ctx, args) => {
    const user = await ctx.db 
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first()

    return user
  }
})

export const getAllUsersExceptSelf = query({
  args : {
    clerkId : v.string()
  },
  handler : async (ctx, args) => {
    const user = await ctx.runQuery(api.user.existingUser, {clerkId : args.clerkId })

    if(!user) return;

    const excludedUser = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("clerkId"), args.clerkId))
      .collect()
    
    return excludedUser
  }, 
})

export const getAllUsersByClerkExceptSelf = query({
  args : {
    userId : v.id("users")
  },
  handler : async(ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("_id"), args.userId))
      .collect()
    return users
  }
})