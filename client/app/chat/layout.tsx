import SidebarProvider from "@/components/Providers/SidebarProvider";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <main className="px-3">{children}</main>
    </SidebarProvider>
  );
}
