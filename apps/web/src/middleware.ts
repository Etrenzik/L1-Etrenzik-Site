import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Authentication + security middleware for the litigation workspace.
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 *
 * Protects all routes except /login and static assets.
 * Uses Cloudflare Access headers when behind CF Zero Trust,
 * or falls back to a session cookie check.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets and login page through
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Option 1: Cloudflare Access / Zero Trust header (preferred)
  const cfAccessJWT = request.headers.get("cf-access-jwt-assertion");

  // Option 2: Session cookie fallback
  const sessionToken = request.cookies.get("session_token")?.value;

  if (!cfAccessJWT && !sessionToken) {
    // No auth — redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Attach security headers to every response
  const response = NextResponse.next();
  response.headers.set(
    "X-Disclaimer",
    "DRAFT WORK PRODUCT — NOT LEGAL ADVICE"
  );
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
