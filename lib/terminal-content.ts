const WA = "https://wa.me/5511973397668";
const CASES = "github.com/DevAlify/engineering-cases";

export const terminalContent = {
    pt:{hello:'terminal de Alify Lopes. digite help.',nf:function(v: string){return 'comando não encontrado: '+v+'. tente help.'},ph:'digite help',prompt:'alify@syphrax:~$ (Esc fecha)',close:'Fechar terminal',lab:'Comando',skip:'clique ou Esc para pular',
      help:'comandos: help, whoami, stack, cases, timeline, edu, contact, clear, exit. atalho: Alt+~',
      whoami:'Alify Lopes, engenheiro de IA e software. São Paulo, SP. Em tecnologia desde 2017. Cofundador e CTO da syphrax.',
      stack:'IA: Claude, MCP, RAG, evals, guardrails\nBackend: Node.js, Fastify, Spring Boot, pg-boss\nDados: PostgreSQL, SQL Server, Elasticsearch\nFrontend: Next.js, React, TypeScript, GSAP\nCloud: AWS, Docker, Coolify, Cloudflare\nQualidade: Vitest, Playwright, gitleaks, Semgrep',
      cases:'1) agente de suporte: MCP somente leitura, 31 consultas, 430+ testes, 51 evals\n2) Argos, revisor de PR com LLM: 198 testes, 2 contêineres isolados\n3) ERP syphrax: 15 módulos, 68 tabelas, ~2.240 testes, 8 integrações\n4) Genoma: ERP instalado na infraestrutura do cliente, 8 módulos\n5) agente de currículo sob medida: Codex redige, Claude revisa\ntodos os cases: '+CASES,
      timeline:'09/2026 a hoje  Cofundador e CTO, syphrax\n07/2026 a 09/2026  Engenheiro de IA, GE Finance\n08/2025 a 06/2026  Sustentação Sênior, GE Finance\n01/2025 a 06/2025  Full Stack Java, WTEAM\n2017 a 2024  Arcólor Brasil, de Jovem Aprendiz a responsável técnico',
      edu:'Tecnólogo em Análise e Desenvolvimento de Sistemas, Faculdade Impacta, 2020 a 2021\nFull Stack (240h), Udemy; Java Programmer I a III (100h), Impacta; Java Elite, UNIPDS (interrompida)',
      contact:'whatsapp: '+WA+'\ne-mail: alify.alves@hotmail.com\nlinkedin: linkedin.com/in/alify-silva\ngithub: github.com/DevAlify\ncurrículo sob pedido: peça pelo WhatsApp ou por e-mail'},
    en:{hello:"Alify Lopes's terminal. type help.",nf:function(v: string){return 'command not found: '+v+'. try help.'},ph:'type help',prompt:'alify@syphrax:~$ (Esc closes)',close:'Close terminal',lab:'Command',skip:'click or Esc to skip',
      help:'commands: help, whoami, stack, cases, timeline, edu, contact, clear, exit. shortcut: Alt+~',
      whoami:'Alify Lopes, AI and software engineer. São Paulo, Brazil. In tech since 2017. Co-founder and CTO at syphrax.',
      stack:'AI: Claude, MCP, RAG, evals, guardrails\nBackend: Node.js, Fastify, Spring Boot, pg-boss\nData: PostgreSQL, SQL Server, Elasticsearch\nFrontend: Next.js, React, TypeScript, GSAP\nCloud: AWS, Docker, Coolify, Cloudflare\nQuality: Vitest, Playwright, gitleaks, Semgrep',
      cases:'1) support agent: read-only MCP, 31 queries, 430+ tests, 51 evals\n2) Argos, LLM PR reviewer: 198 tests, 2 isolated containers\n3) syphrax ERP: 15 modules, 68 tables, ~2,240 tests, 8 integrations\n4) Genoma: ERP installed on the customer infrastructure, 8 modules\n5) tailored resume agent: Codex drafts, Claude reviews\nall cases: '+CASES,
      timeline:'09/2026 to present  Co-founder and CTO, syphrax\n07/2026 to 09/2026  AI Engineer, GE Finance\n08/2025 to 06/2026  Senior Support Analyst, GE Finance\n01/2025 to 06/2025  Full Stack Java, WTEAM\n2017 to 2024  Arcólor Brasil, from IT apprentice to technical lead',
      edu:'Associate Degree in Systems Analysis and Development, Faculdade Impacta, 2020 to 2021\nFull Stack (240h), Udemy; Java Programmer I to III (100h), Impacta; Java Elite, UNIPDS (not completed)',
      contact:'whatsapp: '+WA+'\ne-mail: alify.alves@hotmail.com\nlinkedin: linkedin.com/in/alify-silva\ngithub: github.com/DevAlify\nresume on request: ask on WhatsApp or by e-mail'}
  };

export type PortfolioLanguage = keyof typeof terminalContent;
