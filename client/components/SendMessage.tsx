"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent } from "react";
import { SocketClient } from "@/lib/socket-client";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SendMessage() {
  const params = useParams();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const instance = SocketClient.getInstance();

    const message = e.currentTarget.message.value;
    const userChattingWith = params.userId;

    if (typeof message !== "string" || message.trim() === "") {
      return toast({
        description: "Message cannot be empty",
      });
    }

    if (typeof userChattingWith !== "string") {
      return toast({
        description: "Invalid user",
      });
    }

    instance.emit("sendMessage", {
      message,
      userChattingWith,
    });

    e.currentTarget.reset();
  };

  return (
    <form
      className="w-full py-3 bg-background flex gap-4"
      onSubmit={handleSubmit}
    >
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
