export default function Telemetry() {
  return (
<section className={"pan"} id={"numeros"}>
  <div className={"wrap"}>
    <div className={"hdr"}><span className={"lbl"} data-en={"telemetry"}>telemetria</span><h2 data-en={"Numbers from real work"}>Números do trabalho real</h2><p className={"lead"} data-en={"Every value comes from production projects, not from estimates."}>Cada valor vem dos projetos em produção, não de estimativa.</p></div>
    <div className={"tel"}>
      <article className={"metric-row rv"}><div className={"in"}><span className={"lbl"} data-en={"mcp server, ge finance"}>servidor mcp, ge finance</span><div className={"big"}><span data-count={"430"} data-suffix={"+"}>430+</span><small data-en={"tests"}>testes</small></div><p data-en={"Read-only, 31 fixed parameterized SQL queries and 1,067 columns validated against the schema."}>Somente leitura, 31 consultas SQL fechadas e parametrizadas e 1.067 colunas validadas contra o schema.</p></div></article>
      <article className={"metric-row rv"}><div className={"in"}><span className={"lbl"} data-en={"l3 support"}>sustentação n3</span><div className={"big"}><span data-count={"466"}>466</span></div><p data-en={"orders stuck for two months, released after tracing the root cause."}>pedidos presos há dois meses, liberados após rastrear a causa raiz.</p></div></article>
      <article className={"metric-row rv"}><div className={"in"}><span className={"lbl"} data-en={"syphrax erp"}>erp syphrax</span><div className={"big"}><span data-count={"15"}>15</span><small data-en={"modules"}>módulos</small></div><p data-en={"68 tables and 43 migrations on PostgreSQL."}>68 tabelas e 43 migrations em PostgreSQL.</p></div></article>
      <article className={"metric-row rv"}><div className={"in"}><span className={"lbl"} data-en={"erp quality"}>qualidade do erp</span><div className={"big"}><span data-count={"2240"} data-prefix={"~"} data-fmt={"1"} data-en={"~2,240"}>~2.240</span></div><p data-en={"test cases."}>casos de teste.</p><div className={"leg"}><span data-en={"231 Vitest files"}>231 arquivos Vitest</span><span data-en={"24 Playwright specs"}>24 specs Playwright</span></div></div></article>
      <article className={"metric-row rv"}><div className={"in"}><span className={"lbl"} data-en={"agent evals"}>evals do agente</span><div className={"big"}><span data-count={"51"}>51</span><small data-en={"cases"}>casos</small></div><p data-en={"Real ones, from 545 tickets. 10 sealed (20%) and reserved to decide autonomy."}>Reais, de 545 chamados. 10 selados (20%) reservados para decidir autonomia.</p></div></article>
      <article className={"metric-row rv"}><div className={"in"}><span className={"lbl"} data-en={"integrity"}>integridade</span><div className={"big"}><span data-count={"42"}>42</span><small data-en={"CI checks on the agent, 198 tests on the PR reviewer"}>checks de CI no agente, 198 testes no revisor de PR</small></div><p data-en={"Checks built from real failures: credential leaks, message bursts and concurrency overruns."}>Verificações criadas a partir de falhas reais: vazamento de credencial, rajada de mensagens e estouro de concorrência.</p></div></article>
    </div>
  </div>
</section>
  );
}
