import { Button } from "@/components/ui/button";
import { MessageSquareDot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="text-center space-y-2">
        <h1 className="gradient-text">Welcome to Chat Universe</h1>
        <p className="font-medium">
          The right place to start chatting with people around the world.
        </p>

        <Button asChild size={"lg"}>
          <Link href="/register">
            <MessageSquareDot /> Start Chatting Now!
          </Link>
        </Button>
      </div>
    </div>
  );
}
