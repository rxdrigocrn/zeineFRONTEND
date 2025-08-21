import { Poppins, DM_Sans } from 'next/font/google';

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
});

export const dm_sans = DM_Sans({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-dm-sans',
    display: 'swap',
});
