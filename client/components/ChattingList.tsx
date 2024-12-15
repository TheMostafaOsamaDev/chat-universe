"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getChat } from "@/lib/api/tanstack/chat";
import SendMessage from "./SendMessage";
import SocketClient from "@/app/socket";
import { ArrowUp } from "lucide-react"; // Using only ArrowUp with rotation
import { Button } from "./ui/button";

export default function ChattingList() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const params = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container
  const userId = session?.user?._id;
  const userChattingWithId = params.userId;
  const [isAtTop, setIsAtTop] = useState(false);

  // Ensure userId and userChattingWithId are strings
  if (typeof userChattingWithId !== "string" || typeof userId !== "string") {
    throw new Error("userId must be a string");
  }

  // Fetch chat data
  const { data, isPending } = useQuery({
    queryFn: async ({ signal }) =>
      getChat({ userId, userChattingWithId, signal }),
    queryKey: ["chat", userId, userChattingWithId],
    enabled: !!userId && !!userChattingWithId,
  });

  // Handle incoming messages via WebSocket
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

  // Determine if the user is at the top of the chat
  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const atTop = container.scrollTop === 0;
      setIsAtTop(atTop);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Scroll to the bottom when messages are loaded
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  // Handle arrow button click
  const handleArrowClick = () => {
    if (isAtTop) {
      // Scroll to bottom
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to top
      chatContainerRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        className="flex-1 flex flex-col gap-3 h-[75vh] max-h-[75vh] overflow-y-auto custom-scrollbar relative"
        ref={chatContainerRef} // Attach ref to the chat container
      >
        {!isPending && (
          <Button
            onClick={handleArrowClick}
            className={`
          size-10 rounded-full p-0 transition-all duration-300
          ${isAtTop ? "transform rotate-180" : ""}
          sticky  top-2 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100
        `}
          >
            <ArrowUp />
          </Button>
        )}

        {/* Chat Messages */}
        {isPending ? (
          <SkeletonMessages />
        ) : (
          data?.map((message, i) => (
            <ChatBubble key={i} message={message} userId={session?.user?._id} />
          ))
        )}
      </div>

      {/* Send Message Component */}
      <SendMessage />
    </>
  );
}

const SkeletonMessages = () =>
  Array.from({ length: 12 }).map((_, i) => (
    <ChatBubble key={i} isSkeleton index={i} />
  ));
