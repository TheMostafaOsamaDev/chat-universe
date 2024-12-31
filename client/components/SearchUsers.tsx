"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import useSearchUsers from "@/hooks/use-search-users";

export default function SearchUsers() {
  const { setSearchValue } = useSearchUsers({ timeout: 800 });

  return (
    <>
      {/* <SearchInput /> */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="relative">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            id="search"
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 ring-1"
          />
        </div>
      </div>

      <div className="flex-1"></div>
    </>
  );
}
