import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PageNotFound() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="flex flex-col gap-5">
        <Image
          src="/images/page-not-found.svg"
          alt="Page Not Found"
          width={500}
          height={500}
        />

        <Button asChild>
          <Link href="/chat">Return back</Link>
        </Button>
      </div>
    </div>
  );
}
