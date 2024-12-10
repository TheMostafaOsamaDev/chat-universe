import React from "react";
import QueryProvider from "./QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ErrorToasterProvider from "./ErrorToasterProvider";
import RefreshAuthProvider from "./RefreshAuthProvider";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={await auth()}>
      <QueryProvider>
        <ErrorToasterProvider>
          <RefreshAuthProvider>{children}</RefreshAuthProvider>
        </ErrorToasterProvider>
        <Toaster />
      </QueryProvider>
    </SessionProvider>
  );
}
