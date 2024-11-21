"use server";

import { signIn } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
