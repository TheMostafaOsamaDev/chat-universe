import { baseApi } from "@/lib/api/baseApi";
import { headers } from "next/headers";
import React from "react";
import UserChatStatus from "./UserChatStatus";

export default async function ChattingUserInfo() {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const url = new URL(fullUrl || "");
  const userId = url.pathname.split("/").pop();

  let content;

  try {
    console.log("Sending request to get user info");
    const res = await baseApi.get(`/chat/user/${userId}`);
    const data: Pick<User, "username" | "name" | "_id" | "isOnline"> =
      await res.data;

    content = (
      <div className="flex flex-col gap-1 font-medium">
        <p className="font-medium text-xl">{data.name}</p>

        <UserChatStatus userId={data._id} isOnline={data.isOnline} />
      </div>
    );
  } catch (error) {
    console.log("Error while fetching user info");
    content = (
      <div className="flex flex-col gap-2 font-medium">
        <p className="text-red-700 text-xl">Sorry couldn't get the user info</p>

        <span className="text-sm">Please try again later</span>
      </div>
    );
  }

  return <div className="pb-3 border-b">{content}</div>;
}
