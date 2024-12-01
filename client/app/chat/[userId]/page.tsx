import ChattingList from "@/components/ChattingList";
import ChattingUserInfo from "@/components/ChattingUserInfo";
import React from "react";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-5px)] w-full flex flex-col gap-2 p-5">
      <ChattingUserInfo />

      <ChattingList />
    </div>
  );
}
