import React from "react";
import Sidebar from "../Sidebar";

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"grid  grid-cols-1 md:grid-cols-[300px_1fr]"}>
      <Sidebar />
      {children}
    </div>
  );
}
