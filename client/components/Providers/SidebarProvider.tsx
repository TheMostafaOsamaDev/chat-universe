import React from "react";
import Sidebar from "../Sidebar";

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"grid  md:grid-cols-[300px_1fr]"}>
      <Sidebar />
      {children}
    </div>
  );
}
