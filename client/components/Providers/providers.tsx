import React from "react";
import { ThemeProvider } from "./theme-provider";
import QueryClientProvider from "./QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import SocketConnectionProvider from "./SocketConnectionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SocketConnectionProvider>
      <QueryClientProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </SocketConnectionProvider>
  );
}
