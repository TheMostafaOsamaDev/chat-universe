import React from "react";

export default function ChatBubble({
  message,
  userId,
  index,
  isSkeleton,
}: {
  message: string;
  userId: string;
  index?: number;
  isSkeleton?: boolean;
}) {
  return <div>{message}</div>;
}
