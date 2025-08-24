// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { AppInitializer } from '../components/AppInitializer';
import { poppins, dm_sans } from '../lib/fonts';
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
    <html lang="pt-BR" className={`${poppins.variable} ${dm_sans.variable}`}>
      <body className="bg-shape-base">
        <AppInitializer />
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}