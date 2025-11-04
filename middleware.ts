import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "@/lib/api/serverApi";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = ["/profile", "/notes"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));

  if (!accessToken && refreshToken) {
    try {
      await checkSessionServer();
    } catch {
    }
  }

  if (!request.cookies.get("accessToken")?.value && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.cookies.get("accessToken")?.value && isPublic) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
