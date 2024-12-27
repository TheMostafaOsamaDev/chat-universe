"use client";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/constants";
import { verifyAuthFn } from "@/lib/api/tanstack/auth-functions";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

export default function VerifyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSuccess, isPending, isError, refetch, data } = useQuery({
    queryKey: ["verify-auth-provider"],
    queryFn: ({ signal }) => verifyAuthFn({ signal }),
    refetchOnWindowFocus: false,
  });
  const lastExecutedRef = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    if (!isPending) {
      if (isError) {
        const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

        if (isProtectedRoute) {
          router.push("/log-in");
        }
      }

      if (isSuccess) {
        const isAuthRoute = AUTH_ROUTES.includes(pathname);

        if (isAuthRoute) {
          router.push("/");
        }
      }
    }
  }, [isPending, isError]);

  useEffect(() => {
    // const throttleTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    // Make it 10 seconds for testing
    const throttleTime = 10 * 1000; // 10 seconds in milliseconds

    const interval = setInterval(() => {
      const now = Date.now();
      console.log("Refetching...");
      if (now - lastExecutedRef.current >= throttleTime) {
        console.log("Now we really refetch");
        lastExecutedRef.current = now;
        refetch();
      }
    }, 1000); // Check every second to minimize unnecessary delays

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      <div
        className={`fixed z-50 w-screen h-screen bg-background grid place-items-center ${
          isPending ? "block" : "hidden"
        }`}
      >
        <Loader2 className="animate-spin text-primary" size={42} />
      </div>
      {children}
    </>
  );
}
