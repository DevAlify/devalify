// postcss.config.js
export default {
    plugins: {
        '@tailwindcss/postcss': {}, // <-- AGORA ESTÁ CORRETO PARA A V4
        'autoprefixer':{}
        
        // autoprefixer: {}, // Remova esta linha, pois o @tailwindcss/postcss já lida com ele
    },
};