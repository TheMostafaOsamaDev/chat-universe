"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function SendMessage() {
  return (
    <div className="flex items-center gap-4 border-t pt-5">
      <Input placeholder="Send a message" />

      <Button className="rounded">
        <Send />
      </Button>
    </div>
  );
}
