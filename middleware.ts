import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const checkToken = request.cookies.get("tokenPet")?.value;
  if (!checkToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/dashboard/:path*"],
};
