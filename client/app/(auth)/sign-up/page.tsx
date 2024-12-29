"use client";
import LoadingStatus from "@/components/LoadingStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { registerFn } from "@/lib/api/tanstack/auth-functions";
import { deleteUser, signUp } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutate = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
    onError: (error) => {
      toast({ description: error.message, variant: "destructive" });
    },
    onSuccess: () => router.push("/log-in"),
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

    await signUp.email(
      {
        email,
        name,
        password: email,
      },
      {
        onSuccess: () => {
          registerMutate.mutate({
            email,
            name,
            password,
          });
        },
        onError: (ctx) => {
          toast({ description: ctx.error.message, variant: "destructive" });
        },
      }
    );
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

        <Button className="w-full" disabled={registerMutate.isPending}>
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
