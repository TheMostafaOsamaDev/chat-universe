import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/sign-up">Sign up</Link>
      </Button>

      <Button asChild>
        <Link href="/log-in">Log in</Link>
      </Button>
    </div>
  );
}
