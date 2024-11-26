import { headers } from "next/headers";
import React from "react";

export default function ChattingUserInfo() {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const url = new URL(fullUrl);
  const userId = url.pathname.split("/").pop();

  return <div>{userId}</div>;
}
