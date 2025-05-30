/*import { NextResponse } from "next/server";

export function middleware(request) {
  //console.log(request);

  //redirect
  return NextResponse.redirect(new URL("/about", request.url));
}*/

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

//need matcher, otherwise, infinite loop
export const config = {
  matcher: ["/account", "/cabins"],
};
