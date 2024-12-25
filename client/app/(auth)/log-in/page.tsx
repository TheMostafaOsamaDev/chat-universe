"use client";
import LoadingStatus from "@/components/LoadingStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { axiosBase } from "@/lib/api/axiosBase";
import { loginFn } from "@/lib/api/tanstack/auth-functions";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogIn() {
  const { toast } = useToast();
  const router = useRouter();
  const logInMutate = useMutation({
    mutationKey: ["logIn"],
    mutationFn: loginFn,
    onSuccess: () => {
      toast({
        description: "You have successfully logged in",
      });
      router.push("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password)
      return toast({ description: "Please fill in all fields" });

    logInMutate.mutate({ email, password });
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center noto-serif">Log In</h1>
      </div>
      <form
        className="w-[320px] sm:w-[400px] mx-auto space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" />
        </div>

        <div className="form-control">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </div>

        <Button className="w-full" disabled={logInMutate.isPending}>
          {logInMutate.isPending ? <LoadingStatus /> : "Log in"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p>
          Don't have an account?
          <Button asChild variant={"link"} className="w-fit">
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
