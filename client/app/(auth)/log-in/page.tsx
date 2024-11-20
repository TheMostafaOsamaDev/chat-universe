"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/lib/api-error";
import { logInFn } from "@/lib/api/tanstack/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogIn() {
  const router = useRouter();
  const { toast } = useToast();
  const logInMutate = useMutation({
    mutationFn: logInFn,
    onError: (error) => {
      toast({
        description: ApiError.generate(error).message,
      });
    },
    onSuccess: () => {
      toast({
        description: "Logged In successfully",
      });
      // router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    logInMutate.mutate({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen grid place-content-center">
      <section className="container">
        <h3 className="gradient-text mb-5">
          LogIn <br /> To Explore The Chat Universe
        </h3>

        <form action="" className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required name="email" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              type="password"
              id="password"
              required
              name="password"
            />
          </div>

          <Button className="w-full" disabled={logInMutate.isPending}>
            {logInMutate.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Loading...
              </>
            ) : (
              "Log In"
            )}
          </Button>

          <div>
            <p className="text-center text-sm">
              Dont have an account?{" "}
              <Button asChild variant={"link"} className="text-primary px-0">
                <Link href={"/register"}>Register</Link>
              </Button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
