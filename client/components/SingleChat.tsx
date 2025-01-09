"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAvatar, sliceText } from "@/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SocketClient } from "@/lib/socket-client";
import { useSocketEffect } from "@/hooks/useSocketEffect";

export function SingleChat({ chat }: { chat: ChatUser }) {
  const pathname = usePathname();
  const isActive = pathname.includes(chat._id);
  const isOnline = useSocketEffect(chat._id, chat.isOnline);

  return (
    <Link href={`/chat/${chat._id}?name=${chat.name}`}>
      <div
        className={`flex gap-4 items-center transition-colors ${
          isActive ? "bg-secondary" : "hover:bg-secondary"
        } px-3 py-2 rounded cursor-pointer`}
      >
        <div className="relative">
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
          <span
            className={`absolute size-3 bg-primary rounded-full right-0 bottom-0 transition-opacity ${
              !isOnline && "opacity-0"
            }`}
          />
        </div>

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
