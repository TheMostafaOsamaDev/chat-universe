"use client";
import { logIn } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/lib/api-error";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LogIn() {
  const { toast } = useToast();
  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsPending(true);
      await logIn({ email, password });

      window.location.href = "/chat";
    } catch (error) {
      const err = ApiError.generate(error);

      toast({
        variant: "destructive",
        description: err.message,
      });

      setIsPending(false);
    }
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

          <Button className="w-full" disabled={isPending}>
            {isPending ? (
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
