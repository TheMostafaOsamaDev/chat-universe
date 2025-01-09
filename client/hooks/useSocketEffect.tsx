"use client";
import { SocketClient } from "@/lib/socket-client";
import { useState, useEffect } from "react";

export const useSocketEffect = (userId: string, initialStatus: boolean) => {
  const [isOnline, setIsOnline] = useState(initialStatus);

  useEffect(() => {
    setIsOnline(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    const socket = SocketClient.getInstance();

    const handleChangeUserStatus = (data: {
      userId: string;
      isOnline: boolean;
    }) => {
      if (data.userId === userId) {
        setIsOnline(data.isOnline); // Update to `false` if needed based on further logic.
      }
    };

    socket.on("changeUserStatus", handleChangeUserStatus);

    return () => {
      socket.off("changeUserStatus", handleChangeUserStatus);
    };
  }, [userId]);

  return isOnline;
};
