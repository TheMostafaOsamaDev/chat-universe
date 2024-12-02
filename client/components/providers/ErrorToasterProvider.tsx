"use client";
import SocketClient from "@/app/socket";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";

export default function ErrorToasterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  useEffect(() => {
    const instance = SocketClient.getInstance();

    if (instance) {
      instance.on("error", (error: SocketError) => {
        console.log(error);
        toast({
          description: error.message,
          variant: "destructive",
        });
      });
    }

    return () => {
      if (instance) {
        instance.off("error");
      }
    };
  }, []);

  return children;
}
