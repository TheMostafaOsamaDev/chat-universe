import React from "react";
import UserSidebar from "./UserSidebar";
import SearchUsers from "./SearchUsers";

export default function Sidebar() {
  return (
    <div className="p-3 sticky top-0 h-screen flex flex-col gap-2 border-r">
      <SearchUsers />

      <UserSidebar />
    </div>
  );
}
