import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Start chatting",
  description: "Start chatting with your friends",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
