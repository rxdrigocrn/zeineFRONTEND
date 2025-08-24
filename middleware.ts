// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function middleware(request: NextRequest) {
    // O nome do cookie deve ser EXATAMENTE 'access_token'
    const token = request.cookies.get('access_token')?.value;

    // Se não há token, redireciona para o login
    if (!token) {
        // Permite acesso às rotas de login/registro mesmo sem token
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }


    // Se o token existe, verifica sua validade
    try {
        if (!SECRET_KEY) {
            throw new Error('Chave secreta JWT não configurada!');
        }

        // Converte a chave para o formato que a 'jose' espera
        const secret = new TextEncoder().encode(SECRET_KEY);

        // Verifica o token. Se for inválido, vai pular para o CATCH.
        await jwtVerify(token, secret);

        // Se o usuário está logado e tenta acessar /login, redireciona para o dashboard
        if (request.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // Token válido, deixa a requisição continuar
        return NextResponse.next();

    } catch (error) {
        console.error('Falha na verificação do JWT:', error);
        // Token inválido/expirado, redireciona para o login e limpa o cookie
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