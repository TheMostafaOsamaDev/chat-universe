"use client";
import { Loader2, SearchIcon } from "lucide-react";
import useSearch from "@/hooks/use-search";
import { SingleChat, SingleChatSkeleton } from "./SingleChat";
import UserInfo, { UserInfoSkeleton } from "./UserInfo";
import { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAllUserChats } from "@/lib/api/tanstack/chat";

export default function ChatsNav() {
  const { data: session } = useSession();
  const { setSearch, isPending, data, search } = useSearch();
  const { data: userChats, isSuccess } = useQuery({
    queryKey: ["AllChats"],
    queryFn: async ({ signal }) =>
      getAllUserChats({ userId: session?.user?._id, signal }),
  });

  // useEffect(() => {}, [isSuccess]);

  return (
    <div className="py-8 px-4 h-screen w-[320px] shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-1 transition-colors border-2 border-transparent bg-secondary focus-within:bg-secondary/30 focus-within:border-primary/30 py-2 px-4 rounded">
        <SearchIcon />
        <input
          className="outline-none bg-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Loader2
          className={`animate-spin text-primary transition-opacity ${
            isPending && search.length > 0 ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {isPending && <SkeletonChats />}
        {!isPending &&
          data &&
          data.map((chat) => <SingleChat key={chat._id} chat={chat} />)}
      </nav>

      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo />
      </Suspense>
    </div>
  );
}

const SkeletonChats = () => {
  return Array.from({ length: 9 }).map((_, i) => (
    <SingleChatSkeleton key={i} />
  ));
};
