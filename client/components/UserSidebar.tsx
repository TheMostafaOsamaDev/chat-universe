import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatar } from "@/helpers";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserSidebar({ user }: { user?: User }) {
  if (!user?.image)
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-4 w-32 rounded-full" />
      </div>
    );

  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-12">
        <AvatarImage src={getAvatar(user.image)} />
        <AvatarFallback>
          <Skeleton className="size-12 rounded-full" />
        </AvatarFallback>
      </Avatar>

      <p className="flex-1">{user.name}</p>

      <UserDropdown username={user.username} />
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical, User as UserIcon } from "lucide-react";
import LogOutButton from "./LogOutButton";
import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

const UserDropdown = ({ username }: { username: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="py-3">{`@${username}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeChanger isFull={true} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <UserIcon /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogOutButton
            text="Logout"
            variant="ghost"
            buttonClasses="p-0 h-fit text-red-700 hover:text-red-800 flex justify-start"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
