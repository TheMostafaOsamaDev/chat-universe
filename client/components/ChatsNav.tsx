import { SearchIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";

export default function ChatsNav() {
  return (
    <div className="py-10 px-8 h-screen w-[320px] shadow-md">
      <div className="flex items-center gap-1 mb-8 transition-colors outline outline-secondary bg-secondary focus-within:bg-transparent py-2 px-4 rounded">
        <SearchIcon /> <input className="outline-none bg-transparent" />
      </div>

      <nav className="flex flex-col gap-5">
        <SkeletonChats />
      </nav>
    </div>
  );
}

const SkeletonChats = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex gap-2 items-center">
      <Skeleton className="size-10" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-2 w-14" />
        <Skeleton className="h-2 w-12" />
      </div>
    </div>
  ));
};
