import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function MainPageLoaderButton() {
  return (
    <Button size={"lg"} disabled={true}>
      <Loader2 className="animate-spin" /> Loading...
    </Button>
  );
}
