import { bi, same, type Bi } from './bi';

export type Fact = { value: Bi; label: Bi };
export type Point = { label: Bi; text: Bi };
export type CaseData = {
  slug: string;
  meta: Bi;
  title: Bi;
  figure: Bi;
  lead: Bi;
  facts: Fact[];
  note: Bi;
  points: Point[];
  tags: (string | Bi)[];
};

const point = (label: [string, string], text: [string, string]): Point => ({ label: bi(...label), text: bi(...text) });
const fact = (value: string | [string, string], label: [string, string]): Fact => ({ value: typeof value === 'string' ? same(value) : bi(...value), label: bi(...label) });

/** Five cases, each linking to its write-up in the public engineering-cases repository. */
export const CASES: CaseData[] = [
  {
    slug: 'ai-support-agent',
    meta: same('GE Finance, 2026'),
    title: bi('Agente de suporte com acesso só de leitura', 'Support agent with read-only access'),
    figure: bi('430+ testes', '430+ tests'),
    lead: bi('Agente N1 em TypeScript (Claude via Vercel AI SDK) integrado a WhatsApp e TomTicket: consulta dados por tool calling, aciona um subagente de diagnóstico e entrega análise e rascunho para aprovação humana.',
      'L1 agent in TypeScript (Claude via the Vercel AI SDK) integrated with WhatsApp and TomTicket: it queries data through tool calling, triggers a diagnostic subagent and delivers an analysis and a draft reply for human approval.'),
    facts: [
      fact('31', ['consultas SQL fechadas', 'fixed SQL queries']), fact('430+', ['testes no MCP', 'tests on the MCP']),
      fact(['1.067', '1,067'], ['colunas validadas', 'columns validated']), fact('51', ['evals, de 545 chamados', 'evals, from 545 tickets']),
      fact('42', ['checks de CI', 'CI checks']), fact('176', ['repositórios mapeados', 'repositories mapped']),
    ],
    note: bi('10 casos selados (20%) reservados para decidir autonomia.', '10 sealed cases (20%) reserved to decide autonomy.'),
    points: [
      point(['MCP', 'MCP'], ['em AWS Lambda e API Gateway, única via de dados do agente: somente leitura, limites de linhas, tempo e concorrência, isolamento por cliente.', "on AWS Lambda and API Gateway, the agent's only data path: read-only, row, time and concurrency limits, per-tenant isolation."]),
      point(['Guardrails:', 'Guardrails:'], ['texto do cliente tratado como dado, nunca como instrução; tenant vem do cadastro; OTP; agente sem credencial de banco; trilha de auditoria.', 'customer text treated as data, never as instructions; tenant comes from the account record; OTP; agent without database credentials; audit trail.']),
      point(['RAG', 'RAG'], ['sobre casos e documentação, primeiro em ChromaDB e depois em PostgreSQL/pgvector: padrão vem da busca semântica, fato vem do SQL.', 'over cases and documentation, first on ChromaDB and then on PostgreSQL/pgvector: patterns come from semantic search, facts come from SQL.']),
      point(['Evals:', 'Evals:'], ['51 casos reais estratificados de 545 chamados, runner com pontuação e taxa de aceite por família como critério de autonomia gradual.', '51 real cases stratified from 545 tickets, a scoring runner and an acceptance rate per family as the criterion for gradual autonomy.']),
      point(['Arquitetura', 'Architecture'], ['em camadas, domínio independente da plataforma de agentes, 42 checks de CI vindos de falhas reais e decisões em ADRs.', 'in layers, a domain independent of the agent platform, 42 CI checks from real failures and decisions recorded in ADRs.']),
      point(['Baseline:', 'Baseline:'], ['545 chamados, mediana de 4,7 dias até o encerramento; corrigi o método da taxa de resolutividade, que passava de 100% ao misturar coortes.', '545 tickets, median of 4.7 days to close; I fixed the resolution-rate method, which exceeded 100% by mixing cohorts.']),
      point(['Mapeamento:', 'Mapping:'], ['176 repositórios e 74 serviços do Elastic APM (ES|QL) para o agente usar só código ativo em produção.', '176 repositories and 74 Elastic APM services (ES|QL) so the agent uses only code that is live in production.']),
      point(['Multiagente N3', 'L3 multi-agent'], ['por iniciativa própria: revelou retenção de log de 24 horas em parte dos índices, limitação não documentada.', 'on my own initiative: it revealed 24-hour log retention on part of the indices, an undocumented limit.']),
    ],
    tags: ['TypeScript', 'Claude', 'Vercel AI SDK', 'MCP', 'AWS Lambda', 'API Gateway', 'SQL Server', 'ChromaDB', 'pgvector', 'Zod', 'GitHub Actions', 'Elastic APM', 'WhatsApp', 'TomTicket'],
  },
  {
    slug: 'llm-pr-reviewer',
    meta: same('syphrax, 2026'),
    title: bi('Argos: revisor de pull requests com LLM', 'Argos: LLM pull request reviewer'),
    figure: bi('198 testes', '198 tests'),
    lead: bi('Revisão consistente e merge com regras, sem depender de alguém disponível. O modelo opina em um sandbox sem escrita; quem age é código determinístico.',
      'Consistent review and rule-gated merging without depending on someone being available. The model gives an opinion in a sandbox with no write access; deterministic code is what acts.'),
    facts: [fact('198', ['testes', 'tests']), fact('2', ['contêineres isolados', 'isolated containers']), fact('50 + 31', ['testes na Íris e no monitor', 'tests on Íris and the monitor'])],
    note: bi('Saída validada por JSON Schema, filtro de vazamento de segredos, revisão presa ao head SHA.', 'Output validated by JSON Schema, secret-leak filter, review bound to the head SHA.'),
    points: [
      point(['Executor sem poder de escrita:', 'Executor with no write power:'], ['o modelo roda via codex exec em sandbox read-only; quem age é o orquestrador, o único com o token do GitHub.', 'the model runs through codex exec in a read-only sandbox; the orchestrator, which holds the GitHub token, is the one that acts.']),
      point(['Saída estruturada:', 'Structured output:'], ['a resposta precisa obedecer a um JSON Schema, então o merge não depende de interpretar prosa.', 'the response must satisfy a JSON Schema, so merging never depends on interpreting prose.']),
      point(['Filtro de vazamento:', 'Leak filter:'], ['saída com padrão de credencial é descartada inteira, em vez de mascarada.', 'output with a credential pattern is discarded entirely instead of being masked.']),
      point(['Revisão presa ao head SHA:', 'Review bound to the head SHA:'], ['se o PR muda, a aprovação antiga deixa de valer.', 'if the PR changes, the old approval stops counting.']),
      point(['Merge com travas:', 'Gated merge:'], ['APPROVE sem achados Critical ou Important, CI verde, sem conflito, autor membro da organização, diff abaixo do limite e nenhum arquivo sensível.', 'APPROVE with no Critical or Important findings, CI green, no conflicts, org-member author, diff under the limit and no sensitive files.']),
      point(['Coadjuvantes:', 'Satellites:'], ['Íris, CLI em Python que envia relatórios pelo WhatsApp (50 testes), e um monitor serverless em Cloudflare Workers e D1 (31 testes).', 'Íris, a Python CLI that sends reports over WhatsApp (50 tests), and a serverless monitor on Cloudflare Workers and D1 (31 tests).']),
      point(['Limites:', 'Limits:'], ['não afirmo taxa de acerto das revisões nem tempo economizado: não foram medidos.', 'I do not claim review accuracy or time saved; neither was measured.']),
    ],
    tags: ['Node.js', 'Codex CLI', 'JSON Schema', 'Docker', 'seccomp', 'AppArmor', 'GitHub API', bi('Cloudflare Workers e D1', 'Cloudflare Workers and D1')],
  },
  {
    slug: 'syphrax-erp',
    meta: same('syphrax, 2026'),
    title: bi('ERP SaaS próprio, do banco à interface', 'In-house SaaS ERP, from the database to the interface'),
    figure: bi('15 módulos', '15 modules'),
    lead: bi('CRM, propostas, contratos, financeiro, fiscal e NFS-e, projetos, customer success e portal do cliente, em TypeScript e PostgreSQL.',
      'CRM, proposals, contracts, finance, tax and NFS-e invoicing, projects, customer success and client portal, in TypeScript and PostgreSQL.'),
    facts: [
      fact('15', ['módulos', 'modules']), fact('68', ['tabelas', 'tables']), fact('43', ['migrations', 'migrations']),
      fact(['~2.240', '~2,240'], ['casos de teste', 'test cases']), fact('8', ['integrações externas', 'external integrations']), fact('13', ['jobs em fila', 'queue jobs']),
    ],
    note: bi('Auditoria imposta pelo banco, RBAC com TOTP e rotinas de LGPD.', 'Auditing enforced by the database, RBAC with TOTP and LGPD routines.'),
    points: [
      point(['Segurança:', 'Security:'], ['permissões por papel, módulo, ação e escopo (RBAC), login Google com TOTP, auditoria append-only imposta no banco e rotinas de LGPD (anonimização, exportação, retenção).', 'permissions by role, module, action and scope (RBAC), Google login with TOTP, append-only audit logging enforced in the database and LGPD routines (anonymization, export, retention).']),
      point(['Integrações:', 'Integrations:'], ['Asaas (cobrança, conciliação e NFS-e), Linear, GitHub, Cloudflare, Coolify, Resend, RDAP e WhatsApp/WAHA, com 4 webhooks de entrada e 13 jobs pg-boss.', 'Asaas (billing, reconciliation and NFS-e), Linear, GitHub, Cloudflare, Coolify, Resend, RDAP and WhatsApp/WAHA, with 4 inbound webhooks and 13 pg-boss jobs.']),
      point(['Revisor de PR com LLM:', 'LLM PR reviewer:'], ['2 contêineres isolados, filtro de vazamento de segredos, merge com travas e 198 testes (veja o case do Argos).', '2 isolated containers, secret-leak filter, gated merge and 198 tests (see the Argos case).']),
      point(['Infra:', 'Infra:'], ['VPS com Coolify e Traefik atrás de Cloudflare Tunnel e Access, deploy contínuo e backup diário cifrado (gpg e rclone) com teste de restauração.', 'VPS with Coolify and Traefik behind Cloudflare Tunnel and Access, continuous deployment and a daily encrypted backup (gpg and rclone) with restore testing.']),
      point(['Monitoramento:', 'Monitoring:'], ['serviço serverless em Cloudflare Workers e D1 com checagem por minuto, e a Íris, CLI em Python com 50 testes que envia relatórios pelo WhatsApp.', 'serverless service on Cloudflare Workers and D1 with per-minute checks, and Íris, a Python CLI with 50 tests that sends reports over WhatsApp.']),
      point(['Qualidade:', 'Quality:'], ['231 arquivos Vitest e 24 specs Playwright E2E; CI com PostgreSQL real, typecheck, lint, gitleaks, npm audit e Semgrep.', '231 Vitest files and 24 Playwright E2E specs; CI with a real PostgreSQL, typecheck, lint, gitleaks, npm audit and Semgrep.']),
      point(['Interface:', 'Interface:'], ['Next.js 16 e React 19, 67 páginas, mais 3 sites com i18n, GSAP, Three.js e captação de leads.', 'Next.js 16 and React 19, 67 pages, plus 3 sites with i18n, GSAP, Three.js and lead capture.']),
      point(['Para clientes:', 'For clients:'], ['RAG com pgvector e um CRM com aquecimento de leads frios e orçamentos automatizados com IA.', 'RAG with pgvector and a CRM with cold-lead nurturing and AI-driven quote automation.']),
    ],
    tags: ['TypeScript', 'PostgreSQL', 'Next.js 16', 'React 19', 'Fastify', 'Prisma', 'pg-boss', 'Vitest', 'Playwright', 'Coolify', 'Traefik', bi('Cloudflare Workers e D1', 'Cloudflare Workers and D1'), 'Asaas', bi('gpg e rclone', 'gpg and rclone')],
  },
  {
    slug: 'genoma-erp',
    meta: same('syphrax, 2026'),
    title: bi('Genoma: ERP instalado na infraestrutura do cliente', "Genoma: ERP installed on the customer's own infrastructure"),
    figure: bi('produto validado', 'validated product'),
    lead: bi('ERP para pequenos negócios que roda no servidor do próprio cliente, que fica dono dos dados. Várias instalações que continuam atualizáveis sem perder esse isolamento.',
      "ERP for small businesses that runs on the customer's own server, so the customer owns the data. Several installations that stay updatable without losing that isolation."),
    facts: [fact('8', ['módulos de negócio', 'business modules']), fact(['~2.800', '~2,800'], ['casos de teste', 'test cases']), fact('v1.0', ['produto validado', 'validated product'])],
    note: bi('Multi-loja, NF-e, 2FA, backup diário e um deploy que volta atrás sozinho.', 'Multi-store, NF-e, 2FA, daily backup and a deploy that rolls itself back.'),
    points: [
      point(['Produto:', 'Product:'], ['pequenos comércios costumam escolher entre planilhas e um SaaS em que os dados ficam com o fornecedor; o Genoma roda no servidor do cliente.', "small shops usually pick between spreadsheets and a SaaS where the vendor holds the data; Genoma runs on the customer's server instead."]),
      point(['Multi-loja:', 'Multi-store:'], ['o isolamento entre lojas é imposto pelo banco, não só pela aplicação.', 'isolation between stores is enforced by the database, not only by the application.']),
      point(['Operação:', 'Operations:'], ['backup diário cifrado com teste mensal de restauração automatizado, checagens de saúde e deploy que volta atrás sozinho se uma checagem falha.', 'daily encrypted backup with an automated monthly restore test, health checks, and a deploy that rolls back on its own if a check fails.']),
      point(['Fiscal:', 'Tax:'], ['NF-e em serviço separado, que isola a parte fiscal.', 'NF-e handled by a separate service, keeping the fiscal part isolated.']),
      point(['Segurança:', 'Security:'], ['autenticação com 2FA.', 'authentication with 2FA.']),
      point(['Estado:', 'Status:'], ['produto validado, v1.0. Não afirmo clientes em produção.', 'validated product, v1.0. I make no claim of customers in production.']),
    ],
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'career-automation',
    meta: bi('Projeto pessoal, 2026', 'Personal project, 2026'),
    title: bi('Agente de currículo sob medida', 'Tailored resume agent'),
    figure: bi('~186 testes', '~186 tests'),
    lead: bi('Pipeline de IA que adapta o currículo a cada vaga a partir de uma única fonte verificada: o Codex redige e o Claude revisa. Saída estruturada, nota mínima, guard contra prompt injection e checagem ATS.',
      'AI pipeline that tailors a resume to each job from one verified source of truth: Codex drafts, Claude reviews. Structured output, minimum score, prompt injection guard and ATS check.'),
    facts: [fact('~186', ['testes', 'tests']), fact('2', ['fornecedores de modelo', 'model vendors']), fact('1', ['fonte única', 'source of truth'])],
    note: bi('Toda afirmação numérica aponta para uma fonte registrada, ou não é publicada.', 'Every numeric claim points to a recorded source, or it is not published.'),
    points: [
      point(['Revisão cruzada:', 'Cross-review:'], ['o Codex redige e o Claude, de outro fornecedor, revisa; isso reduz o ponto cego de um modelo só.', 'Codex drafts and Claude, from a different vendor, reviews; this reduces the blind spot of a single model.']),
      point(['Nota mínima:', 'Minimum score:'], ['a cobertura de palavras-chave recebe nota, e nota abaixo do mínimo escala para um modelo mais forte.', 'keyword coverage is scored, and a score under the minimum escalates to a stronger model.']),
      point(['Guard contra prompt injection:', 'Prompt injection guard:'], ['o texto da vaga é entrada não confiável e é tratado como dado.', 'the job posting is untrusted input and is handled as data.']),
      point(['Checagem ATS:', 'ATS check:'], ['uma coluna, texto extraível, 2 páginas e números com lastro.', 'one column, extractable text, 2 pages and numbers with backing.']),
      point(['Fonte única:', 'One source:'], ['um YAML mestre gera todas as variantes, sem divergência entre versões.', 'a master YAML generates every variant, so there is no drift between versions.']),
      point(['Saída estruturada:', 'Structured output:'], ['o resultado obedece a um JSON Schema; um erro do agente nunca bloqueia a entrega do currículo padrão.', 'results follow a JSON Schema; an agent error never blocks delivery of the default resume.']),
    ],
    tags: ['Python', 'Codex', 'Claude', 'JSON Schema', 'YAML'],
  },
];
