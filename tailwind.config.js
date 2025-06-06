// tailwind.config.js
import { defineConfig } from 'tailwindcss';

export default defineConfig({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,html,css}', // Crucial para o Tailwind encontrar suas classes
    ],
    theme: {
        extend: {
            fontFamily: {
                nurom: ['Nurom', 'sans-serif'], // "Nurom" aqui deve corresponder ao font-family no @font-face
                helvetica: ['Helvetica', 'sans-serif'], // "Helvetica" aqui deve corresponder ao font-family no @font-face
                
            },

        },
    },
    plugins: [],
});