# Alify Lopes

**Engenheiro de IA e software** (AI and Software Engineer) em São Paulo. Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.

Site: https://devalify.github.io/devalify/

- Estudos de caso: https://github.com/DevAlify/engineering-cases
- LinkedIn: https://linkedin.com/in/alify-silva
- WhatsApp: https://wa.me/5511973397668

## Sobre este repositório

Site estático (HTML, CSS e JavaScript, sem etapa de build obrigatória), em português e inglês. GSAP 3.12.5 vem de CDN com versão exata e SRI; fontes via jsDelivr. O GitHub Pages serve a raiz da `main`.

```
index.html          conteúdo (PT no HTML, EN em atributos data-en)
src/portfolio.css   estilos e tokens
src/portfolio.js    idioma, animações, terminal (tecla ~)
assets/             foto recortada (webp e avif), og.png, favicon
```

Requer Node.js 20+ apenas para o servidor local e o script de cópia:

```bash
npm run dev     # http://127.0.0.1:4173
npm run check   # verifica a sintaxe do JavaScript
npm run build   # copia o site para dist/
```
