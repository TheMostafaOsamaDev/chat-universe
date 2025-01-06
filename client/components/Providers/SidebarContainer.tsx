"use client";
import { dyanmicChatRegex } from "@/config";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDynamicChat = dyanmicChatRegex.test(pathname);

  return (
    <div
      className={`p-3 sticky top-0 h-screen ${
        isDynamicChat ? "hidden md:flex" : "flex"
      } flex-col gap-2 border-r`}
    >
      {children}
    </div>
  );
}
