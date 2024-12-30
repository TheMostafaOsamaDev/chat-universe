import { auth } from "@/auth";
import AvatarUpload from "@/components/AvatarUpload";
import EditUserData from "@/components/EditUserData";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.image) {
    const userData = {
      name: session.user.name,
      email: session.user.email,
      avatar: session.user.image,
      mongoId: session.user.mongoId,
      username: session.user.username,
      createdAt: session.user.createdAt,
    };

    return (
      <div className="container mx-auto flex flex-col items-center gap-5 pt-6">
        <AvatarUpload url={session.user.image} />

        <EditUserData data={userData} />
      </div>
    );
  }

  return redirect("/login");
}
