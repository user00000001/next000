import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // console.log(`middleware execute when req: ${JSON.stringify(req)}`)
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if(!req.nextUrl.pathname.startsWith("/admin/login")) {
            if(req.cookies.get('admin-token')) {

            } else {
                return NextResponse.redirect(new URL('/admin/login', req.url))
            }
        }
    }
    // return NextResponse.redirect(new URL('/home', req.url))
}

// export const config = {
//     matcher: "/about/:path*",
// }