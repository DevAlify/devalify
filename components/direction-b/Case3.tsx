export default function Case3() {
  return <article className="cs" aria-labelledby="case-title-3">
    <svg className="go" viewBox="0 0 28 28" aria-hidden="true">
      <path d="M7 21L21 7M9 7h12v12" />
    </svg>
    <div className="case-scroll" tabIndex={0} role="region" aria-labelledby="case-title-3">
      <div>
        <span className="k">syphrax, 2026</span>
        <h3 id="case-title-3" data-en={"In-house SaaS ERP, from the database to the interface"}>ERP SaaS próprio, do banco à interface</h3>
        <p className={"sm"} data-en={"CRM, proposals, contracts, finance, tax and NFS-e invoicing, projects, customer success and client portal, in TypeScript and PostgreSQL."}>CRM, propostas, contratos, financeiro, fiscal e NFS-e, projetos, customer success e portal do cliente, em TypeScript e PostgreSQL.</p>
        <div className={"chips"}>
          <span className={"chip"}>TypeScript</span>
          <span className={"chip"}>PostgreSQL</span>
          <span className={"chip"}>Next.js 16</span>
          <span className={"chip"}>React 19</span>
          <span className={"chip"}>pg-boss</span>
          <span className={"chip"}>Cloudflare</span>
        </div>
      </div>
      <div className="case-metrics">
        <div className="stat stat-primary n">
          <b data-count="15">15</b>
          <span data-en={"modules"}>módulos</span>
        </div>
        <div className={"stat"}>
          <b>68</b>
          <span data-en={"tables"}>tabelas</span>
        </div>
        <div className={"stat"}>
          <b>43</b>
          <span>migrations</span>
        </div>
        <div className={"stat mg"}>
          <b data-en={"~2,240"}>~2.240</b>
          <span data-en={"test cases"}>casos de teste</span>
        </div>
        <div className={"stat"}>
          <b>8</b>
          <span data-en={"external integrations"}>integrações externas</span>
        </div>
        <div className={"stat am"}>
          <b>13</b>
          <span data-en={"queue jobs"}>jobs em fila</span>
        </div>
        <div className={"stat w"}>
          <span data-en={"Auditing enforced by the database, RBAC with TOTP and LGPD routines"}>Auditoria imposta pelo banco, RBAC com TOTP e rotinas de LGPD</span>
        </div>
      </div>
      <div className="case-detail">
        <ul className={"bl"}>
          <li>
            <b data-en={"Security:"}>Segurança:</b> <span data-en={"permissions by role, module, action and scope (RBAC), Google login with TOTP, append-only audit logging enforced in the database and LGPD routines (anonymization, export, retention)."}>permissões por papel, módulo, ação e escopo (RBAC), login Google com TOTP, auditoria append-only imposta no banco e rotinas de LGPD (anonimização, exportação, retenção).</span>
          </li>
          <li>
            <b data-en={"Integrations:"}>Integrações:</b> <span data-en={"Asaas (billing, reconciliation and NFS-e), Linear, GitHub, Cloudflare, Coolify, Resend, RDAP and WhatsApp/WAHA, with 4 inbound webhooks and 13 pg-boss jobs."}>Asaas (cobrança, conciliação e NFS-e), Linear, GitHub, Cloudflare, Coolify, Resend, RDAP e WhatsApp/WAHA, com 4 webhooks de entrada e 13 jobs pg-boss.</span>
          </li>
          <li>
            <b data-en={"LLM PR reviewer:"}>Revisor de PR com LLM:</b> <span data-en={"2 isolated containers, secret-leak filter, gated merge and 198 tests (see the Argos case)."}>2 contêineres isolados, filtro de vazamento de segredos, merge com travas e 198 testes (veja o case do Argos).</span>
          </li>
          <li>
            <b>Infra:</b> <span data-en={"VPS with Coolify and Traefik behind Cloudflare Tunnel and Access, continuous deployment and a daily encrypted backup (gpg and rclone) with restore testing."}>VPS com Coolify e Traefik atrás de Cloudflare Tunnel e Access, deploy contínuo e backup diário cifrado (gpg e rclone) com teste de restauração.</span>
          </li>
          <li>
            <b data-en={"Monitoring:"}>Monitoramento:</b> <span data-en={"serverless service on Cloudflare Workers and D1 with per-minute checks, and Íris, a Python CLI with 50 tests that sends reports over WhatsApp."}>serviço serverless em Cloudflare Workers e D1 com checagem por minuto, e a Íris, CLI em Python com 50 testes que envia relatórios pelo WhatsApp.</span>
          </li>
          <li>
            <b data-en={"Quality:"}>Qualidade:</b> <span data-en={"231 Vitest files and 24 Playwright E2E specs; CI with a real PostgreSQL, typecheck, lint, gitleaks, npm audit and Semgrep."}>231 arquivos Vitest e 24 specs Playwright E2E; CI com PostgreSQL real, typecheck, lint, gitleaks, npm audit e Semgrep.</span>
          </li>
          <li>
            <b data-en={"Interface:"}>Interface:</b> <span data-en={"Next.js 16 and React 19, 67 pages, plus 3 sites with i18n, GSAP, Three.js and lead capture."}>Next.js 16 e React 19, 67 páginas, mais 3 sites com i18n, GSAP, Three.js e captação de leads.</span>
          </li>
          <li>
            <b data-en={"For clients:"}>Para clientes:</b> <span data-en={"RAG with pgvector and a CRM with cold-lead nurturing and AI-driven quote automation."}>RAG com pgvector e um CRM com aquecimento de leads frios e orçamentos automatizados com IA.</span>
          </li>
        </ul>
        <div className={"chips"}>
          <span className={"chip"}>Fastify</span>
          <span className={"chip"}>Prisma</span>
          <span className={"chip"}>Vitest</span>
          <span className={"chip"}>Playwright</span>
          <span className={"chip"}>Coolify</span>
          <span className={"chip"}>Traefik</span>
          <span className={"chip"}>Cloudflare Workers e D1</span>
          <span className={"chip"}>Asaas</span>
          <span className={"chip"}>gpg e rclone</span>
        </div>
      </div>
      <a className="case-link" href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/syphrax-erp.md"} target={"_blank"} rel={"noopener"}>
        <span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}>
          <path d={"M3 11L11 3M4 3h7v7"}>
          </path>
        </svg>
      </a>
    </div>
  </article>;
}
