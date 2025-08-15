// middleware.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import errorHandler from "./lib/errorHandler";
import { verifyToken, verifyTokenJose } from "./lib/auth";

const PUBLIC_ROUTES = ["/login", "/api/login", "/register", "/api/register"];

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Lewati middleware untuk route publik
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authorization")?.value;

    // Validasi token
    if (!authToken || !authToken.startsWith("Bearer ")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const token = authToken.split(" ")[1];
    const decoded = await verifyTokenJose(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const headers = new Headers(request.headers);
    headers.set("userId", decoded.id);

    return NextResponse.next({
      request: { headers },
    });
  } catch (error) {
    console.error("Middleware error:", error); // Tambahkan logging
    return errorHandler(error);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
