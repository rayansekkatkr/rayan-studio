import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { preferredLocaleFromHeader } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/") {
    return NextResponse.next();
  }

  const preferred = preferredLocaleFromHeader(request.headers.get("accept-language"));
  const destination = preferred === "fr" ? "/fr" : "/en";

  return NextResponse.redirect(new URL(destination, request.url));
}

export const config = {
  matcher: ["/"],
};

