import localFont from 'next/font/local';

// Fonts of the neon palette, shared by the selection page and the immersive route.
// Kept in one module so both routes load one shared CSS chunk, and the choice-only font stays out of it.
export const anybody = localFont({ src: '../public/fonts/anybody-latin-wdth-normal.woff2', variable: '--font-anybody', display: 'swap', weight: '100 900', declarations: [{ prop: 'font-stretch', value: '50% 150%' }] });
export const hubot = localFont({ src: '../public/fonts/hubot-sans-latin-wdth-normal.woff2', variable: '--font-hubot', display: 'swap', weight: '200 900', declarations: [{ prop: 'font-stretch', value: '75% 125%' }] });
export const jetbrains = localFont({ src: '../public/fonts/jetbrains-mono-latin-wght-normal.woff2', variable: '--font-jetbrains', display: 'swap', weight: '100 800' });
