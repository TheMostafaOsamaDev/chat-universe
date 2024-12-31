"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent } from "react";
import { SocketClient } from "@/lib/socket-client";
import { io } from "socket.io-client";

export default function SendMessage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const instance = SocketClient.getInstance();

    const message = e.currentTarget.message.value;

    instance.emit("sendMessage", {
      message,
    });
  };

  return (
    <form className="relative flex gap-4 h-[45px]" onSubmit={handleSubmit}>
      <Input
        placeholder="Send message"
        className="focus-visible:ring-offset-0 focus-visible:ring-0 border-2 focus-visible:border-primary h-full"
        name="message"
      />

      <Button className="h-full">
        <Send />
      </Button>
    </form>
  );
}
