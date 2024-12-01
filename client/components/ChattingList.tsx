"use client";
import React, { useEffect } from "react";
import ChatBubble from "./ChatBubble";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getChat } from "@/lib/api/tanstack/chat";
import SendMessage from "./SendMessage";

export default function ChattingList() {
  const { data: session } = useSession();
  const params = useParams();
  const userId = session?.user?._id,
    userChattingWithId = params.userId;

  if (typeof userChattingWithId !== "string" || typeof userId !== "string") {
    throw new Error("userId must be a string");
  }

  const { data, isError, error } = useQuery({
    queryFn: async ({ signal }) =>
      getChat({ userId, userChattingWithId, signal }),
    queryKey: ["chat", userId, userChattingWithId],
    enabled: !!userId && !!userChattingWithId,
  });

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError]);

  return (
    <>
      <div className="flex-1 bg-gray-500/15 max-h-[75vh] overflow-y-auto">
        {Array.from({ length: 50 }).map((_, i) => (
          <ChatBubble key={i} message={`Message ${i}`} userId={userId} />
        ))}
      </div>

      <SendMessage />
    </>
  );
}
