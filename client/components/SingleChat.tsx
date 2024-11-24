import React from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { getAvatarUrl, sliceText } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SingleChat({ chat }: { chat: ChatUser }) {
  const pathname = usePathname();
  const isActive = pathname.includes(chat._id);

  return (
    <Link href={`/chat/${chat._id}`}>
      <div
        className={`flex gap-4 items-center transition-colors ${
          isActive ? "bg-secondary" : "hover:bg-secondary"
        } px-3 py-2 rounded cursor-pointer`}
      >
        <Image
          src={getAvatarUrl(chat.avatar)}
          alt={`${chat.name} avatar`}
          className="size-10"
          width={35}
          height={35}
        />

        <div>
          <h5>{sliceText(chat.name)}</h5>
          <p className="text-sm text-slate-500">Latest messdssd</p>
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
