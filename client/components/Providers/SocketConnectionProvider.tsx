"use client";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  useEffect(() => {
    let socket: Socket;

    console.log(user);

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

  useEffect(() => {
    const socket = SocketClient.getInstance();

    if (socket) {
      socket.on("error", (error: SocketError) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("error");
      }
    };
  }, [toast]);

  return children;
}
