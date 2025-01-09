"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import useSearchUsers from "@/hooks/use-search-users";
import { SingleChat, SingleChatSkeleton } from "./SingleChat";
import { useQuery } from "@tanstack/react-query";
import { getAllUserChats } from "@/lib/api/tanstack/chat-functions";
import { Separator } from "./ui/separator";
import NoChatsFoundAlert from "./alerts/NoChatsFoundAlert";

export default function UserChats({ userId }: { userId: string }) {
  const userChatsQueryKey = ["allUserChats", userId];
  const { searchResults, debouncedValue, isLoading, setSearchValue } =
    useSearchUsers({
      timeout: 800,
    });
  const { data: userChats, isLoading: isGettingUserChats } = useQuery({
    queryKey: userChatsQueryKey,
    queryFn: ({ signal }) => getAllUserChats({ signal }),
  });

  let content;

  if ((isLoading && debouncedValue) || isGettingUserChats) {
    content = Array.from({ length: 10 }, (_, i) => (
      <SingleChatSkeleton key={i} />
    ));
  } else if (debouncedValue && searchResults) {
    content = searchResults.map((chat) => (
      <SingleChat key={chat._id} chat={chat} />
    ));
  } else if (userChats) {
    content = userChats.map((conv) => {
      const user = conv.user1._id === userId ? conv.user2 : conv.user1;

      const chat = {
        _id: user._id,
        lastMessage: conv.lastMessage,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        isOnline: user.isOnline,
      };

      return <SingleChat key={chat._id} chat={chat} />;
    });
  } else {
    content = <NoChatsFoundAlert />;
  }

  return (
    <>
      <div className="grid w-full md:max-w-sm items-center gap-1.5 mb-2">
        <div className="relative">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            id="search"
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background px-8 ring-1"
          />

          <div
            className={`absolute right-2.5 top-3 h-4 w-4 text-muted-foreground animate-spin transition-opacity ${
              isLoading ? "opacity-85" : "opacity-0"
            }`}
          >
            <Loader2 className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1 overflow-y-auto chat-scrollbar">
        {content}
      </div>

      <Separator className="my-1" />
    </>
  );
}
