import React from "react";
import { ThemeProvider } from "./theme-provider";
import QueryClientProvider from "./QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import VerifyAuthProvider from "./VerifyAuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* <VerifyAuthProvider> */}
        {children}
        <Toaster />
        {/* </VerifyAuthProvider> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
