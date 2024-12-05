"use server";

import { signIn, signOut } from "@/auth";
import { cookies } from "next/headers";

export const saveAuth = (session: string) => {
  cookies().set("session", session, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const logIn = async (cred: { email: string; password: string }) => {
  await signIn("credentials", cred);
};

export const logOut = async () => {
  return await signOut();
};
