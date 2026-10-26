import type { CSSProperties } from "react";

export default function Case1() {
 return (
<article className={"cd rv"} data-cd=""><div className={"tilt"}><div className={"flip"}>
        <div className={"face fr hud"}><div className={"in"}>
          <div className={"fgrid"}>
            <div><span className={"where"}>GE Finance, 2026</span><h3 data-en={"Support agent with read-only access"}>Agente de suporte com acesso só de leitura</h3>
              <p className={"sm"} data-en={"L1 agent in TypeScript (Claude via the Vercel AI SDK) integrated with WhatsApp and TomTicket: it queries data through tool calling, triggers a diagnostic subagent and delivers an analysis and a draft reply for human approval."}>Agente N1 em TypeScript (Claude via Vercel AI SDK) integrado a WhatsApp e TomTicket: consulta dados por tool calling, aciona um subagente de diagnóstico e entrega análise e rascunho para aprovação humana.</p>
              <div className={"chips"}><span className={"chip"}>TypeScript</span><span className={"chip"}>Claude</span><span className={"chip"}>MCP</span><span className={"chip"}>AWS Lambda</span><span className={"chip"}>SQL Server</span><span className={"chip"}>pgvector</span></div></div>
            <div className={"stats"}>
              <div className={"stat"}><b>31</b><span data-en={"fixed SQL queries"}>consultas SQL fechadas</span></div><div className={"stat am"}><b>430+</b><span data-en={"tests on the MCP"}>testes no MCP</span></div><div className={"stat"}><b data-en={"1,067"}>1.067</b><span data-en={"columns validated"}>colunas validadas</span></div>
              <div className={"stat mg"}><b>51</b><span data-en={"evals, from 545 tickets"}>evals, de 545 chamados</span></div><div className={"stat"}><b>42</b><span data-en={"CI checks"}>checks de CI</span></div><div className={"stat am"}><b>176</b><span data-en={"repositories mapped"}>repositórios mapeados</span></div>
              <div className={"stat w"}><span data-en={"10 sealed cases (20%) reserved to decide autonomy"}>10 casos selados (20%) reservados para decidir autonomia</span><div className={"prog"} style={{"--w": "20%"} as CSSProperties}><i></i></div></div>
            </div></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"See the dossier"}>Ver o dossiê</span> <svg viewBox={"0 0 14 14"}><path d={"M2 7h10M8 3l4 4-4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/ai-support-agent.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
        <div className={"face bk hud"} inert={true}><div className={"in"}>
          <div><span className={"where"} data-en={"GE Finance, 2026, dossier"}>GE Finance, 2026, dossiê</span></div>
          <ul className={"bl"}>
            <li><b>MCP</b> <span data-en={"on AWS Lambda and API Gateway, the agent's only data path: read-only, row, time and concurrency limits, per-tenant isolation."}>em AWS Lambda e API Gateway, única via de dados do agente: somente leitura, limites de linhas, tempo e concorrência, isolamento por cliente.</span></li>
            <li><b>Guardrails:</b> <span data-en={"customer text treated as data, never as instructions; tenant comes from the account record; OTP; agent without database credentials; audit trail."}>texto do cliente tratado como dado, nunca como instrução; tenant vem do cadastro; OTP; agente sem credencial de banco; trilha de auditoria.</span></li>
            <li><b>RAG</b> <span data-en={"over cases and documentation, first on ChromaDB and then on PostgreSQL/pgvector: patterns come from semantic search, facts come from SQL."}>sobre casos e documentação, primeiro em ChromaDB e depois em PostgreSQL/pgvector: padrão vem da busca semântica, fato vem do SQL.</span></li>
            <li><b>Evals:</b> <span data-en={"51 real cases stratified from 545 tickets, a scoring runner and an acceptance rate per family as the criterion for gradual autonomy."}>51 casos reais estratificados de 545 chamados, runner com pontuação e taxa de aceite por família como critério de autonomia gradual.</span></li>
            <li><b data-en={"Architecture"}>Arquitetura</b> <span data-en={"in layers, a domain independent of the agent platform, 42 CI checks from real failures and decisions recorded in ADRs."}>em camadas, domínio independente da plataforma de agentes, 42 checks de CI vindos de falhas reais e decisões em ADRs.</span></li>
            <li><b>Baseline:</b> <span data-en={"545 tickets, median of 4.7 days to close; I fixed the resolution-rate method, which exceeded 100% by mixing cohorts."}>545 chamados, mediana de 4,7 dias até o encerramento; corrigi o método da taxa de resolutividade, que passava de 100% ao misturar coortes.</span></li>
            <li><b data-en={"Mapping:"}>Mapeamento:</b> <span data-en={"176 repositories and 74 Elastic APM services (ES|QL) so the agent uses only code that is live in production."}>176 repositórios e 74 serviços do Elastic APM (ES|QL) para o agente usar só código ativo em produção.</span></li>
            <li><b data-en={"L3 multi-agent"}>Multiagente N3</b> <span data-en={"on my own initiative: it revealed 24-hour log retention on part of the indices, an undocumented limit."}>por iniciativa própria: revelou retenção de log de 24 horas em parte dos índices, limitação não documentada.</span></li>
          </ul>
          <div className={"chips"}><span className={"chip"}>TypeScript</span><span className={"chip"}>Vercel AI SDK</span><span className={"chip"}>API Gateway</span><span className={"chip"}>ChromaDB</span><span className={"chip"}>pgvector</span><span className={"chip"}>Zod</span><span className={"chip"}>GitHub Actions</span><span className={"chip"}>Elastic APM</span><span className={"chip"}>WhatsApp</span><span className={"chip"}>TomTicket</span></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"Back"}>Voltar</span> <svg viewBox={"0 0 14 14"}><path d={"M12 7H2M6 3L2 7l4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/ai-support-agent.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
      </div></div></article>
 );
}
