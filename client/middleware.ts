import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname === "/log-in" || pathname === "/sign-up";
  const isProtectedRoute =
    pathname === "/chat" ||
    pathname.startsWith("/chat/") ||
    pathname === "/profile";

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // If on auth routes and session exists, redirect to /chat
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // If on protected routes and no session, redirect to /log-in

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/log-in", "/sign-up", "/chat", "/chat/:path*"],
};
