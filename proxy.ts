import { NextRequest, NextResponse } from "next/server";

const COOKIE_HEADER_NAME = "session_token";
const HOME_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://home.pixelsetu.com";

export function proxy(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_HEADER_NAME);

  if (!cookie) {
    return NextResponse.redirect(new URL(HOME_URL));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (Next.js static assets)
     * - _next/image   (Next.js image optimisation)
     * - favicon.ico   (browser favicon)
     * - public folder files (images, fonts, svgs, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|eot)$).*)",
  ],
};
