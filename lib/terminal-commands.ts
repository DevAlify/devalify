import type { Language } from './locale.ts';

export type TerminalResult =
  | { type: 'output' | 'error'; text: string }
  | { type: 'clear' | 'exit' | 'noop'; text?: undefined };

const WHATSAPP = 'https://wa.me/5511973397668';
const CASES = 'github.com/DevAlify/engineering-cases';

export const TERMINAL_INTRO: Record<Language, string> = {
  pt: 'terminal de Alify Lopes. digite help.',
  en: 'Alify Lopes terminal. type help.',
};

const lines = (...rows: string[]) => rows.join('\n');

const ANSWERS = {
  help: {
    pt: 'comandos: help, whoami, stack, cases, timeline, edu, contact, clear, exit. atalho: Alt+~',
    en: 'commands: help, whoami, stack, cases, timeline, edu, contact, clear, exit. shortcut: Alt+~',
  },
  whoami: {
    pt: 'Alify Lopes, engenheiro de IA e software. São Paulo, SP. Em tecnologia desde 2017. Cofundador e CTO da syphrax.',
    en: 'Alify Lopes, AI and software engineer. São Paulo, SP. In tech since 2017. Co-founder and CTO at syphrax.',
  },
  stack: {
    pt: lines(
      'IA: agentes e multiagente, Anthropic Claude, OpenAI, Google Gemini, LangGraph, Fine-tuning, A2A, Vercel AI SDK, tool calling, MCP, RAG, Embeddings, pgvector, ChromaDB, Zod, evals, guardrails, human-in-the-loop, engenharia de prompt, Claude Code',
      'Linguagens: TypeScript, JavaScript, Python, SQL, Java 21, PowerShell, C# (leitura)',
      'Backend: Node.js, Fastify, Spring Boot, Prisma, FastAPI, Django, REST, OpenAPI, webhooks idempotentes, JWT e OTP, pg-boss, Lambda e API Gateway',
      'Dados: PostgreSQL, SQL Server, modelagem relacional, CTEs e window functions, cross-database, índices, migrations, Elasticsearch, Power BI',
      'Frontend: React, Next.js, TypeScript, Tailwind CSS, TanStack Query, Vite, GSAP, Three.js, i18n',
      'Cloud: AWS, Docker, Coolify, Traefik, Cloudflare, GitHub Actions, Vercel, Git',
      'Qualidade: Vitest, Playwright, gitleaks, npm audit, Semgrep, testes de segurança, RBAC e TOTP, multi-tenant, LGPD, code review, ADRs',
    ),
    en: lines(
      'AI: agents and multi-agent, Anthropic Claude, OpenAI, Google Gemini, LangGraph, fine-tuning, A2A, Vercel AI SDK, tool calling, MCP, RAG, embeddings, pgvector, ChromaDB, Zod, evals, guardrails, human-in-the-loop, prompt engineering, Claude Code',
      'Languages: TypeScript, JavaScript, Python, SQL, Java 21, PowerShell, C# (reading)',
      'Backend: Node.js, Fastify, Spring Boot, Prisma, FastAPI, Django, REST, OpenAPI, idempotent webhooks, JWT and OTP, pg-boss, Lambda and API Gateway',
      'Data: PostgreSQL, SQL Server, relational modeling, CTEs and window functions, cross-database, indexes, migrations, Elasticsearch, Power BI',
      'Frontend: React, Next.js, TypeScript, Tailwind CSS, TanStack Query, Vite, GSAP, Three.js, i18n',
      'Cloud: AWS, Docker, Coolify, Traefik, Cloudflare, GitHub Actions, Vercel, Git',
      'Quality: Vitest, Playwright, gitleaks, npm audit, Semgrep, security testing, RBAC and TOTP, multi-tenant, LGPD, code review, ADRs',
    ),
  },
  cases: {
    pt: lines(
      '1) agente de suporte: MCP somente leitura, 31 consultas, 430+ testes, 51 evals',
      '2) Argos, revisor de PR com LLM: 198 testes, 2 contêineres isolados',
      '3) ERP syphrax: 15 módulos, 68 tabelas, ~2.240 testes, 8 integrações',
      '4) Genoma: ERP instalado na infraestrutura do cliente, produto validado',
      '5) agente de currículo sob medida: Codex redige, Claude revisa',
      `todos os cases: ${CASES}`,
    ),
    en: lines(
      '1) support agent: read-only MCP, 31 queries, 430+ tests, 51 evals',
      '2) Argos, LLM PR reviewer: 198 tests, 2 isolated containers',
      '3) syphrax ERP: 15 modules, 68 tables, ~2,240 tests, 8 integrations',
      "4) Genoma: ERP installed on the customer's infrastructure, validated product",
      '5) tailored resume agent: Codex drafts, Claude reviews',
      `all cases: ${CASES}`,
    ),
  },
  timeline: {
    pt: lines(
      '09/2026 a hoje  Cofundador e CTO, syphrax',
      '07/2026 a 09/2026  Engenheiro de IA, GE Finance',
      '08/2025 a 06/2026  Sustentação Sênior, GE Finance',
      '01/2025 a 06/2025  Full Stack Java, WTEAM',
      '2017 a 2024  Arcólor Brasil, de Jovem Aprendiz a responsável técnico',
    ),
    en: lines(
      '09/2026 to present  Co-founder and CTO, syphrax',
      '07/2026 to 09/2026  AI Engineer, GE Finance',
      '08/2025 to 06/2026  Senior Support, GE Finance',
      '01/2025 to 06/2025  Full Stack Java, WTEAM',
      '2017 to 2024  Arcólor Brasil, from IT Apprentice to technical lead',
    ),
  },
  edu: {
    pt: lines(
      'Tecnólogo em Análise e Desenvolvimento de Sistemas, Faculdade Impacta, 2020 a 2021',
      'Full Stack (240h), Udemy; Java Programmer I a III (100h), Impacta; Java Elite, UNIPDS (interrompida)',
    ),
    en: lines(
      'Associate Degree in Systems Analysis and Development, Faculdade Impacta, 2020 to 2021',
      'Full Stack (240h), Udemy; Java Programmer I to III (100h), Impacta; Java Elite, UNIPDS (not completed)',
    ),
  },
  contact: {
    pt: lines(
      `whatsapp: ${WHATSAPP}`,
      'e-mail: alify.alves@hotmail.com',
      'linkedin: linkedin.com/in/alify-silva',
      'github: github.com/DevAlify',
      'currículo sob pedido: peça pelo WhatsApp ou por e-mail',
    ),
    en: lines(
      `whatsapp: ${WHATSAPP}`,
      'e-mail: alify.alves@hotmail.com',
      'linkedin: linkedin.com/in/alify-silva',
      'github: github.com/DevAlify',
      'resume on request: ask via WhatsApp or e-mail',
    ),
  },
} satisfies Record<string, Record<Language, string>>;

export const COMMANDS = [...Object.keys(ANSWERS), 'clear', 'exit'] as const;

const isAnswer = (name: string): name is keyof typeof ANSWERS => Object.hasOwn(ANSWERS, name);

export function runCommand(input: string, language: Language): TerminalResult {
  const raw = input.trim();
  const name = raw.toLowerCase();
  if (!name) return { type: 'noop' };
  if (name === 'clear') return { type: 'clear' };
  if (name === 'exit') return { type: 'exit' };
  if (isAnswer(name)) return { type: 'output', text: ANSWERS[name][language] };
  return { type: 'error', text: language === 'en' ? `command not found: ${raw}. try help.` : `comando não encontrado: ${raw}. tente help.` };
}
