"use client";
import SocketClient from "@/app/socket";
import React, { useEffect } from "react";

export default function UserChatStatus({
  userId,
  isOnline,
}: {
  userId: string;
  isOnline: boolean;
}) {
  const [isOnlineStatus, setIsOnline] = React.useState(isOnline);

  useEffect(() => {
    const instance = SocketClient.getInstance();

    if (instance) {
      instance.on("changeUserStatus", (data) => {
        if (data.userId === userId) setIsOnline(data.isOnline);
      });
    }

    return () => {
      instance.off("changeUserStatus");
    };
  }, []);

  return (
    <span
      className={`text-sm ${isOnlineStatus ? "text-primary" : "text-gray-500"}`}
    >
      {isOnlineStatus ? "Online" : "Offline"}
    </span>
  );
}
