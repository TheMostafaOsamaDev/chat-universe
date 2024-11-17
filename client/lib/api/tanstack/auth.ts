import { baseApi } from "../baseApi";

export const registerFn = async (data: RegisterType) => {
  console.log(data);
  const res = await baseApi.post("/auth/register", data);
  const resData = res.data;

  return resData;
};
