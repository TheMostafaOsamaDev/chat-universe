"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ChatBubble({
  message,
  userId,
  index,
  isSkeleton,
}: {
  message: Message;
  userId?: string;
  index?: number;
  isSkeleton?: boolean;
}) {
  // Framer Motion animation variants
  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50, // Start slightly below
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0, // Move to its normal position
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`p-3 px-5 rounded-full ${
        message.sender === userId
          ? "self-end bg-secondary rounded-br-sm"
          : "self-start bg-primary rounded-bl-sm text-white"
      }`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      {message.message}
    </motion.div>
  );
}
