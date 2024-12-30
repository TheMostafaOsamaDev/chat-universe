import { auth } from "@/auth";
import AvatarUpload from "@/components/AvatarUpload";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.image) {
    return (
      <div className="container mx-auto flex gap-4 pt-6">
        <AvatarUpload url={session.user.image} />
      </div>
    );
  }

  return redirect("/login");
}
