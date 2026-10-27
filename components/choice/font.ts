import localFont from 'next/font/local';

// Used only by the selection page. It is loaded from the page tree (not the layout) so the CSS chunk the
// immersive route shares with this page never carries it, nor its preload.
export const bricolage = localFont({ src: '../../app/fonts/bricolage-grotesque-latin-wght-normal.woff2', variable: '--font-bricolage', display: 'swap', weight: '200 800' });
