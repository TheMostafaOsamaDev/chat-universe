"use client";
import { LogOut, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/auth.actions";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { getAvatarUrl, sliceText } from "@/lib/utils";
import { useEffect, useState } from "react";
import SocketClient from "@/app/socket";
import Link from "next/link";

export default function UserInfo() {
  const { data: session } = useSession();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const instance = SocketClient.getInstance();

    if (session?.user && !isActive) {
      instance.connect();

      instance.on("connect", () => {
        const socketId = instance.id;
        instance.emit("userConnected", {
          userId: session.user._id,
          socketId,
        });
      });

      setIsActive(true);
    }

    return () => {
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
  }, [session, isActive]);

  if (!session) {
    return <UserInfoSkeleton />;
  }

  return (
    <div className="bg-secondary rounded flex items-center gap-8 px-3 py-2">
      <div className="flex gap-2 items-center flex-1">
        <Image
          src={getAvatarUrl(session.user.avatar)}
          alt={session.user.name}
          width={35}
          height={35}
          className="size-10 rounded-full"
        />

        <h4 className="text-nowrap">{sliceText(session.user.name)}</h4>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="w-fit flex items-center gap-1 p-2"
          variant={"secondary"}
          asChild
        >
          <Link href={"/chat/profile"}>
            <Settings />
          </Link>
        </Button>

        <Button
          className="w-fit flex items-center gap-1 text-red-600 hover:text-red-700  focus-visible:ring-red-700 p-2"
          variant={"secondary"}
          onClick={async () => await logOut()}
        >
          <LogOut />
        </Button>
      </div>
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
