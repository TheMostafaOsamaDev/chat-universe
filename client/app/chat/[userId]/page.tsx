import ChattingList from "@/components/ChattingList";
import ChattingUserInfo from "@/components/ChattingUserInfo";
import SendMessage from "@/components/SendMessage";
import React from "react";

export default function SingleChatPage() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <ChattingUserInfo />

      <ChattingList />

      <SendMessage />
    </div>
  );
}
