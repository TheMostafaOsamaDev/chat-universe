"use client";

import { useRef } from "react";

export default function useHandleSubmit() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const triggerState = async (type: "client" | "server") => {
    if (type === "server") {
      console.log("use server");
    }

    if (type === "client") {
      console.log("use client");
    }
  };

  return {
    buttonRef,
    triggerState,
  };
}
