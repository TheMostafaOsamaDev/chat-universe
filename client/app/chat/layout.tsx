import SidebarProvider from "@/components/Providers/SidebarProvider";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <main>{children}</main>
    </SidebarProvider>
  );
}
