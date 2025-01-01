import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function ChatBubble({
  chat,
  userId,
}: {
  chat: ChatMessage;
  userId: string;
}) {
  return (
    <div
      className={`py-2 px-4 rounded-lg text-lg font-medium ${
        chat.sender === userId
          ? "self-end bg-secondary rounded-br-none"
          : "self-start bg-primary rounded-bl-none"
      }`}
    >
      {chat.message}
    </div>
  );
}

export const ChatBubbleSkeleton = ({ index }: { index: number }) => {
  return (
    <Skeleton
      className={`py-5 px-4 w-28 rounded-lg text-lg font-medium ${
        index % 2 === 0
          ? "self-end  rounded-br-none"
          : "self-start rounded-bl-none"
      }`}
    />
  );
};
