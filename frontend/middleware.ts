import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/dashboard-admin");

  // If not logged in → block dashboard
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard-admin/:path*"],
};
