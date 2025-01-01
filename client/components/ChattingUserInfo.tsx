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

  let content;

  if (!isPending)
    content = (
      <>
        <h4 className="font-medium">{data?.name}</h4>
        <p className="text-sm text-gray-500">@{data?.username}</p>
      </>
    );
  else
    content = (
      <>
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-3 w-[150px]" />
      </>
    );
  // return (
  //   <div className="py-3 border-b space-y-1">
  //     <h4 className="m-0">{data?.name}</h4>
  //     <p className="text-sm text-gray-500">@{data?.username}</p>
  //   </div>
  // );

  // return (
  //   <div className="py-3 border-b space-y-2">
  //     <Skeleton className="h-6 w-[150px]" />
  //     <Skeleton className="h-3 w-[150px]" />
  //   </div>
  // );

  return (
    <div className="flex items-center p-4 border-b">
      {/* <div className="w-10 h-10 rounded-full bg-gray-200"></div> */}
      <div className="space-y-2">{content}</div>
    </div>
  );
}
