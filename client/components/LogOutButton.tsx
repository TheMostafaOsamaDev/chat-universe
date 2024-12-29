import { auth } from "@/auth";
import { headers } from "next/headers";
import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await auth.api.signOut({
          headers: await headers(),
        });

        redirect("/log-in");
      }}
    >
      <Button type="submit" variant={"destructive"} size={"icon"}>
        <LogOut />
      </Button>
    </form>
  );
}
