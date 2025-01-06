"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ChatPage() {
  const pathname = usePathname();

  const isChatPage = pathname === "/chat" && "hidden md:flex  ";

  return (
    <div
      className={
        `h-screen  flex-col gap-6 items-center justify-center ` + isChatPage
      }
    >
      <Image
        src="/svg/mailbox.svg"
        width={200}
        height={200}
        alt="mailbox image"
      />

      <p className="text-lg">
        Bring your friends and family together with our chat feature.
      </p>
    </div>
  );
}
