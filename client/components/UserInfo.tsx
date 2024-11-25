"use client";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/auth.actions";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { getAvatarUrl, sliceText } from "@/lib/utils";
import { useEffect, useState } from "react";
import SocketClient from "@/app/socket";

export default function UserInfo() {
  const { data: session } = useSession();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const instance = SocketClient.getInstance();

    if (session?.user && !isActive) {
      instance.connect();

      // TODO: Emit changeStatus event to update user status

      instance.on("connect", () => {
        // instance.emit("changeStatus", {
        //   userId: session.user._id,
        //   isOnline: true,
        // });
        instance.emit("userConnected", session.user._id);
      });

      setIsActive(true);
    }

    return () => {
      // Send offline status before disconnecting
      if (session?.user) {
        const instance = SocketClient.getInstance();
        instance.emit("changeStatus", {
          userId: session.user._id,
          isOnline: false,
        });
        instance.disconnect();
      }

      setIsActive(false);
    };
  }, [session]);

  if (!session) {
    return <UserInfoSkeleton />;
  }

  return (
    <div className="bg-secondary rounded flex items-center gap-3 px-3 py-2">
      <div className="flex gap-2 items-center flex-1">
        <Image
          src={getAvatarUrl(session.user.avatar)}
          alt={session.user.name}
          width={35}
          height={35}
          className="size-10 rounded-full"
        />

        <h4>{sliceText(session.user.name)}</h4>
      </div>

      <Button
        className="w-fit text-red-600 hover:text-red-700 flex items-center gap-1 focus-visible:ring-red-700"
        variant={"ghost"}
        onClick={async () => await logOut()}
      >
        <LogOut />
      </Button>
    </div>
  );
}

export function UserInfoSkeleton() {
  return (
    <div className="bg-secondary rounded flex items-center gap-3 px-3 py-2">
      <div className="flex gap-2 items-center flex-1">
        <Skeleton className="size-10 rounded-full" />

        <Skeleton className="h-2 w-32" />
      </div>
    </div>
  );
}
