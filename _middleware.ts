// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    const { pathname } = request.nextUrl;

    // 👇 Trata a raiz `/`
    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/home', request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (token) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    if (!token) {
        if (pathname !== '/login' && pathname !== '/register') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
