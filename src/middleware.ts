import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ['/dashboard']

export function middleware(request: NextRequest){
    const isProtected = protectedRoutes.some((path)=>
    request.nextUrl.pathname.startsWith(path)
    )

    const isLoggedIn = request.cookies.get('admin_auth')?.value === 'true'

    if(isProtected && !isLoggedIn){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    return NextResponse.next()
}