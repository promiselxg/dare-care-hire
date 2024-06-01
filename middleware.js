import { NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";

export async function middleware(request) {
  // Extract token from the request URL
  const url = new URL(request.url);
  const token = url.searchParams.get("q");
  // Check if the token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Verify the token
  const res = await verifyToken(token);
  if (res.message !== "success") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If token is valid, allow the request to proceed
  return NextResponse.next();
}
export const config = {
  matcher: "/admin/:path*",
};
