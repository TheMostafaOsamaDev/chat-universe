"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const PoppinsFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className={`h-[calc(100vh-10px)] ${PoppinsFont.className}`}>
        <div className="w-full h-full flex flex-wrap gap-5 items-center justify-center">
          <div className="flex flex-col gap-5">
            <h2>{error.message || "Something went wrong!"}</h2>
            <Button onClick={() => reset()}>
              <RefreshCcw /> Try again
            </Button>
          </div>

          <Image
            src="/images/global-error.svg"
            width={450}
            height={450}
            alt="Error svg"
          />
        </div>
      </body>
    </html>
  );
}
