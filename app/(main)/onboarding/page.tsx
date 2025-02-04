import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchMutation, fetchQuery } from "convex/nextjs";

const page = async () => {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("User not defined");
  
  const existingUser = await fetchQuery(api.user.getUserByClerkId, { clerkId: user.id });

  if (!existingUser) {
    await fetchMutation(api.user.createUser, {
      name: `${user.firstName || ""}`,
      email: user.emailAddresses[0].emailAddress,
      clerkId: user.id,
      profileImg: user.imageUrl || "",
    });
  }

  return redirect("/");
};

export default page;
