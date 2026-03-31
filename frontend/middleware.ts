import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TEMPORARY: disable middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard-admin/:path*"],
};
