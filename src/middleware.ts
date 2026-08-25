import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SITE_ORIGIN } from "./app/site";

const PRIMARY_HOST = new URL(SITE_ORIGIN).hostname;
const LEGACY_HOSTS = new Set(["joshuahegstad.org", "www.joshuahegstad.org"]);

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const isDuplicate =
    hostname.endsWith(".vercel.app") || LEGACY_HOSTS.has(hostname);

  if (!isDuplicate) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = PRIMARY_HOST;
  url.port = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};
