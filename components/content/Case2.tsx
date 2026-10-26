
export default function Case2() {
 return (
<article className={"cd rv"} data-cd=""><div className={"tilt"}><div className={"flip"}>
        <div className={"face fr hud"}><div className={"in"}>
          <div className={"fgrid"}>
            <div><span className={"where"}>syphrax, 2026</span><h3 data-en={"Argos: LLM pull request reviewer in isolated containers"}>Argos: revisor de pull requests com LLM em contêineres isolados</h3>
              <p className={"sm"} data-en={"Consistent review and rule-gated merging without depending on someone being available. The model gives an opinion in a sandbox with no write access; deterministic code is what acts."}>Revisão consistente e merge com regras, sem depender de alguém disponível. O modelo opina em um sandbox sem escrita; quem age é código determinístico.</p>
              <div className={"chips"}><span className={"chip"}>Node.js</span><span className={"chip"}>Codex CLI</span><span className={"chip"}>JSON Schema</span><span className={"chip"}>Docker</span><span className={"chip"}>seccomp</span><span className={"chip"}>AppArmor</span></div></div>
            <div className={"stats"}>
              <div className={"stat am"}><b>198</b><span data-en={"tests"}>testes</span></div><div className={"stat"}><b>2</b><span data-en={"isolated containers"}>contêineres isolados</span></div><div className={"stat mg"}><b>50 + 31</b><span data-en={"tests on Íris and the monitor"}>testes na Íris e no monitor</span></div>
              <div className={"stat w"}><span data-en={"Output validated by JSON Schema, secret-leak filter, review bound to the head SHA"}>Saída validada por JSON Schema, filtro de vazamento de segredos, revisão presa ao head SHA</span></div>
            </div></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"See the dossier"}>Ver o dossiê</span> <svg viewBox={"0 0 14 14"}><path d={"M2 7h10M8 3l4 4-4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/llm-pr-reviewer.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
        <div className={"face bk hud"} inert={true}><div className={"in"}>
          <div><span className={"where"} data-en={"syphrax, 2026, dossier"}>syphrax, 2026, dossiê</span></div>
          <ul className={"bl"}>
            <li><b data-en={"Executor with no write power:"}>Executor sem poder de escrita:</b> <span data-en={"the model runs through codex exec in a read-only sandbox; the orchestrator, which holds the GitHub token, is the one that acts."}>o modelo roda via codex exec em sandbox read-only; quem age é o orquestrador, o único com o token do GitHub.</span></li>
            <li><b data-en={"Structured output:"}>Saída estruturada:</b> <span data-en={"the response must satisfy a JSON Schema, so merging never depends on interpreting prose."}>a resposta precisa obedecer a um JSON Schema, então o merge não depende de interpretar prosa.</span></li>
            <li><b data-en={"Leak filter:"}>Filtro de vazamento:</b> <span data-en={"output with a credential pattern is discarded entirely instead of being masked."}>saída com padrão de credencial é descartada inteira, em vez de mascarada.</span></li>
            <li><b data-en={"Review bound to the head SHA:"}>Revisão presa ao head SHA:</b> <span data-en={"if the PR changes, the old approval stops counting."}>se o PR muda, a aprovação antiga deixa de valer.</span></li>
            <li><b data-en={"Gated merge:"}>Merge com travas:</b> <span data-en={"APPROVE with no Critical or Important findings, CI green, no conflicts, org-member author, diff under the limit and no sensitive files."}>APPROVE sem achados Critical ou Important, CI verde, sem conflito, autor membro da organização, diff abaixo do limite e nenhum arquivo sensível.</span></li>
            <li><b data-en={"Satellites:"}>Coadjuvantes:</b> <span data-en={"Íris, a Python CLI that sends reports over WhatsApp (50 tests), and a serverless monitor on Cloudflare Workers and D1 (31 tests)."}>Íris, CLI em Python que envia relatórios pelo WhatsApp (50 testes), e um monitor serverless em Cloudflare Workers e D1 (31 testes).</span></li>
            <li><b data-en={"Limits:"}>Limites:</b> <span data-en={"I do not claim review accuracy or time saved; neither was measured."}>não afirmo taxa de acerto das revisões nem tempo economizado: não foram medidos.</span></li>
          </ul>
          <div className={"chips"}><span className={"chip"}>Codex CLI</span><span className={"chip"}>JSON Schema</span><span className={"chip"}>Docker</span><span className={"chip"}>seccomp</span><span className={"chip"}>AppArmor</span><span className={"chip"}>GitHub API</span><span className={"chip"}>Cloudflare Workers e D1</span></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"Back"}>Voltar</span> <svg viewBox={"0 0 14 14"}><path d={"M12 7H2M6 3L2 7l4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/llm-pr-reviewer.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
      </div></div></article>
 );
}
