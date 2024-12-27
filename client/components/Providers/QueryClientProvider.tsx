"use client";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { QueryClientProvider as QueryProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        position="left"
        buttonPosition="bottom-left"
      />
    </QueryProvider>
  );
}