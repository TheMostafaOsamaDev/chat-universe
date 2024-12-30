import React from "react";
import SearchInput from "./SearchInput";
import UserSidebar from "./UserSidebar";

export default function Sidebar() {
  return (
    <div className="p-3 sticky top-0 h-screen flex flex-col gap-2 border-r">
      <SearchInput />

      <div className="flex-1"></div>

      <UserSidebar />
    </div>
  );
}
