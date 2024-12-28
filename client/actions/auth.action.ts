"use server";
import { signIn } from "@/auth";

export const logIn = async (user: IUser) => {
  await signIn("credentials", user);
};
