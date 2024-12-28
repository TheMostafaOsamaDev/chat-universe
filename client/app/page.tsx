import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const isUser = session?.user;

  let content;

  if (isUser) {
    content = (
      <>
        <Button asChild>
          <Link href={"/chat"}>Chat with friends!</Link>
        </Button>
      </>
    );
  } else {
    content = (
      <>
        <Button asChild>
          <Link href={"/log-in"}>Log in</Link>
        </Button>
        <Button asChild>
          <Link href={"/sign-up"}>Sign up</Link>
        </Button>
      </>
    );
  }

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
      {content}
    </div>
  );
}
