// import { NextResponse, type NextRequest } from "next/server";
// import { baseApi } from "./lib/api/baseApi";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const session = request.cookies?.get("session")?.value;

//   const res = await baseApi.post("/auth/get-session", {
//     session,
//   });
//   const data = await res.data;

//   // Gettting url
//   const url = request.nextUrl.pathname;
//   const authPage = new URL("/log-in", request.nextUrl.origin);
//   const homePage = new URL("/", request.nextUrl.origin);

//   const isAuthed = data === true;

//   console.log(url);

//   if (isAuthed) {
//     if (url === "/log-in" || url === "/register") {
//       return NextResponse.redirect(homePage);
//     }
//   } else {
//     if (url.includes("/chat")) {
//       return NextResponse.redirect(authPage);
//     }
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export { auth as middleware } from "@/auth";
