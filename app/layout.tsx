import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/portfolio.css';

const display = localFont({ src: '../public/fonts/orbitron-latin-wght-normal.woff2', variable: '--font-display', display: 'swap', weight: '400 900' });
const body = localFont({ src: [
  { path: '../public/fonts/chakra-petch-latin-400-normal.woff2', weight: '400' },
  { path: '../public/fonts/chakra-petch-latin-500-normal.woff2', weight: '500' },
  { path: '../public/fonts/chakra-petch-latin-600-normal.woff2', weight: '600' },
], variable: '--font-body', display: 'swap' });
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
    images: [{ url: 'https://devalify.github.io/devalify/og.png', width: 1200, height: 630, alt: 'AL_ Alify Lopes, engenheiro de IA e software' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#04050c' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning><body>{children}</body></html>;
}
