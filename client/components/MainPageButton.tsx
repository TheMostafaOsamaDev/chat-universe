import React from "react";
import { Button } from "./ui/button";
import { MessageSquareDot } from "lucide-react";
import Link from "next/link";

export default async function MainPageButton() {
  return (
    <Button asChild size={"lg"}>
      <Link href="/register">
        <MessageSquareDot /> Start Chatting Now!
      </Link>
    </Button>
  );
}
