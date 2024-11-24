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
