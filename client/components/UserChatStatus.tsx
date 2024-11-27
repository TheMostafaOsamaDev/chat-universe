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
        console.log(data, userId);
        console.log(data.userId === userId);
        setIsOnline(data.userId === userId ? data.isOnline : isOnlineStatus);
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
