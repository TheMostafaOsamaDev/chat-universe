import { auth } from "@/auth";
import AuthorizationAlert from "@/components/alerts/AuthorizationAlert";
import ChattingList from "@/components/ChattingList";
import ChattingUserInfo from "@/components/ChattingUserInfo";
import SendMessage from "@/components/SendMessage";
import { headers } from "next/headers";
import React from "react";

export default async function SingleChatPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.mongoId;

  if (userId)
    return (
      <div className="flex flex-col h-screen">
        {/* Header - User info */}
        <ChattingUserInfo />

        <ChattingList userId={userId} />

        <SendMessage />
      </div>
    );

  return <AuthorizationAlert />;
}
