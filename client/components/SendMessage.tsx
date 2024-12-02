"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import SocketClient from "@/app/socket";

export default function SendMessage() {
  const { data: session } = useSession();
  const params = useParams();

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userId = session?.user?._id;
    const userChattingWithId = params.userId;
    const message = formData.get("message");

    if (userId !== session?.user?._id || !session?.user?._id) {
      return;
    }

    const instance = SocketClient.getInstance();

    if (instance) {
      instance.emit("sendMessage", {
        userId,
        userChattingWithId,
        message,
      });

      e.currentTarget.reset();
    }
  };

  return (
    <form
      className="flex items-center gap-4 border-t pt-5"
      onSubmit={handleSendMessage}
    >
      <Input placeholder="Send a message" name="message" required />

      <Button className="rounded">
        <Send />
      </Button>
    </form>
  );
}
