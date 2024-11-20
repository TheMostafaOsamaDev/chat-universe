import MainPageButton from "@/components/MainPageButton";
import MainPageLoaderButton from "@/components/MainPageLoaderButton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="text-center space-y-2">
        <h1 className="gradient-text">Welcome to Chat Universe</h1>
        <p className="font-medium">
          The right place to start chatting with people around the world.
        </p>

        <Suspense fallback={<MainPageLoaderButton />}>
          <MainPageButton />
        </Suspense>
      </div>
    </div>
  );
}
