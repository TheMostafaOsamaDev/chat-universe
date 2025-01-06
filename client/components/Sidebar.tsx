import React from "react";
import UserSidebar from "./UserSidebar";
import UserChats from "./UserChats";
import { auth } from "@/auth";
import { headers } from "next/headers";
import AuthorizationAlert from "./alerts/AuthorizationAlert";

export default async function Sidebar() {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });
  const userId = session?.user?.mongoId;

  const pathname = headerList.get("x-current-path");

  // check if the pathname is /chat/:id
  const isChatPage = pathname?.startsWith("/chat/");

  if (isChatPage) return null;

  if (userId)
    return (
      <div
        className={"p-3 sticky top-0 h-screen flex flex-col gap-2 border-r "}
      >
        <UserChats userId={userId} />

        <UserSidebar user={session.user as unknown as User} />
      </div>
    );

  return <AuthorizationAlert />;
}
