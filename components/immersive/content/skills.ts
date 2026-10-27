import { bi, same, type Bi } from './bi.ts';

export type Skill = { label: Bi; tip?: Bi };
export type SkillGroup = { id: string; name: Bi; items: Skill[] };

const s = (label: string | [string, string], tip?: [string, string]): Skill => ({ label: typeof label === 'string' ? same(label) : bi(...label), tip: tip && bi(...tip) });

/** Stack and skills, from the resume. Items with a tip show where each one was used. */
export const SKILL_GROUPS: SkillGroup[] = [
  { id: 'ai', name: bi('IA e LLM', 'AI and LLM'), items: [
    s(['Agentes de IA e sistemas multiagente', 'AI agents and multi-agent systems'], ['Agente N1 e fluxo multiagente de diagnóstico N3 (GE Finance)', 'L1 agent and multi-agent L3 diagnostic workflow (GE Finance)']),
    s('Anthropic Claude'), s('OpenAI'), s('Google Gemini'), s('LangGraph'), s('Fine-tuning'), s('A2A (Agent2Agent)'), s('Vercel AI SDK'), s('Tool calling'),
    s('Model Context Protocol (MCP)', ['Servidor MCP somente leitura, 31 consultas SQL, 430+ testes', 'Read-only MCP server, 31 SQL queries, 430+ tests']),
    s('Retrieval-Augmented Generation (RAG)', ['ChromaDB e depois PostgreSQL/pgvector: fato vem do SQL', 'ChromaDB and then PostgreSQL/pgvector: facts come from SQL']),
    s('Embeddings'), s('pgvector'), s('ChromaDB'), s(['Saída estruturada (Zod)', 'Structured output (Zod)']),
    s('Evals', ['51 casos reais de 545 chamados, 10 selados', '51 real cases from 545 tickets, 10 sealed']),
    s(['Guardrails e defesa contra prompt injection', 'Guardrails and prompt injection defense'], ['Texto do cliente tratado como dado, nunca como instrução', 'Customer text treated as data, never as instructions']),
    s('Human-in-the-loop'), s(['Engenharia de prompt', 'Prompt engineering']), s('Claude Code'),
  ] },
  { id: 'languages', name: bi('Linguagens', 'Languages'), items: [
    s('TypeScript'), s('JavaScript (Node.js)'), s('Python'), s('SQL (T-SQL, PostgreSQL)'), s('Java 21'), s('PowerShell'), s(['C# (leitura e depuração)', 'C# (reading and debugging)']),
  ] },
  { id: 'backend', name: bi('Backend e APIs', 'Backend and APIs'), items: [
    s('Node.js'), s('Fastify'), s('Spring Boot'), s('Prisma ORM'), s('FastAPI'), s('Django'), s('REST APIs'), s('OpenAPI'),
    s(['Webhooks idempotentes', 'Idempotent webhooks']), s(['Autenticação JWT e OTP', 'JWT and OTP authentication']),
    s(['Filas de jobs (pg-boss)', 'Job queues (pg-boss)'], ['13 jobs em fila no ERP da syphrax', '13 queue jobs in the syphrax ERP']),
    s(['AWS Lambda e API Gateway', 'AWS Lambda and API Gateway']),
  ] },
  { id: 'data', name: bi('Dados', 'Data'), items: [
    s('PostgreSQL', ['68 tabelas e 43 migrations no ERP', '68 tables and 43 migrations in the ERP']),
    s('SQL Server', ['Quatro bases de produção na sustentação N3', 'Four production databases in L3 support']),
    s(['Modelagem relacional', 'Relational modeling']), s(['CTEs e window functions', 'CTEs and window functions']), s(['Consultas cross-database', 'Cross-database queries']),
    s(['Otimização de consultas e índices', 'Query and index optimization']), s('Migrations'), s('Elasticsearch (ES|QL)'), s('Power BI'),
  ] },
  { id: 'frontend', name: same('Frontend'), items: [
    s('React'), s('Next.js (App Router)', ['Next.js 16 no ERP, 67 páginas, e 3 sites', 'Next.js 16 in the ERP, 67 pages, and 3 sites']),
    s('TypeScript'), s('Tailwind CSS'), s('TanStack React Query'), s('Vite'), s('GSAP'), s('Three.js'), s('i18n'),
  ] },
  { id: 'cloud', name: bi('Cloud e DevOps', 'Cloud and DevOps'), items: [
    s('AWS (Lambda, API Gateway, CloudWatch)'), s('Docker'), s('Coolify'), s('Traefik'), s('Cloudflare (Tunnel, Access, Workers, D1)'), s('GitHub Actions'), s('Vercel'), s('Git'),
  ] },
  { id: 'quality', name: bi('Qualidade e segurança', 'Quality and security'), items: [
    s('Vitest', ['231 arquivos de teste no ERP', '231 test files in the ERP']), s('Playwright (E2E)', ['24 specs E2E no ERP', '24 E2E specs in the ERP']),
    s(['CI com gitleaks, npm audit e Semgrep', 'CI with gitleaks, npm audit and Semgrep']), s(['Testes de segurança', 'Security testing']),
    s(['Controle de acesso por papel (RBAC) e TOTP', 'Role-based access control (RBAC) and TOTP']), s(['Isolamento multi-tenant', 'Multi-tenant isolation']),
    s('LGPD'), s('Code review'), s('ADRs'),
  ] },
];
