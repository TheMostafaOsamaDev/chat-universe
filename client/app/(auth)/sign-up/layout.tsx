import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up for an account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="pt-20">{children}</section>;
}
