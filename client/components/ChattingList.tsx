"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getChat } from "@/lib/api/tanstack/chat";
import SendMessage from "./SendMessage";
import SocketClient from "@/app/socket";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ChattingList() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const params = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container
  const userId = session?.user?._id;
  const userChattingWithId = params.userId;
  const [isAtTop, setIsAtTop] = useState(false);

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

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      console.log(`Total Scroll Height: ${container.scrollHeight}`);
      console.log(
        `Current Scroll Top: ${container.scrollHeight - container.scrollTop}`
      );
      const isTop =
        container.scrollHeight - container.scrollTop < container.clientHeight;
      setIsAtTop(isTop);
    }
  };

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

  useEffect(() => {
    // Instantly scroll to the bottom initially when messages are loaded
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <>
      <div
        className="flex-1 flex flex-col gap-3 h-[75vh] max-h-[75vh] overflow-y-auto custom-scrollbar relative"
        ref={chatContainerRef} // Attach ref to the chat container
      >
        {!isAtTop && (
          <div className="sticky top-0 left-0 right-0 min-h-12 flex justify-center">
            <Button className="size-10 rounded-full p-0">
              <ArrowUp />
            </Button>
          </div>
        )}

        {data?.map((message, i) => (
          <ChatBubble key={i} message={message} userId={session?.user?._id} />
        ))}
      </div>

      <SendMessage />
    </>
  );
}
