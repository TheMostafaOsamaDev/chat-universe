"use server";

import { cookies } from "next/headers";

export const saveAuth = (session: string) => {
  cookies().set("session", session, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
