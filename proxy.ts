import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  console.log("✅ middleware ishladi.", request.cookies.get("authjs.session-token"));
  // return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/about/:path*", "/((?!api|_next/static|_next/image|favicon.ico|dashboard).*)"],
};
