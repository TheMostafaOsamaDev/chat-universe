import { AxiosResponse } from "axios";
import { axiosBase } from "../axiosBase";

export const searchUsersFn = async ({
  signal,
  searchValue,
}: {
  signal: AbortSignal;
  searchValue: string;
}) => {
  const res = await axiosBase.get("/chat/search", {
    params: {
      value: searchValue,
    },
    signal,
  });

  const data: ChatUser[] = res.data;

  return data;
};

export const getUserInfo = async ({
  userId,
  signal,
}: {
  userId: string;
  signal?: AbortSignal;
}) => {
  const res = await axiosBase.get(`/chat/user/${userId}`, {
    signal,
  });
  const resData: Pick<User, "username" | "name" | "_id" | "isOnline"> =
    res.data;
  return resData;
};

export const getChat = async ({
  userChattingWithId,
  signal,
}: {
  userChattingWithId: string;
  signal?: AbortSignal;
}) => {
  const res = await axiosBase.get(`/chat`, {
    signal,
    params: { userChattingWithId },
  });

  const resData: ChatMessage[] = res.data;

  return resData;
};

export const getAllUserChats = async ({ signal }: { signal?: AbortSignal }) => {
  const res: AxiosResponse<UserChat[]> = await axiosBase.get(`/chat/all`, {
    signal,
  });

  const resData = res.data;

  return resData;
};
