"use client";
import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

export default function ChatBubble({
  message,
  userId,
  index,
  isSkeleton,
}: {
  message?: Message;
  userId?: string;
  index?: number;
  isSkeleton?: boolean;
}) {
  // Framer Motion animation variants
  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30, // Start slightly below
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0, // Move to its normal position
    },
  };

  if (!isSkeleton)
    return (
      <motion.div
        className={`p-3 px-5 rounded-full ${
          message?.sender === userId
            ? "self-end bg-secondary rounded-br-sm"
            : "self-start bg-primary rounded-bl-sm text-white"
        }`}
        initial="hidden"
        animate="visible"
        variants={bubbleVariants}
      >
        {message?.message}
      </motion.div>
    );

  return (
    <Skeleton
      className={`p-5 px-10 rounded-full bg-secondary ${
        index && (index + 1) % 2 === 0
          ? "self-end rounded-br-sm"
          : "self-start rounded-bl-sm text-white"
      }`}
    ></Skeleton>
  );
}
