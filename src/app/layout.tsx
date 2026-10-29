import type { Metadata } from 'next';
import { Fira_Code, Noto_Serif, Open_Sans } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import { THEME_INIT_SCRIPT } from '@/utils/theme';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Merc1 Plataforma', template: '%s · Merc1 Plataforma' },
  description: 'Formação e soluções prontas de IA para corretores de imóveis.',
  icons: { icon: '/merc1-symbol.svg' },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${openSans.variable} ${notoSerif.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica o tema salvo antes da pintura para não piscar claro → escuro. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
