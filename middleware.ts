// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const path = request.nextUrl.pathname;
 
    if (
        path.startsWith('/cover.jpg') ||
        path.startsWith('/Logo.svg') ||
        path.startsWith('/logo.svg') ||
        path.startsWith('/LogoSemTexto.svg') ||
        path.startsWith('/api/auth') ||
        path.match(/\.(png|jpe?g|svg|gif|ico|webp)$/)
    ) {
        return NextResponse.next();
    }

    if (path.startsWith('/login') || path.startsWith('/register')) {
        if (token) {
            try {
                if (!SECRET_KEY) throw new Error('Chave secreta JWT não configurada!');
                const secret = new TextEncoder().encode(SECRET_KEY);
                await jwtVerify(token, secret);
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } catch {
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        if (!SECRET_KEY) throw new Error('Chave secreta JWT não configurada!');
        const secret = new TextEncoder().encode(SECRET_KEY);
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (error) {
        console.error('Falha na verificação do JWT:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image).*)'],
};
