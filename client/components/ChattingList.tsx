"use client";

import { getChat } from "@/lib/api/tanstack/chat-functions";
import { SocketClient } from "@/lib/socket-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export default function ChattingList() {
  const params = useParams<{ userId: string }>();
  const { data } = useQuery({
    queryKey: ["chattingList"],
    queryFn: ({ signal }) =>
      getChat({
        userChattingWithId: params.userId,
        signal,
      }),
  });

  console.log(data);

  useEffect(() => {
    let socket: Socket = SocketClient.getInstance();

    socket.on(
      "savedMessage",
      (message: { chat: ChatMessage; conversation: Conversation }) => {
        console.log(message);
      }
    );

    return () => {
      socket.off("savedMessage");
    };
  }, []);

  return <div className="flex-1">ChattingList</div>;
}
