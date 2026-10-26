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
npm test            # idioma, contadores e política de movimento
npm run build       # exportação estática em out/
node lib/preview.mjs # http://127.0.0.1:4173/devalify/
```

Next.js 16, App Router, TypeScript e GSAP via npm. Todas as fontes
usam `next/font/local`; não há CDN nem download de fontes durante o build.
O workflow Pages publica `out/` em pushes para `main`.

## Estrutura e fidelidade

- `app/`: página, metadados, fontes locais e 404.
- `components/content/`: conteúdo revisado PT/EN de stack, números e formação.
- `components/direction-b/`: hero, cases, trajetória, contato e movimento.
- `lib/motion-policy.ts`: política de movimento desktop, mobile e reduzido.
- `styles/`: transcrição do CSS aprovado e tokens locais.
- `public/`: foto alify-b recortada, fontes woff2, Open Graph e favicon.

A referência visual é `direcao-b.html` (Monograma), aprovada em 26/10/2026.
O CSS do mockup foi transcrito, com os valores extraídos para tokens.
Bricolage Grotesque Variable e JetBrains Mono são servidas localmente.
Os textos, números e links revisados do site anterior foram preservados.
Não havia shadcn configurado. O catálogo 21st.dev foi consultado; os
componentes encontrados não correspondem ao mockup e exigem estruturas
extras. A implementação reutiliza o conteúdo e GSAP existentes, sem nova biblioteca.

GSAP ScrollTrigger coordena nome mascarado, monograma desenhado, retrato
com máscara e passagem de grayscale para cor, progresso, contadores e anos.
No desktop, os cinco cases têm pan horizontal pinado e detalhes completos
com rolagem interna acessível. No mobile, ficam empilhados; os demais
movimentos continuam ativos com menos parallax. Sem JavaScript os cases
também ficam empilhados e o conteúdo permanece visível.
`prefers-reduced-motion` usa fades de 200 ms, sem pin ou parallax.

O idioma inicial segue o navegador; PT/EN persiste quando localStorage está
disponível. O terminal foi removido para seguir a composição minimalista B,
junto de preloader, HUD, túnel e retrato WebGL. Three.js não é importado.

## Verificação visual

`node lib/browser-check-b.mjs` verifica o export com Chrome isolado via CDP
na porta 9333 e o preview na porta 4173. Usa 375 e 1440 px e testa idioma,
overflow, foco nos cases, anos, conteúdo sem JS e movimento reduzido. Capturas locais
ficam em `lib/.qa/`, ignorado pelo Git. O Chrome deve ser iniciado com um
perfil exclusivo; nunca conecte esse teste ao perfil de uso pessoal.

## Status

- Feito: direção B, conteúdo PT/EN, foto alify-b, animações e export estático.
- Em andamento: nenhuma implementação pendente.
- Travado: nada.
- Próximo passo: revisão cruzada pela ponte e publicação pelo fluxo do repositório.
