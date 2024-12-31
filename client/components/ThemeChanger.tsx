"use client";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeChanger({ isFull }: { isFull?: boolean }) {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <Button
      className={`relative cursor-pointer ${isFull ? "w-full" : "size-[40px]"}`}
      variant={isFull ? "ghost" : "outline"}
      size={isFull ? "default" : "icon"}
      asChild
      onClick={() => {
        if (theme === "system") {
          setTheme(systemTheme === "dark" ? "light" : "dark");
        } else {
          setTheme(theme === "dark" ? "light" : "dark");
        }
      }}
    >
      <div
        className={`flex items-center ${isFull ? "!pl-6" : "justify-center "}`}
      >
        <Sun
          className={`animate-rotate-in duration-100 dark:animate-rotate-out absolute ${
            isFull && "left-2"
          }`}
          size={35}
        />
        <Moon
          className={`animate-rotate-out duration-100 dark:animate-rotate-in absolute ${
            isFull && "left-2"
          }`}
          size={35}
        />
        {isFull ? "Change Theme" : null}
      </div>
    </Button>
  );
}
