import type { Metadata } from 'next';
import '../styles/not-found.css';
import { href } from '../lib/site';

export const metadata: Metadata = { title: 'Página não encontrada | Alify Lopes', robots: { index: false }, icons: { icon: href('/favicon.svg') } };

// Several root layouts exist (one per route), so the 404 renders its own document.
export default function GlobalNotFound() {
  return <html lang="pt-BR">
    <body>
      <main className="wrap not-found"><span className="lbl">404</span><h1>Página não encontrada</h1><p>Page not found.</p><a className="btn" href={href('/')}>Voltar ao início / Back to home</a></main>
    </body>
  </html>;
}
