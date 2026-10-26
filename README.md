# Alify Lopes

Portfólio PT/EN de Alify Lopes, engenheiro de IA e software em São Paulo.

- Site: https://devalify.github.io/devalify/
- Cases: https://github.com/DevAlify/engineering-cases
- WhatsApp: https://wa.me/5511973397668

## Desenvolvimento

Node.js 24 recomendado. Instale as dependências com `npm ci`.

```sh
npm run dev         # http://localhost:3000/devalify/
npm run typecheck
npm run lint        # políticas de código, sem dependência de ESLint
npm test            # idioma, terminal, corredor e relógio dos efeitos
npm run build       # exportação estática em out/
node lib/preview.mjs # http://127.0.0.1:4173/devalify/
```

Next.js 16, App Router, TypeScript, GSAP e Three.js via npm. Todas as fontes
usam `next/font/local`; não há CDN nem download de fontes durante o build.
O workflow Pages publica `out/` em pushes para `main`.

## Estrutura e fidelidade

- `app/`: página, metadados, fontes locais e 404.
- `components/content/`: conteúdo revisado PT/EN, dividido por seção e case.
- `components/effects/`: retrato WebGL, fallback semântico e túnel canvas.
- `lib/motion/`: scroll, contadores, cursor e corredor 3D.
- `styles/`: CSS D2 preservado e valores extraídos para tokens.
- `public/`: foto recortada original, fontes woff2, Open Graph e favicon AL_.

A referência aprovada é `direcao-d2-cyberpunk.html`, nas decisões pessoais
de 23/10/2026. A composição, os recortes HUD, cores, fontes e os textos
revisados do site anterior foram preservados. Não havia shadcn configurado;
shadcn e o catálogo 21st.dev foram consultados. Os componentes específicos
do D2 reutilizam a estrutura existente, sem adicionar biblioteca.

No desktop, GSAP ScrollTrigger coordena entradas, wipes e corredor 3D.
No mobile, IntersectionObserver dispara reveals, contadores e barras;
o túnel e o retrato permanecem animados com resolução reduzida e 30 fps.
Superfícies fora da viewport e abas ocultas suspendem os loops canvas.
`prefers-reduced-motion` mantém o retrato estático e o conteúdo legível.

O idioma inicial segue o navegador; PT/EN persiste quando localStorage está
disponível. O terminal abre pelo botão ou Alt+~, fecha com Escape e aceita
`help`, `whoami`, `stack`, `cases`, `timeline`, `edu`, `contact`, `clear`, `exit`.

## Verificação visual

`node lib/browser-check.mjs` verifica o export com Chrome isolado via CDP
na porta 9333 e o preview na porta 4173. Usa 375, 390 e 1440 px, testa idioma,
flip, terminal, foco, túnel animado e movimento reduzido. Capturas locais
ficam em `lib/.qa/`, ignorado pelo Git. O Chrome deve ser iniciado com um
perfil exclusivo; nunca conecte esse teste ao perfil de uso pessoal.

## Status

- Feito: migração Next.js, conteúdo PT/EN, D2, efeitos, export e workflow Pages.
- Em andamento: nenhuma implementação pendente.
- Travado: nada.
- Próximo passo: revisão cruzada pela ponte e publicação pelo fluxo do repositório.
