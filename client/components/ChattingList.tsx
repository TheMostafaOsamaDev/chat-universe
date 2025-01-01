"use client";

import { getChat } from "@/lib/api/tanstack/chat-functions";
import { SocketClient } from "@/lib/socket-client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import ChatBubble, { ChatBubbleSkeleton } from "./ChatBubble";

// Move queryClient initialization outside the component
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
    },
  },
});

export default function ChattingList({ userId }: { userId: string }) {
  const params = useParams<{ userId: string }>();
  const queryClient = useQueryClient(); // Use hook instead of global variable

  // Define query key as a constant for consistency
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

  useEffect(() => {
    let socket: Socket = SocketClient.getInstance();

    socket.on(
      "savedMessage",
      (message: { chat: ChatMessage; conversation: Conversation }) => {
        queryClient.setQueryData(getChatKey, (oldData: ChatMessage[] = []) => {
          // Prevent duplicate messages
          const messageExists = oldData.some(
            (chat) => chat._id === message.chat._id
          );

          if (messageExists) {
            return oldData;
          }

          return [...oldData, message.chat];
        });

        // Optionally invalidate the query to trigger a refetch
        queryClient.invalidateQueries({ queryKey: getChatKey });
      }
    );

    return () => {
      socket.off("savedMessage");
    };
  }, [queryClient, getChatKey]); // Add dependencies

  // max-h-[84.47vh]
  return (
    <div
      className="flex flex-col gap-4 overflow-y-auto max-h-[]  py-3"
      style={{
        flex: "1 1 auto",
      }}
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
