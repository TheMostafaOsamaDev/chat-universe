"use client";
import { Loader2, SearchIcon } from "lucide-react";
import useSearch from "@/hooks/use-search";
import { SingleChat, SingleChatSkeleton } from "./SingleChat";
import UserInfo, { UserInfoSkeleton } from "./UserInfo";
import { Suspense, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAllUserChats } from "@/lib/api/tanstack/chat";
import SocketClient from "@/app/socket";

export default function ChatsNav() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { setSearch, isPending, data, search } = useSearch();
  const {
    data: userChats,
    isSuccess,
    isPending: isGettingAllChats,
  } = useQuery({
    queryKey: ["AllChats"],
    queryFn: async ({ signal }) =>
      getAllUserChats({ userId: session?.user?._id, signal }),
  });

  useEffect(() => {
    const instance = SocketClient.getInstance();

    if (instance) {
      instance.on("savedMessage", (newMessage) => {
        queryClient.setQueryData(["AllChats"], (old: UserChat[]) => {
          const chatIndex = old.findIndex(
            (chat) => chat?._id === newMessage?.conversation?._id
          );

          if (chatIndex === -1) return [newMessage.conversation, ...old];
          else {
            const updatedChat = {
              ...old[chatIndex],
              lastMessage: newMessage?.conversation?.lastMessage,
            };

            const updatedChats = [...old];
            updatedChats.splice(chatIndex, 1);
            updatedChats.unshift(updatedChat);

            return updatedChats;
          }
        });
      });
    }

    if (userChats) {
      queryClient.setQueryData(["AllChats"], userChats);
    }

    return () => {
      instance.disconnect();
    };
  }, [userChats]);

  let content;

  if ((isPending && search.length > 0) || isGettingAllChats) {
    content = <SkeletonChats />;
  } else if (isSuccess && userChats) {
    content = userChats.map((chat) => {
      const otherUser =
        chat.user1._id === session?.user?._id ? chat.user2 : chat.user1;

      const userChat = {
        _id: otherUser._id,
        name: otherUser.name,
        username: otherUser.username,
        email: otherUser.email,
        avatar: otherUser.avatar,
        lastMessage: chat.lastMessage,
      };

      return <SingleChat key={chat._id} chat={userChat} />;
    });
  }

  return (
    <div className="py-4 px-4 h-screen w-[320px] shadow-md flex flex-col gap-4">
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
        {content}
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
