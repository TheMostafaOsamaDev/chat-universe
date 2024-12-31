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

  return res.data;
};
