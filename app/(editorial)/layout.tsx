import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../../styles/portfolio.css';
import '../../styles/content.css';
import { EDITORIAL_TEXTS } from '../../lib/page-texts';
import { ROUTES, THEME, pageMetadata } from '../../lib/site';

const display = localFont({ src: '../../public/fonts/bricolage-grotesque-latin-wght-normal.woff2', variable: '--font-display', display: 'swap', weight: '200 800' });
const mono = localFont({ src: '../../public/fonts/jetbrains-mono-latin-wght-normal.woff2', variable: '--font-mono', display: 'swap', weight: '100 800' });

export const metadata: Metadata = pageMetadata(ROUTES.editorial, EDITORIAL_TEXTS);
export const viewport: Viewport = { themeColor: THEME.editorial };

export default function EditorialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: "if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim')}" }} /></head>
    <body>{children}</body>
  </html>;
}
