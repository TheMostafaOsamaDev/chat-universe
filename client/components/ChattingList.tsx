"use client";
import React, { useEffect } from "react";
import ChatBubble from "./ChatBubble";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getChat } from "@/lib/api/tanstack/chat";
import SendMessage from "./SendMessage";
import SocketClient from "@/app/socket";

export default function ChattingList() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const params = useParams();
  const userId = session?.user?._id,
    userChattingWithId = params.userId;

  if (typeof userChattingWithId !== "string" || typeof userId !== "string") {
    throw new Error("userId must be a string");
  }

  const { data } = useQuery({
    queryFn: async ({ signal }) =>
      getChat({ userId, userChattingWithId, signal }),
    queryKey: ["chat", userId, userChattingWithId],
    enabled: !!userId && !!userChattingWithId,
  });

  useEffect(() => {
    const instance = SocketClient.getInstance();

    if (instance) {
      instance.on("savedMessage", (newMessage) => {
        console.log(newMessage);
        // Optimistically update the cache with the new message
        queryClient.setQueryData(
          ["chat", userId, userChattingWithId],
          (oldData: Message[]) => {
            console.log(oldData);

            if (!oldData) return [newMessage];

            return [...oldData, newMessage];
          }
        );
      });
    }

    return () => {
      if (instance) {
        instance.off("savedMessage");
      }
    };
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col justify-end gap-3 max-h-[75vh] overflow-y-auto">
        {data?.map((message, i) => (
          <ChatBubble key={i} message={message} userId={session?.user?._id} />
        ))}
      </div>

      <SendMessage />
    </>
  );
}
