# BidNest 🚀

## Project Description 📋
BidNest is a web application built with Next.js, TypeScript, Convex, and Clerk, offering a seamless platform for users to bid on various items. It enables real-time bidding, secure user authentication, and provides a smooth UI/UX design to ensure an excellent user experience.

## Features 🛠️
- **User Authentication** 🔒: Secure login and registration using Clerk.
- **Real-Time Bidding** ⏱️: Users can place bids and track ongoing auctions in real-time.
- **Auction Management** 📦: Users can create and manage auctions.
- **Live Auction Countdown** ⏳: Countdown timers for each auction to show the time remaining.
- **Bidding History** 📜: Users can view their past bids and auction results.
- **Responsive Design** 📱: Fully mobile-friendly for users on all devices.

## Tech Stack 💻
- **Next.js**: A powerful React framework for building server-side rendered apps.
- **TypeScript**: A superset of JavaScript that ensures type safety and a better developer experience.
- **Convex**: A cloud database that offers real-time functionality and seamless data management.
- **Clerk**: A secure user authentication and management service.

## Progress 📊
#### **Project Setup**
 - [ ✅ ] Set up Next.js TypeScript project  
#### **Authentication Setup**
 - [ ✅ ] Integrated Clerk for authentication  
 - [ ✅ ] Custom sign-up and sign-in routes  
#### **Database Setup**
 - [ ✅ ] Integrated Convex database  
 - [ ✅ ] Configured schema for auction and bidding data  
 - [ ✅ ] Optimized queries for fetching live bidding data  
#### **Schema Setup**
 - [ ✅ ] Defined tables for `users`, `auctions`, `bids`, and `notifications` 
 - [ ✅ ] Added index on `bids` table for efficient querying of auction bids by amount  
#### **User Queries and Mutations**
 - [ ✅ ] Create user  
 - [ ✅ ] Check existing user  
 - [ ✅ ] Get user with ClerkID  
 - [ ✅ ] Get all users except the current user  
 - [ ✅ ] Get all users by ClerkID except the current user  
#### **Auction Queries and Mutations**
 - [ ✅ ] Create auctions  
 - [ ✅ ] Retrieve auctions by ClerkID  
 - [ ✅ ] Retrieve all auctions  
 - [ ✅ ] Get current auction price  
 - [ ✅ ] Get auction by ID  
#### **Notification Queries and Mutations**
 - [ ✅ ] Create notifications  
 - [ ✅ ] Retrieve all notifications by ClerkID  
 - [ ✅ ] Delete notification by ID  
 - [ ✅ ] Create auction notifications  
#### **Bid Queries and Mutations**
 - [ ✅ ] Place bids  
 - [ ✅ ] Retrieve all bids for an auction  
 - [ ✅ ] Get current highest bid for an auction  
 - [ ✅ ] Get all bids by ClerkID  
#### **ShadCN UI Initialization**
 - [ ✅ ] Initialized ShadCN UI components  
 - [ ✅ ] Integrated responsive UI design with Tailwind CSS  
 - [ ✅ ] Implemented mobile-first design using ShadCN UI components for consistency across devices

## API References ⚙️

## Commits 📅
#### **Commit #1** : [Project Setup]
 - Initial setup of the Next.js project with TypeScript support.

#### **Commit #2** : [Authentication Setup]
 - Integrated Clerk for secure user authentication  
 - Added custom sign-up and sign-in routes  
 - Verified session management for signed-in users  

#### **Commit #3** : [Database Setup]
 - Integrated Convex Database  
 - Set up a production environment  
 - Designed schema for auctions and bids  
 - Ensured real-time updates for bid changes  

#### **Commit #4** : [Database Schema Setup]
 - Defined schema for `users`, `auctions`, `bids`, and `notifications`  
 - Added index on `bids` table for efficient querying of auction bids by amount  
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

#### **Commit #7** : [ShadCN Initialization and Navbar]
 - Styled using Tailwind CSS  
 - Integrated ShadCN UI components for enhanced UI consistency  
 - Implemented reusable components to ensure consistent layout and responsive design
