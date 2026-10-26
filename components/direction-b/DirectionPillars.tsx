export default function DirectionPillars() {
  return <section id="pilares">
    <div className="wrap">
      <h2 className="rv" data-en="Three fronts, one criterion: production.">Três frentes, um critério: produção.</h2>
      <div className="pil">
        <div className="row rv" tabIndex={0}>
          <h3>
            <span data-en={"Applied AI"}>IA aplicada</span>
          </h3>
          <div>
            <p data-en={"Agents with controlled data access, evaluated against real cases before gaining autonomy."}>Agentes com acesso controlado a dados, avaliados contra casos reais antes de ganhar autonomia.</p>
            <small>
              <span>Claude</span>, <span>Vercel AI SDK</span>, <span>MCP</span>, <span>RAG</span>, <span>Evals</span>, <span>Guardrails</span>
            </small>
          </div>
        </div>
        <div className="row rv" tabIndex={0}>
          <h3>
            <span>Backend</span>
          </h3>
          <div>
            <p data-en={"APIs and queues that handle failure: idempotency, database-level auditing and SQL that holds up under volume."}>APIs e filas que lidam com falha: idempotência, auditoria no banco e SQL que aguenta volume.</p>
            <small>
              <span>Node.js</span>, <span>Fastify</span>, <span>PostgreSQL</span>, <span>pg-boss</span>, <span>Java 21</span>
            </small>
          </div>
        </div>
        <div className="row rv" tabIndex={0}>
          <h3>
            <span>Full Stack</span>
          </h3>
          <div>
            <p data-en={"From the database to the interface, with end-to-end tests and a pipeline that blocks leaked secrets."}>Do banco à interface, com testes de ponta a ponta e pipeline que barra segredo vazado.</p>
            <small>
              <span>Next.js 16</span>, <span>React 19</span>, <span>TypeScript</span>, <span>Playwright</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
