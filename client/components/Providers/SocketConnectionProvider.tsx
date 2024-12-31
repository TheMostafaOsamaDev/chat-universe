"use client";
import { useSession } from "@/lib/auth-client";
import { SocketClient } from "@/lib/socket-client";
import React, { useEffect } from "react";
import { Socket } from "socket.io-client";

export default function SocketConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    let socket: Socket;

    if (user?.mongoId) {
      socket = SocketClient.getInstance();

      // Wait for socket connection
      socket.on("connect", () => {
        socket.emit("userConnected");
        console.log("User connected");
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  return children;
}
