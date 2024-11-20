import type { NextRequest } from "next/server";
import { baseApi } from "./lib/api/baseApi";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = request.cookies?.get("session")?.value;

  const res = await baseApi.post("/auth/get-session", {
    session,
  });
  const data = await res.data;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
