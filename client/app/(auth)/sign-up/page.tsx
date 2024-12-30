"use client";
import LoadingStatus from "@/components/LoadingStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { registerFn } from "@/lib/api/tanstack/auth-functions";
import { signUp } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  const { toast } = useToast();
  const registerMutate = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
    onError: (error) => {
      toast({ description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password)
      return toast({
        description: "Please fill in all fields",
      });

    registerMutate
      .mutateAsync({
        email,
        name,
        password,
      })
      .then((data) => {
        return signUp.email(
          {
            email,
            name,
            password: email,
            image: data.avatar,
          },
          {
            onError: (ctx) => {
              toast({ description: ctx.error.message, variant: "destructive" });
            },
          }
        );
      })
      .then(() => window.location.reload());
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center noto-serif">Sign Up</h1>
      </div>
      <form
        className="w-[320px] sm:w-[400px] mx-auto space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <Label htmlFor="fullName">Full Name</Label>
          <Input type="text" id="fullName" name="name" required />
        </div>

        <div className="form-control">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required />
        </div>

        <div className="form-control">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" required />
        </div>

        <Button
          className="w-full"
          disabled={registerMutate.isPending || registerMutate.isSuccess}
        >
          {registerMutate.isPending ? <LoadingStatus /> : "Sign Up"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p>
          Already have an account?
          <Button asChild variant={"link"} className="w-fit">
            <Link href={"/log-in"}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
