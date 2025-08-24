import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const path = request.nextUrl.pathname;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    console.log('JWT token recebido:', token);

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

    if (!SECRET_KEY) throw new Error('Chave secreta JWT não configurada!');

    if (path.startsWith('/login') || path.startsWith('/register')) {
        if (token) {
            try {
                await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
                return NextResponse.redirect(new URL('/dashboard', request.url), 308);
            } catch {
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url), 308);
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
        return NextResponse.next();
    } catch (error) {
        console.error('Falha na verificação do JWT:', error);
        const response = NextResponse.redirect(new URL('/login', request.url), 308);
        response.cookies.delete('access_token');
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image).*)'],
};
