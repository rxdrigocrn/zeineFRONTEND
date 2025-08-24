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

## 🚩 Começando

### 1️⃣ Clone o projeto e instale as dependências

```bash
git clone https://github.com/_SEU_USUARIO_/_SEU_REPO_.git
cd SEU_REPO
npm install
# ou
yarn
# ou
pnpm install
```

### 2️⃣ Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# JWT secret
JWT_SECRET=SUA_CHAVE_SECRETA

# API backend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> ⚠️ **Nunca faça commit do `.env.local` com secrets reais.**  
> Use o `.env.example` como referência.

### 3️⃣ Configuração do `next.config.js`

Para permitir imagens locais e remotas, adicione/crie o arquivo `next.config.js`:

```js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        JWT_SECRET_KEY: process.env.JWT_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'HOST_PRODUCAO',
                port: '',
                pathname: '/uploads/',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/',
            },
        ],
    },
};

export default nextConfig;
```

> ⚠️ Este arquivo não vem por padrão no Next.js. É necessário criá-lo manualmente.

### 4️⃣ Rodando o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
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

- O backend deve estar rodando (`localhost:5000` ou remoto) para login, cadastro e uploads funcionarem.
- Imagens carregadas via API devem estar incluídas em `remotePatterns` do `next.config.js`.
- Use `.env.example` como referência de variáveis de ambiente.
- **Fonts:** DM Sans para títulos e Poppins para textos podem ser configuradas em `globals.css` ou via `next/font/google`.

---



