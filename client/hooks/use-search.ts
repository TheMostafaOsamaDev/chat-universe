"use client";
import { searchUsers } from "@/lib/api/tanstack/chat";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function useSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isPending, error } = useQuery({
    queryFn: ({ signal }) =>
      searchUsers({
        query: debouncedSearch,
        signal,
      }),
    queryKey: ["search", debouncedSearch],
    enabled: debouncedSearch.length > 0,
  });

  return {
    search,
    setSearch,
    data,
    isPending,
    error,
  };
}
