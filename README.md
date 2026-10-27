# Alify Lopes

Portfólio PT/EN de Alify Lopes, engenheiro de IA e software em São Paulo.

- Site: https://devalify.github.io/devalify/
- Cases: https://github.com/DevAlify/engineering-cases
- WhatsApp: https://wa.me/5511973397668

## Rotas

| Rota | O que é |
| --- | --- |
| `/` | Página de escolha: duas metades (Imersivo e Editorial) com divisa inclinada que segue o ponteiro. |
| `/imersivo/` | Direção Imersivo: cyberpunk minimalista, grade em perspectiva, números que atravessam a câmera, terminal (Alt+~). |
| `/editorial/` | Direção Editorial (a direção B aprovada, sem mudança visual). |

As duas direções têm o link discreto "Trocar experiência" na navegação, que volta a `/`. A última experiência
visitada fica no `localStorage`: ao voltar, `/` pré-destaca essa opção e mostra o atalho "Continuar no ...".
Nada redireciona sozinho.

## Desenvolvimento

Node.js 24 recomendado. Instale as dependências com `npm ci`.

```sh
npm run dev         # http://localhost:3000/devalify/
npm run typecheck
npm run lint        # políticas de código, sem dependência de ESLint
npm test            # idioma, preferências, divisa, terminal, script do head e detecção de recurso
npm run build       # exportação estática em out/
node lib/preview.mjs # http://127.0.0.1:4173/devalify/
```

Next.js 16, App Router, TypeScript e GSAP via npm (ScrollTrigger, SplitText, ScrambleText, DrawSVG e Flip).
Todas as fontes usam `next/font/local` a partir de `public/fonts`; não há CDN nem download durante o build.
O workflow Pages publica `out/` em pushes para `main`.

## Estrutura

- `app/(choice)`, `app/(immersive)`, `app/(editorial)`: um root layout por rota (fontes, CSS, script do head e
  metadados próprios; og e canonical apontam para a própria URL). `app/global-not-found.tsx` é o 404, que precisa
  de documento próprio por haver vários root layouts (`experimental.globalNotFound`).
- `components/choice/`: marcação da página de escolha e `motion/` (palco, entrada, saída com Flip, atalho da última escolha).
- `components/immersive/`: marcação do Imersivo, `content/` (textos PT e EN em dados) e `motion/` (cena, herói,
  números, cases, trajetória, tooltips, botão de pausa).
- `components/direction-b/` e `components/content/`: a direção Editorial.
- `components/motion/`: motor da grade em canvas, decodificação de texto, ruído e utilitários de DOM compartilhados.
- `lib/`: lógica pura com testes (`preferences`, `seam`, `terminal-commands`, `head-script`, `feature-support`, `locale`),
  hook de idioma e metadados por rota.
- `styles/`: `tokens-neon.css` (paleta compartilhada), `choice.css`, `immersive.css`, e o CSS da direção Editorial.
- `public/`: foto alify-b (AVIF e WebP), fontes woff2, Open Graph e favicon. O fonte do Open Graph fica em `lib/og-source.html`.

## Fidelidade e movimento

Os mockups aprovados em 26/10/2026 são a especificação visual e de animação:
`Planejamento/portfolio-mockup/escolha/selecao.html` e `imersivo.html`. O CSS foi transcrito com as cores
trocadas por tokens, e as animações são as mesmas (GSAP 3.15).

- O script inline do `<head>` decide o modo antes da hidratação (`anim` ou `reduced`) e o CSS esconde os estados
  iniciais, então não há flash. Se os scripts não chegam, tudo aparece depois de 4 s.
- `prefers-reduced-motion`: sem animação, só fades curtos; a grade vira um quadro parado e o botão de pausa some.
- Botão "pausar movimento" (WCAG 2.2.2): congela a grade e as animações contínuas, e a escolha fica lembrada.
- A grade em canvas pausa fora da viewport, com a aba oculta e com o movimento pausado.
- O retrato usa RGB split por filtros SVG; sem suporte (testado por recurso, não por user agent) cai num
  `drop-shadow` simples.
- Idioma: o servidor renderiza PT e `lib/use-language.ts` troca para EN com `data-en`. O idioma vale nas três rotas.

## Verificação visual

`node lib/browser-check-b.mjs` verifica a rota `/editorial/` com Chrome isolado via CDP na porta 9333 e o preview
na porta 4173 (375 e 1440 px, idioma, overflow, foco nos cases, anos, conteúdo sem JS e movimento reduzido).
O Chrome deve ser iniciado com um perfil exclusivo; nunca conecte esse teste ao perfil de uso pessoal.
`node lib/render-og.mjs` renderiza `lib/og-source.html` em `public/og.png` (1200 x 630) com o mesmo Chrome isolado.

## Status

- Feito: três rotas (`/`, `/imersivo/`, `/editorial/`), EN completo no Imersivo, botão de pausa, última escolha lembrada.
- Em andamento: nenhuma implementação pendente.
- Travado: nada.
- Próximo passo: revisão cruzada e publicação pelo fluxo do repositório.
