"use client";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <Button
      className="relative cursor-pointer size-[40px]"
      variant={"outline"}
      size={"icon"}
      asChild
      onClick={() => {
        if (theme === "system") {
          setTheme(systemTheme === "dark" ? "light" : "dark");
        } else {
          setTheme(theme === "dark" ? "light" : "dark");
        }
      }}
    >
      <div className="flex items-center justify-center">
        <Sun
          className="animate-rotate-in duration-100 dark:animate-rotate-out absolute"
          size={35}
        />
        <Moon
          className="animate-rotate-out duration-100 dark:animate-rotate-in absolute"
          size={35}
        />
      </div>
    </Button>
  );
}
