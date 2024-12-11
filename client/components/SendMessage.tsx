"use client";
import React, { useEffect, useRef } from "react";
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
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container
  const userId = session?.user?._id;
  const userChattingWithId = params.userId;

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
        // Optimistically update the cache with the new message
        queryClient.setQueryData(
          ["chat", userId, userChattingWithId],
          (oldData: Message[]) => {
            if (!oldData) return [newMessage.chat];

            return [...oldData, newMessage.chat];
          }
        );
        // Scroll to the bottom when a new message arrives
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }

    return () => {
      if (instance) {
        instance.off("savedMessage");
      }
    };
  }, [queryClient, userId, userChattingWithId]);

  useEffect(() => {
    // Scroll to the bottom initially when messages are loaded
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [data]);

  return (
    <>
      <div
        className="flex-1 flex flex-col gap-3 max-h-[75vh] overflow-y-auto"
        ref={chatContainerRef} // Attach ref to the chat container
      >
        {data?.map((message, i) => (
          <ChatBubble key={i} message={message} userId={session?.user?._id} />
        ))}
      </div>

      <SendMessage />
    </>
  );
}
