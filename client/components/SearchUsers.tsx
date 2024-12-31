"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import useSearchUsers from "@/hooks/use-search-users";
import { SingleChat } from "./SingleChat";

export default function SearchUsers() {
  const { searchResults, isLoading, setSearchValue } = useSearchUsers({
    timeout: 800,
  });

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
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

      <div className="flex-1">
        {searchResults?.map((chat) => (
          <SingleChat key={chat._id} chat={chat} />
        ))}
      </div>
    </>
  );
}
