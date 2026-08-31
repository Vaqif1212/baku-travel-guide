import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Forwards the request path so the root layout can set the correct
// <html lang="..."> for /, /az and /en (Next.js can't read the current
// route from a Server Component otherwise, since layout.tsx is shared
// across all three locale routes).
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
