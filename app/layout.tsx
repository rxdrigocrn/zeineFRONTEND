// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { AppInitializer } from '../components/AppInitializer';
import { poppins, dm_sans } from '../lib/fonts';

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
      <body>
        <AppInitializer />
        {children}
      </body>
    </html>
  );
}