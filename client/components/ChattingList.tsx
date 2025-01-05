"use client";

import { getChat } from "@/lib/api/tanstack/chat-functions";
import { SocketClient } from "@/lib/socket-client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import ChatBubble, { ChatBubbleSkeleton } from "./ChatBubble";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function ChattingList({ userId }: { userId: string }) {
  const params = useParams<{ userId: string }>();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const getChatKey = ["chattingList", params.userId, userId];
  const allUserChatsKey = ["allUserChats", userId];

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: getChatKey,
    queryFn: ({ signal }) =>
      getChat({
        userChattingWithId: params.userId,
        signal,
      }),
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 30,
  });

  const scrollToBottom = () => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 0);
  };

  useEffect(() => {
    if (isSuccess) scrollToBottom();
  }, [isSuccess]);

  useEffect(() => {
    let socket: Socket = SocketClient.getInstance();

    socket.on(
      "savedMessage",
      (message: { chat: ChatMessage; conversation: Conversation }) => {
        // Update chat messages
        queryClient.setQueryData(getChatKey, (oldData: ChatMessage[] = []) => {
          const messageExists = oldData.some(
            (chat) => chat._id === message.chat._id
          );
          if (messageExists) return oldData;
          return [...oldData, message.chat];
        });

        // Update all user chats
        queryClient.setQueryData(
          allUserChatsKey,
          (oldData: ChatUser[] = []) => {
            if (!oldData) return oldData;

            return oldData
              .map((chat) => {
                if (chat._id === message.conversation._id) {
                  return {
                    ...chat,
                    lastMessage: message.chat.message,
                    updatedAt: message.conversation.updatedAt,
                  };
                }
                return chat;
              })
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              );
          }
        );

        // Force refetch both queries
        queryClient.invalidateQueries({ queryKey: getChatKey });
        queryClient.invalidateQueries({ queryKey: allUserChatsKey });

        // Scroll to bottom
        scrollToBottom();
      }
    );

    return () => {
      socket.off("savedMessage");
    };
  }, [queryClient, getChatKey, allUserChatsKey]);

  // Rest of the component remains the same...

  return (
    <div
      className="flex flex-col gap-4 overflow-y-auto p-3 chat-scrollbar"
      style={{
        flex: "1 1 auto",
        scrollBehavior: "smooth",
      }}
      ref={containerRef}
    >
      {data?.map((chat) => (
        <ChatBubble key={chat._id} chat={chat} userId={userId} />
      ))}

      {isLoading &&
        Array.from({ length: 35 }).map((_, index) => (
          <ChatBubbleSkeleton key={index} index={index} />
        ))}
    </div>
  );
}
