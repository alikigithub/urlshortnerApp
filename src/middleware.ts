import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse | void {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const restrictedPages = ["/", "/login", "/signup"];
  const protectedRoutes = ["/dashboard"];

  const url = req.nextUrl;

  if (token && restrictedPages.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    !token &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
