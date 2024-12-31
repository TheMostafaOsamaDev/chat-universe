"use client";

import { searchUsersFn } from "@/lib/api/tanstack/chat-functions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useSearchUsers({
  timeout = 800,
}: {
  timeout?: number;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchUsers", debouncedValue],
    queryFn: ({ signal }) =>
      searchUsersFn({ signal, searchValue: debouncedValue }),
    enabled: debouncedValue.length > 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, timeout);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return {
    searchResults,
    isLoading,
    debouncedValue,
    setSearchValue,
  };
}
