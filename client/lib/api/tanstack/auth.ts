import { baseApi } from "../baseApi";

export const registerFn = async (data: RegisterType) => {
  const res = await baseApi.post("/auth/register", data);
  const resData = res.data;

  return resData;
};

export const logInFn = async (data: LogInType) => {
  const res = await baseApi.post("/auth/login", data);
  const resData: { user: User; session: string } = res.data;

  return resData;
};

export const refreshAuth = async ({
  user,
  signal,
}: {
  user?: User;
  signal: AbortSignal;
}) => {
  const res = await baseApi.post(
    "/auth/refresh",
    { user },
    {
      signal,
    }
  );
  const resData: User = res.data;

  return resData;
};
