import type { Metadata, Viewport } from 'next';
import nextConfig from '../next.config';
import type { PageTexts } from './page-texts';

export const basePath = nextConfig.basePath ?? '';
export const SITE_URL = 'https://devalify.github.io/devalify';
export const WHATSAPP_URL = 'https://wa.me/5511973397668';
export const CASES_REPO = 'https://github.com/DevAlify/engineering-cases';
/** Browser theme colors per route family (metadata cannot read CSS variables). */
export const THEME = { neon: '#03050b', editorial: '#0f0f11' } as const;

export const ROUTES = { choice: '/', immersive: '/imersivo/', editorial: '/editorial/' } as const;

/** Internal href, prefixed with the deployment base path. */
export const href = (route: string) => `${basePath}${route}`;

export const caseUrl = (slug: string) => `${CASES_REPO}/blob/main/cases/${slug}.md`;

/** Per-route metadata: canonical and og:url always point at the route itself. Server output is Portuguese. */
export function pageMetadata(route: string, texts: PageTexts): Metadata {
  const url = `${SITE_URL}${route}`;
  const { title, description, og } = texts.pt;
  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title,
    description,
    authors: [{ name: 'Alify Lopes' }],
    alternates: { canonical: url },
    icons: { icon: href('/favicon.svg') },
    openGraph: {
      type: 'website', siteName: 'Alify Lopes', title, description: og, url,
      locale: 'pt_BR', alternateLocale: ['en_US'],
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: 'AL Alify Lopes, engenheiro de IA e software' }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export const neonViewport: Viewport = { themeColor: THEME.neon, colorScheme: 'dark', viewportFit: 'cover' };
