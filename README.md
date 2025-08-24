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

- O backend deve estar rodando (`localhost:5000` ou remoto) para login, cadastro e uploads funcionarem.
- Imagens carregadas via API devem estar incluídas em `remotePatterns` do `next.config.js`.
- Use `.env.example` como referência de variáveis de ambiente.
- **Fonts:** DM Sans para títulos e Poppins para textos podem ser configuradas em `globals.css` ou via `next/font/google`.

---



