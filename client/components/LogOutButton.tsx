import { auth } from "@/auth";
import { headers } from "next/headers";
import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogOutButton({
  text,
  variant,
  buttonClasses,
}: {
  text?: string;
  variant?: "ghost" | "secondary";
  buttonClasses?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";

        await auth.api.signOut({
          headers: await headers(),
        });

        redirect("/log-in");
      }}
      className="w-full"
    >
      <Button
        type="submit"
        variant={variant || "destructive"}
        size={text ? "default" : "icon"}
        className={buttonClasses + " w-full"}
      >
        <LogOut /> {text}
      </Button>
    </form>
  );
}
