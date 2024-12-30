import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <MainButton />
      </Suspense>
    </div>
  );
}

const MainButton = async () => {
  const styles = "flex flex-col items-center justify-center space-y-4";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (user) {
    return (
      <div className={styles}>
        <h1>Welcome back {user.name}!</h1>
        <div className="flex items-center space-x-1">
          <Button asChild>
            <Link href={"/chat"}>Start chatting!</Link>
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles}>
        <h1>Welcome to Chatty!</h1>
        <Button asChild>
          <Link href={"/sign-up"}>Register to enjoy chatting!</Link>
        </Button>
      </div>
    );
  }
};
