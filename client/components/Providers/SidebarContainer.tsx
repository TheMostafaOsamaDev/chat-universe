"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/chat/")) return null;

  return (
    <div className={"p-3 sticky top-0 h-screen flex flex-col gap-2 border-r "}>
      {children}
    </div>
  );
}
