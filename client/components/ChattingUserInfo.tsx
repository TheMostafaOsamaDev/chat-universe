"use client";

import { getUserInfo } from "@/lib/api/tanstack/chat-functions";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft, Dot } from "lucide-react";

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
        <p className="text-sm flex items-center gap-2 font-medium">
          <span className="size-2 rounded-full bg-red-500"></span> offline
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
