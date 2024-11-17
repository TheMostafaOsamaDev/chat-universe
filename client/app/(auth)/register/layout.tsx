import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to Chat Universe",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
