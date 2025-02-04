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
#### **Onboarding and Auctions Route**
 - [ ✅ ] Onboarding Route Synchronizes Clerk user data with the database.
 - [ ✅ ] Auctions Route Displays all available auctions for user exploration.
#### **Bidding History and My Bids Route**
 - [ ✅ ] Created a comprehensive Bidding History page for users to track past bids.
 - [ ✅ ] Implemented My Bids route for personalized bid management.
# API References ⚙️

## User Queries and Mutations

### 🚀 **CreateUser Mutation** 🚀

#### **Description**:  
Creates a new user in the database. Checks if the user already exists by **clerkId**, and if not, creates a new user and sends them a personalized notification.

#### **Arguments**:
- `name` (string) - The name of the user.  
- `email` (string) - The user's email address.  
- `clerkId` (string) - The **Clerk** user ID.  
- `profileImg` (string, optional) - The URL of the user's profile image.

#### **Response**:  
- Returns the created user object.

#### **Example**:
```typescript
const newUser = await createUser({
  name: "John Doe",
  email: "johndoe@example.com",
  clerkId: "clerk-1234567890",
  profileImg: "https://link-to-profile-img.com",
});
```
### 🔍 **ExistingUser Query** 🔍

#### **Description**:  
Checks if a user exists by **clerkId** in the database.

#### **Arguments**:
- `clerkId` (string) - The **Clerk** user ID.

#### **Response**:  
- Returns `true` if the user exists, otherwise `false`.

#### **Example**:
```typescript
const userExists = await existingUser({
  clerkId: "clerk-1234567890",
});
```

### 👤 **GetUserByClerkId Query** 👤

#### **Description**:  
Fetches a user from the database by their **clerkId**.

#### **Arguments**:
- `clerkId` (string) - The **Clerk** user ID.

#### **Response**:  
- Returns the user object if found, otherwise `null`.

#### **Example**:
```typescript
const user = await getUserByClerkId({
  clerkId: "clerk-1234567890",
});
```

### 👥 **GetAllUsersExceptSelf Query** 👥

#### **Description**:  
Fetches all users from the database except the user identified by the provided **userId**.

#### **Arguments**:
- `userId` (id of users table) - The **_id** of the user to exclude.

#### **Response**:  
- Returns an array of user objects excluding the one with the provided **userId**.

#### **Example**:
```typescript
const users = await getAllUsersByClerkExceptSelf({
  userId: "users-id-123456",
});
```

### 👥 **GetAllUsersByClerkExceptSelf Query** 👥

#### **Description**:  
Fetches all users from the database except the user identified by the provided **clerkId**.

#### **Arguments**:
- `clerkId` (string) - The **Clerk** user ID of the user to exclude.

#### **Response**:  
- Returns an array of user objects excluding the one with the provided **clerkId**.

#### **Example**:
```typescript
const users = await getAllUsersExceptSelf({
  clerkId: "clerk-1234567890",
});
```

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

#### **Commit #8** : [User Query and Mutations Documentation]  
- Added comprehensive documentation for user-related queries and mutations  
- Provided detailed descriptions for **CreateUser Mutation**, **ExistingUser Query**, **GetUserByClerkId Query**, **GetAllUsersExceptSelf Query**, and **GetAllUsersByClerkExceptSelf Query**  
- Included example usage for each operation and clarified argument and response details

#### **Commit #9** : [Onboarding Route and All Auctions Route]
- Onboarding Route Syncs Clerk user data with the database for seamless user integration.
- Auctions Route: Displays all available auctions, allowing users to explore current listings.

#### **Commit #10** : [Bidding History, My Bids Route, Auction Route]
- Created a dedicated Bidding History page to allow users to view detailed records of their past bids.
- Developed the My Bids route to provide a personalized view of a user's ongoing and past bids for better management.
- Implemented the Auction Route to display available auctions and facilitate bid placement in real-time.