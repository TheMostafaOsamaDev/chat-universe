"use client";

import { useEffect, useState } from "react";

export default function useSearchUsers({
  timeout = 800,
}: {
  timeout?: number;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, timeout);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return {
    setSearchValue,
  };
}
