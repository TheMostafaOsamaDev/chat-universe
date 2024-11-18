import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to Chat Universe",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
