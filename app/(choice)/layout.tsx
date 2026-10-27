import type { Metadata, Viewport } from 'next';
import '../../styles/tokens-neon.css';
import { anybody, hubot, jetbrains } from '../fonts-neon';
import '../../styles/choice.css';
import { headScript } from '../../lib/head-script';
import { CHOICE_TEXTS } from '../../lib/page-texts';
import { ROUTES, neonViewport, pageMetadata } from '../../lib/site';

export const metadata: Metadata = pageMetadata(ROUTES.choice, CHOICE_TEXTS);
export const viewport: Viewport = neonViewport;

export default function ChoiceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${anybody.variable} ${hubot.variable} ${jetbrains.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: headScript() }} /></head>
    <body>{children}</body>
  </html>;
}
