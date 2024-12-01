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
