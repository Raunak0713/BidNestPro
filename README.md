# BidNest 🚀

## Project Description 📋
The BidNest is a web application built with Next.js, TypeScript, Convex, and Clerk, providing a seamless platform for users to bid on various items. It allows real-time bidding, user authentication, and smooth UI/UX design to ensure a great user experience.

## Features 🛠️
- **User Authentication** 🔒: Secure login and registration using Clerk.
- **Real-Time Bidding** ⏱️: Users can place bids and track ongoing auctions in real-time.
- **Auction Management** 📦: Users can create and manage auctions.
- **Live Auction Countdown** ⏳: Countdown timers for each auction to show the time remaining.
- **Bidding History** 📜: Users can view their past bids and auction results.
- **Responsive Design** 📱: Fully mobile-friendly for users on all devices.

## Tech Stack 💻
- **Next.js**: A powerful React framework for building server-side rendered apps.
- **TypeScript**: A superset of JavaScript that ensures type safety and better developer experience.
- **Convex**: A cloud database that offers real-time functionality and seamless data management.
- **Clerk**: A secure user authentication and management service.

## Progress 📊
#### **Project Set Up**
 - [ ✅ ] Set Up NextJS TypeScript Project  
#### **Authentication Set Up**
 - [ ✅ ] Set Up Clerk Auth  
 - [ ✅ ] Custom Sign Up and Sign In Routes  
#### **Database Set Up**
 - [ ✅ ] Set Up Convex Database  
 - [ ✅ ] Configured schema for auction and bidding data  
 - [ ✅ ] Optimized queries for fetching live bidding data  
#### **Schema Set Up**
 - [ ✅ ] Defined `users`, `auctions`, `bids`, and `notifications` tables 
 - [ ✅ ] Added `index` on `bids` table for querying auction bids by amount efficiently
#### **User Queries and Mutations**
 - [ ✅ ] Create User  
 - [ ✅ ] Check Existing User  
 - [ ✅ ] Get User with ClerkID  
 - [ ✅ ] Get All Users Except the Self  
 - [ ✅ ] Get All Users by ClerkID Except the Self  
#### **Auction Queries and Mutations**
 - [ ✅ ] Create Auctions  
 - [ ✅ ] Get All Users Auctions By ClerkID  
 - [ ✅ ] Get All Auctions  
 - [ ✅ ] Get Current Price of Auction  
 - [ ✅ ] Get AuctionID  
 - [ ✅ ] Get Auction By ID  
#### **Notification Queries and Mutations**
 - [ ✅ ] Create Notifications  
 - [ ✅ ] Get All Notifications By Clerk ID  
 - [ ✅ ] Delete Notification By ID  
 - [ ✅ ] Create Auction Notification  

## API References ⚙️

## Commits 📅
#### **Commit #1** : [Project Setup]
 - Initial setup of the Next.js project with TypeScript support.

#### **Commit #2** : [Authentication Setup]
 - Integrated Clerk for secure user authentication  
 - Added custom Sign Up and Sign In routes  
 - Verified session management for Signed In Users  

#### **Commit #3** : [Database Setup]
 - Integrated Convex Database  
 - Set up a production environment  
 - Designed schema for auctions and bids  
 - Ensured real-time updates for bid changes  

#### **Commit #4** : [Database Schema Setup]
 - Defined schema for `users`, `auctions`, `bids`, and `notifications`  
 - Added `index` on `bids` table for querying auction bids by amount efficiently  
 - Integrated notifications for bid status and user engagement  

#### **Commit #5** : [User and Auction Management]
 - Added functionality for user registration and data retrieval
 - Enabled auction creation and management for users
 - Implemented queries for retrieving user-related data and auction details
 - Set up real-time updates for auction prices

#### **Commit #6** : [Notification and Bid Management]
 - Integrated functionality for creating and managing notifications  
 - Added real-time updates for bid status and auction notifications  
 - Implemented bid notifications and user-specific notifications  
