// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export const metadata: Metadata = {
  title: 'Market Place',
  description: 'Market Place - A place to buy and sell products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-shape-base">
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}