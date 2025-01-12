"use client";

import { getUserInfo } from "@/lib/api/tanstack/chat-functions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSocketEffect } from "@/hooks/useSocketEffect";

export default function ChattingUserInfo() {
  const { userId } = useParams<{ userId: string }>();
  const { data, isPending } = useQuery({
    queryKey: ["chatting-user-info"],
    queryFn: ({ signal }) => getUserInfo({ signal, userId: userId as string }),
  });
  const isOnline = useSocketEffect(userId, data?.isOnline || false);

  let content;

  if (!isPending)
    content = (
      <>
        <h4 className="font-medium">{data?.name}</h4>
        <p
          className={`text-sm flex items-center gap-2 font-semibold ${
            isOnline ? "text-primary" : "text-gray-500"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              isOnline ? "bg-primary" : "bg-gray-500"
            }`}
          ></span>
          {isOnline ? "Online" : "Offline"}
        </p>
      </>
    );
  else
    content = (
      <>
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-3 w-[150px]" />
      </>
    );

  return (
    <div className="flex items-center p-4 border-b">
      <Button
        asChild
        className="mr-2 h-full rounded-full"
        variant={"ghost"}
        size={"icon"}
      >
        <Link href={"/chat"}>
          <ArrowLeft />
        </Link>
      </Button>
      <div className="space-y-2">{content}</div>
    </div>
  );
}
