import React from "react";

export default function ChatBubble({
  message,
  userId,
  index,
  isSkeleton,
}: {
  message: Message;
  userId?: string;
  index?: number;
  isSkeleton?: boolean;
}) {
  return (
    <div
      className={`p-3 px-5 rounded-full ${
        message.sender === userId
          ? "self-end bg-secondary rounded-br-sm"
          : "self-start bg-primary rounded-bl-sm text-white"
      }`}
    >
      {message.message}
    </div>
  );
}
