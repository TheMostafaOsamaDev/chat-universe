"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/lib/api-error";
import { registerFn } from "@/lib/api/tanstack/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutate = useMutation({
    mutationFn: registerFn,
    onError: (error) => {
      toast({
        description: ApiError.generate(error).message,
      });
    },
    onSuccess: (data) => {
      toast({
        description: "Registration successful",
      });
      router.push("/log-in?email=" + data.email);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      toast({
        description: "Passwords do not match",
      });
      return;
    }

    registerMutate.mutate({
      name,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen grid place-content-center">
      <section>
        <h3 className="gradient-text mb-5">
          Register <br /> To Explore The Chat Universe
        </h3>

        <form action="" className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input type="text" id="name" required name="name" />
          </div>

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

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <PasswordInput
              type="password"
              id="confirm-password"
              required
              name="confirm-password"
            />
          </div>

          <Button className="w-full" disabled={registerMutate.isPending}>
            {registerMutate.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Loading...
              </>
            ) : (
              "Register"
            )}
          </Button>

          <div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Button asChild variant={"link"} className="text-primary px-0">
                <Link href={"/log-in"}>Log in</Link>
              </Button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
