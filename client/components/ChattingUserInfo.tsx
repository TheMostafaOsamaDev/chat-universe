"use client";

import { getUserInfo } from "@/lib/api/tanstack/chat-functions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function ChattingUserInfo() {
  const { userId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["chatting-user-info"],
    queryFn: ({ signal }) => getUserInfo({ signal, userId: userId as string }),
  });

  if (!isPending)
    return (
      <div className="pb-2 border-b space-y-1">
        <h4 className="m-0">{data?.name}</h4>
        <p className="text-sm text-gray-500">@{data?.username}</p>
      </div>
    );

  return (
    <div className="pb-2 border-b space-y-2">
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-3 w-[150px]" />
    </div>
  );
}
