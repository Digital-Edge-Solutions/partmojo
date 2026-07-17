import { NextResponse } from "next/server";

// Root-only: send visitors to the right region. Default is UK; US visitors are auto-routed to /us.
export const config = { matcher: "/" };

export function middleware(request) {
  const country = request.geo?.country; // populated by Vercel edge in production
  const dest = country === "US" ? "/us" : "/uk"; // UK is the default for everyone else
  return NextResponse.redirect(new URL(dest, request.url));
}
