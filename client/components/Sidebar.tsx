import React from "react";
import UserSidebar from "./UserSidebar";
import UserChats from "./UserChats";
import { auth } from "@/auth";
import { headers } from "next/headers";
import AuthorizationAlert from "./alerts/AuthorizationAlert";
import SidebarContainer from "./Providers/SidebarContainer";

export default async function Sidebar() {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });
  const userId = session?.user?.mongoId;

  if (userId)
    return (
      <SidebarContainer>
        <UserChats userId={userId} />

        <UserSidebar user={session.user as unknown as User} />
      </SidebarContainer>
    );

  return <AuthorizationAlert />;
}
