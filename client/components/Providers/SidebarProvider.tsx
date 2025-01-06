import React from "react";
import Sidebar from "../Sidebar";
import { headers } from "next/headers";

export default async function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  // const isChatPage =
  //   pathname === "/chat"
  //     ? " "
  //     : "grid-cols-1 md:grid-cols-[300px_1fr]";

  return (
    <div className={"grid  grid-cols-1 md:grid-cols-[300px_1fr]"}>
      <Sidebar />
      {children}
    </div>
  );
}
