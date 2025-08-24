// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;

    if (!token) {
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }


    try {
        if (!SECRET_KEY) {
            throw new Error('Chave secreta JWT não configurada!');
        }

        const secret = new TextEncoder().encode(SECRET_KEY);

        await jwtVerify(token, secret);

        if (request.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        console.error('Falha na verificação do JWT:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        return response;
    } finally {
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
            return NextResponse.next();
        }
    }


}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};