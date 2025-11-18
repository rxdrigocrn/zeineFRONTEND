# 🚀 Zeine Front-End

Desafio Market Place Zeine.

---

## 🛠 Tecnologias

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zustand**

---

## Deploy

- [Front](https://zeine-frontend.vercel.app)
- [Back](https://zeinebackend.onrender.com)

- OBS:
Este projeto está hospedado em uma instância gratuita do Render. Como explicado pelo próprio Render, servidores gratuitos podem entrar em modo de hibernação após períodos de inatividade.
Isso significa que, se ninguém acessar a aplicação por algum tempo, a primeira requisição após a hibernação pode demorar 50 segundos ou mais para responder, enquanto o servidor “acorda” novamente.
Portanto, atrasos na primeira requisição são normais e fazem parte do funcionamento da instância gratuita.
## 🚩 Começando

### 1️⃣ Clone o projeto e instale as dependências

```bash
git clone https://github.com/rxdrigocrn/zeineFRONTEND.git
cd SEU_REPO
npm install
```

### 2️⃣ Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# JWT secret
JWT_SECRET=SUA_CHAVE_SECRETA

# API backend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> Use o `.env.example` como referência.

### 4️⃣ Rodando o servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.  
A página se atualiza automaticamente conforme você edita os arquivos.

---

## 📂 Estrutura do Projeto

```
/app        # App Router (Roteamento)
/components # Componentes reutilizáveis
/lib        # Funções utilitárias
/public     # Imagens públicas (logos, cover, etc.)
/store      # Gerenciamento global de estados (Zustand)
/types      # Tipos utilizados na aplicação
/hooks      # Hooks personalizados
```

---

## ⚠️ Observações

- rode a migrate 'npx prisma migrate dev'
- O backend deve estar rodando (`localhost:5000` ou remoto) para login, cadastro e uploads funcionarem.
- Imagens carregadas via API devem estar incluídas em `remotePatterns` do `next.config.js`.
- Use `.env.example` como referência de variáveis de ambiente.
- **Fonts:** DM Sans para títulos e Poppins para textos podem ser configuradas em `globals.css` ou via `next/font/google`.
- Login Padrão: { login: admin@teste.com, senha: 123456 }

---

## 👾 Decisões Técnicas

Decisões Técnicas do Front-end

- Next.js com App Router: Escolhido pelo suporte a renderização híbrida (SSR/SSG), modularidade de rotas e facilidade de aplicar layouts e middlewares.

- Zustand para estado global: Biblioteca leve e eficiente, ideal para gerenciar estados compartilhados como autenticação, filtros e dados de usuário, com tipagem TypeScript completa.

- Middleware do Next.js: Utilizado para checagem de autenticação e controle de acesso às rotas privadas, mantendo lógica centralizada e previsível.

- Controle do token no front-end: O token de autenticação é gerenciado no cliente, permitindo persistência de sessão e funcionamento consistente em produção. Caso seja necessário, poderia ser utilizado cookie HTTP-only para maior segurança, pois não é acessível via JavaScript.



