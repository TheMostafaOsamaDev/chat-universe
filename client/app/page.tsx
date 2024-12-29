import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
      <Button asChild>
        <Link href={"/log-in"}>Log in</Link>
      </Button>
      <Button asChild>
        <Link href={"/sign-up"}>Sign up</Link>
      </Button>
    </div>
  );
}
