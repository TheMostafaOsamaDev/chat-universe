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

  const { data, isLoading } = useQuery({
    queryKey: getChatKey,
    queryFn: ({ signal }) =>
      getChat({
        userChattingWithId: params.userId,
        signal,
      }),
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 30,
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]); // Dependency on data ensures scroll happens when messages change

  useEffect(() => {
    let socket: Socket = SocketClient.getInstance();

    socket.on(
      "savedMessage",
      (message: { chat: ChatMessage; conversation: Conversation }) => {
        queryClient.setQueryData(getChatKey, (oldData: ChatMessage[] = []) => {
          const messageExists = oldData.some(
            (chat) => chat._id === message.chat._id
          );

          if (messageExists) {
            return oldData;
          }

          // Scroll to bottom after adding new message
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
            }
          }, 0);

          return [...oldData, message.chat];
        });

        queryClient.invalidateQueries({ queryKey: getChatKey });
      }
    );

    return () => {
      socket.off("savedMessage");
    };
  }, [queryClient, getChatKey]);

  // Function to handle smooth scrolling to bottom
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Scroll to bottom on initial load
  useEffect(() => {
    if (!isLoading && data?.length) {
      scrollToBottom();
    }
  }, [isLoading, data]);

  return (
    <div
      className="flex flex-col gap-4 overflow-y-auto p-3 chat-scrollbar"
      style={{
        flex: "1 1 auto",
        scrollBehavior: "smooth", // Enable smooth scrolling
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
