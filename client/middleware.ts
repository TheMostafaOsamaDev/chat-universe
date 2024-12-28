import { auth } from "@/auth";

export default auth((req) => {
  const isAuthRoute =
    req.nextUrl.pathname === "/log-in" || req.nextUrl.pathname === "/register";

  if (!req.auth && !isAuthRoute && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/log-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && isAuthRoute) {
    const newUrl = new URL("/chat", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
