import { AxiosResponse } from "axios";
import { baseApi } from "../baseApi";

export const searchUsers = async ({
  query,
  signal,
}: {
  query: string;
  signal?: AbortSignal;
}) => {
  const res = await baseApi.get("/chat/search", {
    params: { value: query },
    signal,
  });
  const resData: ChatUser[] = res.data;
  return resData;
};

export const getUserInfo = async ({
  userId,
  signal,
}: {
  userId: string;
  signal?: AbortSignal;
}) => {
  const res = await baseApi.get(`/chat/user/${userId}`, {
    signal,
  });
  const resData: Pick<User, "username" | "name" | "_id" | "isOnline"> =
    res.data;
  return resData;
};

export const getChat = async ({
  userId,
  userChattingWithId,
  signal,
}: {
  userId: string;
  userChattingWithId: string;
  signal?: AbortSignal;
}) => {
  console.log({
    userId,
    userChattingWithId,
    signal,
  });
  const res = await baseApi.get(`/chat`, {
    signal,
    params: { userId, userChattingWithId },
  });

  const resData: any[] = res.data;

  return resData;
};

export const getAllUserChats = async ({
  userId,
  signal,
}: {
  userId?: string;
  signal?: AbortSignal;
}) => {
  if (!userId) return [];

  const res: AxiosResponse<UserChat[]> = await baseApi.get(`/chat/all`, {
    signal,
    params: { userId },
  });

  const resData = res.data;

  return resData;
};
