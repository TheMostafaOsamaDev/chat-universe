"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border border-input bg-transparent px-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm py-5 rounded-[10px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div
      className={cn(
        "flex border border-input shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  rounded-[10px]",
        className
      )}
    >
      <input
        type={showPassword ? "text" : "password"}
        ref={ref}
        {...props}
        className="h-9 py-5 focus-visible:outline-none w-full bg-transparent px-3 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground"
      />

      <Button
        variant={"ghost"}
        onClick={() => setShowPassword(!showPassword)}
        type="button"
      >
        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
      </Button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
