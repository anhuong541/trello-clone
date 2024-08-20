import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "./constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { server } from "./lib/network";
import { removeSession } from "./actions/auth-action";

const protectedRoutes = [HOME_ROUTE];
const routesBanWhenUserSignin = ["/login", "/register", ROOT_ROUTE];

export const checkJwtExpire = async (token: string) => {
  try {
    return await server.get("/user/token-verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("check jwt expire error");
    return error;
  }
};

export async function middleware(request: NextRequest) {
  const tokenSession = request.cookies.get(SESSION_COOKIE_NAME)?.value || null;
  const firstParam = "/" + request.nextUrl.pathname.split("/")[1];
  console.log("run middleware!", tokenSession);
  if (tokenSession) {
    console.log("middleware! is running");
    const checkToken = (await checkJwtExpire(tokenSession)) as any;
    // const checkToken: any = null;
    if (!checkToken) {
      return;
    }

    if (
      checkToken?.response?.status === 403 &&
      protectedRoutes.includes(firstParam)
    ) {
      console.log("User didn't active !!!");
      removeSession();
      const absoluteURL = new URL("/active", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (
      checkToken?.response?.status === 401 &&
      protectedRoutes.includes(firstParam)
    ) {
      console.log("it token fail!!!");
      removeSession();
      const absoluteURL = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    if (
      checkToken?.status === 200 &&
      routesBanWhenUserSignin.includes(request.nextUrl.pathname)
    ) {
      const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else if (protectedRoutes.includes(firstParam)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/project",
    "/login",
    "/register",
    "/active",
    "/project/:path*",
  ],
};
