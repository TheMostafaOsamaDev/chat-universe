import React from "react";
import { Orbit } from "lucide-react";
import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

export default function Navbar() {
  return (
    <header>
      <div className="container py-3 border-b flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary hover:text-primary/95">
          <Link href={"/"} className="flex items-center gap-2">
            <Orbit size={32} />
            Chatty
          </Link>
        </h1>

        <ThemeChanger />
      </div>
    </header>
  );
}
