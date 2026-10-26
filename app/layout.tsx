import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/portfolio.css';
import '../styles/content.css';

const display = localFont({ src: '../public/fonts/bricolage-grotesque-latin-wght-normal.woff2', variable: '--font-display', display: 'swap', weight: '200 800' });
const mono = localFont({ src: '../public/fonts/jetbrains-mono-latin-wght-normal.woff2', variable: '--font-mono', display: 'swap', weight: '100 800' });

export const metadata: Metadata = {
  metadataBase: new URL('https://devalify.github.io/devalify/'),
  title: 'Alify Lopes | Engenheiro de IA e software',
  description: 'Alify Lopes, engenheiro de IA e software em São Paulo. Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.',
  authors: [{ name: 'Alify Lopes' }],
  alternates: { canonical: 'https://devalify.github.io/devalify/' },
  icons: { icon: '/devalify/favicon.svg' },
  openGraph: {
    type: 'website', siteName: 'Alify Lopes',
    title: 'Alify Lopes | Engenheiro de IA e software',
    description: 'Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.',
    url: 'https://devalify.github.io/devalify/', locale: 'pt_BR', alternateLocale: ['en_US'],
    images: [{ url: 'https://devalify.github.io/devalify/og.png', width: 1200, height: 630, alt: 'AL Alify Lopes, engenheiro de IA e software' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0f0f11' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: "if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim')}" }} /></head>
    <body>{children}</body>
  </html>;
}
