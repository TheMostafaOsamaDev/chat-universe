import React from "react";
import { Button } from "./ui/button";
import { MessageSquareDot } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";

export default async function MainPageButton() {
  const session = await auth();

  return (
    <Button asChild size={"lg"}>
      <Link href={`${session?.user ? "/chat" : "/register "}`}>
        <MessageSquareDot /> Start Chatting Now!
      </Link>
    </Button>
  );
}
