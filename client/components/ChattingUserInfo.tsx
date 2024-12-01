"use client";
import React from "react";
import UserChatStatus from "./UserChatStatus";
import { Skeleton } from "./ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUserInfo } from "@/lib/api/tanstack/chat";

export default function ChattingUserInfo() {
  const params = useParams();

  if (typeof params.userId !== "string") {
    throw new Error("Invalid userId");
  }

  const { data, isPending, error } = useQuery({
    queryFn: async ({ signal }) =>
      getUserInfo({ userId: params.userId as string, signal }),
    queryKey: ["getUserInfo", params.userId],
  });

  let content;

  if (isPending) {
    content = <GettingUserInfoSkeleton />;
  } else if (error) {
    content = (
      <div className="flex flex-col gap-2 font-medium">
        <p className="text-red-700 text-xl">Sorry couldn't get the user info</p>

        <span className="text-sm">Please try again later</span>
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <p className="font-medium text-[18px]">{data.name}</p>

        <UserChatStatus userId={data._id} isOnline={data.isOnline} />
      </>
    );
  }

  return (
    <div className="pb-2 border-b">
      <div className="flex flex-col gap-1 font-medium">{content}</div>
    </div>
  );
}

function GettingUserInfoSkeleton() {
  return (
    <>
      <Skeleton className="h-4 w-[140px]" />
      <Skeleton className="h-4 w-[100px]" />
    </>
  );
}
