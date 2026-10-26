
export default function Case5() {
 return (
<article className={"cd rv"} data-cd=""><div className={"tilt"}><div className={"flip"}>
        <div className={"face fr hud"}><div className={"in"}>
          <div className={"fgrid"}>
            <div><span className={"where"} data-en={"Personal project, 2026"}>Projeto pessoal, 2026</span><h3 data-en={"Tailored resume agent"}>Agente de currículo sob medida</h3>
              <p className={"sm"} data-en={"AI pipeline that tailors a resume to each job from one verified source of truth: Codex drafts, Claude reviews. Structured output, minimum score, prompt injection guard and ATS check."}>Pipeline de IA que adapta o currículo a cada vaga a partir de uma única fonte verificada: o Codex redige e o Claude revisa. Saída estruturada, nota mínima, guard contra prompt injection e checagem ATS.</p>
              <div className={"chips"}><span className={"chip"}>Python</span><span className={"chip"}>Codex</span><span className={"chip"}>Claude</span><span className={"chip"}>JSON Schema</span></div></div>
            <div className={"stats"}>
              <div className={"stat am"}><b>~186</b><span data-en={"tests"}>testes</span></div><div className={"stat"}><b>2</b><span data-en={"model vendors"}>fornecedores de modelo</span></div><div className={"stat mg"}><b>1</b><span data-en={"source of truth"}>fonte única</span></div>
              <div className={"stat w"}><span data-en={"Every numeric claim points to a recorded source, or it is not published"}>Toda afirmação numérica aponta para uma fonte registrada, ou não é publicada</span></div>
            </div></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"See the dossier"}>Ver o dossiê</span> <svg viewBox={"0 0 14 14"}><path d={"M2 7h10M8 3l4 4-4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/career-automation.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
        <div className={"face bk hud"} inert={true}><div className={"in"}>
          <div><span className={"where"} data-en={"Personal project, 2026, dossier"}>Projeto pessoal, 2026, dossiê</span></div>
          <ul className={"bl"}>
            <li><b data-en={"Cross-review:"}>Revisão cruzada:</b> <span data-en={"Codex drafts and Claude, from a different vendor, reviews; this reduces the blind spot of a single model."}>o Codex redige e o Claude, de outro fornecedor, revisa; isso reduz o ponto cego de um modelo só.</span></li>
            <li><b data-en={"Minimum score:"}>Nota mínima:</b> <span data-en={"keyword coverage is scored, and a score under the minimum escalates to a stronger model."}>a cobertura de palavras-chave recebe nota, e nota abaixo do mínimo escala para um modelo mais forte.</span></li>
            <li><b data-en={"Prompt injection guard:"}>Guard contra prompt injection:</b> <span data-en={"the job posting is untrusted input and is handled as data."}>o texto da vaga é entrada não confiável e é tratado como dado.</span></li>
            <li><b data-en={"ATS check:"}>Checagem ATS:</b> <span data-en={"one column, extractable text, 2 pages and numbers with backing."}>uma coluna, texto extraível, 2 páginas e números com lastro.</span></li>
            <li><b data-en={"One source:"}>Fonte única:</b> <span data-en={"a master YAML generates every variant, so there is no drift between versions."}>um YAML mestre gera todas as variantes, sem divergência entre versões.</span></li>
            <li><b data-en={"Structured output:"}>Saída estruturada:</b> <span data-en={"results follow a JSON Schema; an agent error never blocks delivery of the default resume."}>o resultado obedece a um JSON Schema; um erro do agente nunca bloqueia a entrega do currículo padrão.</span></li>
          </ul>
          <div className={"chips"}><span className={"chip"}>Python</span><span className={"chip"}>Codex</span><span className={"chip"}>Claude</span><span className={"chip"}>JSON Schema</span><span className={"chip"}>YAML</span></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"Back"}>Voltar</span> <svg viewBox={"0 0 14 14"}><path d={"M12 7H2M6 3L2 7l4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/career-automation.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
      </div></div></article>
 );
}
