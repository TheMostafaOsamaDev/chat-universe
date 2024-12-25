import { AxiosError } from "axios";
import { axiosBase } from "../axiosBase";
import { formatAxiosError } from "@/helpers/format-axios-error";

export const registerFn = async (data: RegisterType) => {
  try {
    const res = await axiosBase.post("/auth/register", data);
    const resData = res.data;

    return resData;
  } catch (error) {
    const axiosError = error as AxiosError;

    throw formatAxiosError(axiosError);
  }
};

export const loginFn = async (data: LoginType) => {
  const res = await axiosBase.post("/auth/login", data);
  const resData = res.data;

  return resData;
};

export const verifyAuthFn = async ({ signal }: { signal?: AbortSignal }) => {
  const res = await axiosBase.get("/auth/verify", {
    signal,
  });
  const resData = res.data;

  return resData;
};
