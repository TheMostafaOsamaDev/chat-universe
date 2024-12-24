import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function LogIn() {
  return (
    <div className="container">
      <form action="" className="w-[400px] mx-auto space-y-6">
        <div className="form-control">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" />
        </div>

        <div className="form-control">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" />
        </div>
      </form>
    </div>
  );
}
