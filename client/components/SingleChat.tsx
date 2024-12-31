import React from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAvatar, sliceText } from "@/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SingleChat({ chat }: { chat: ChatUser }) {
  const pathname = usePathname();
  const isActive = pathname.includes(chat._id);

  return (
    <Link href={`/chat/${chat._id}?name=${chat.name}`}>
      <div
        className={`flex gap-4 items-center transition-colors ${
          isActive ? "bg-secondary" : "hover:bg-secondary"
        } px-3 py-2 rounded cursor-pointer`}
      >
        <Avatar>
          <AvatarImage
            src={getAvatar(chat.avatar)}
            className="size-10"
            width={35}
            height={35}
            alt={`${chat.name} avatar`}
          />
          <AvatarFallback />
        </Avatar>

        <div>
          <h5>{sliceText(chat.name)}</h5>
          <p className="text-sm text-slate-500">{chat.lastMessage}</p>
        </div>
      </div>
    </Link>
  );
}

export function SingleChatSkeleton() {
  return (
    <div className="flex gap-4 items-center px-3 py-2">
      <Skeleton className="size-10" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-2 w-14" />
        <Skeleton className="h-2 w-20" />
      </div>
    </div>
  );
}
