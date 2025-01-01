import { auth } from "@/auth";
import ChattingList from "@/components/ChattingList";
import ChattingUserInfo from "@/components/ChattingUserInfo";
import SendMessage from "@/components/SendMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        You need to be logged in to view this page
      </AlertDescription>
    </Alert>
  );
}
