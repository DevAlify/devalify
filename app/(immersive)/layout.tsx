import type { Metadata, Viewport } from 'next';
import '../../styles/tokens-neon.css';
import { anybody, hubot, jetbrains } from '../fonts-neon';
import '../../styles/immersive.css';
import { headScript } from '../../lib/head-script';
import { IMMERSIVE_TEXTS } from '../../lib/page-texts';
import { ROUTES, neonViewport, pageMetadata } from '../../lib/site';

export const metadata: Metadata = pageMetadata(ROUTES.immersive, IMMERSIVE_TEXTS);
export const viewport: Viewport = neonViewport;

export default function ImmersiveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${anybody.variable} ${hubot.variable} ${jetbrains.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: headScript({ arrive: true, motionPref: true }) }} /></head>
    <body>{children}</body>
  </html>;
}
