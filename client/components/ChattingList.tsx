"use client";
import React from "react";
import ChatBubble from "./ChatBubble";

export default function ChattingList() {
  return (
    <div className="flex-1 bg-red-600 max-h-[75vh] overflow-y-auto">
      {Array.from({ length: 50 }).map((_, i) => (
        <ChatBubble key={i} message={`Message ${i}`} />
      ))}
    </div>
  );
}
