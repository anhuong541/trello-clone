import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "./constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { removeSession } from "./actions/auth-action";
import axios from "axios";

const protectedRoutes = [HOME_ROUTE];
const routesBanWhenUserSignin = ["/login", "/register", "/active", ROOT_ROUTE];

export const checkJwtExpire = async (token: string) => {
  try {
    return await axios.get(
      `https://trello-clone-backend-lake.vercel.app/user/token-verify`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log("check jwt expire error");
    return error;
  }
};

export async function middleware(request: NextRequest) {
  const tokenSession = request.cookies.get(SESSION_COOKIE_NAME)?.value || null;
  const firstParam = "/" + request.nextUrl.pathname.split("/")[1];
  console.log("start middleware");
  if (tokenSession) {
    console.log("middleware! is running");
    const checkToken = (await checkJwtExpire(tokenSession)) as any;

    console.log("check!!!", checkToken?.status, request.nextUrl.pathname);

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
      routesBanWhenUserSignin.includes(firstParam)
    ) {
      console.log("go go go!!!");
      const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else if (protectedRoutes.includes(firstParam)) {
    console.log("token is null", tokenSession);
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
