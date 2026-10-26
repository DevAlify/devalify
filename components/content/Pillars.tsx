import type { CSSProperties } from "react";

export default function Pillars() {
  return (
<section className={"pan alt"} id={"pilares"}>
  <div className={"wipe"} aria-hidden={"true"}></div>
  <div className={"wrap"}>
    <div className={"hdr"}><span className={"lbl"} data-en={"fronts"}>frentes</span><h2 className={"gl"} data-en={"Three fronts, one criterion: production."}>Três frentes, um critério: produção.</h2></div>
    <div className={"acc"} id={"acc"}>
      <div className={"pane hud open"}><div className={"in"}>
        <svg className={"art"} viewBox={"0 0 240 240"} fill={"none"} aria-hidden={"true"}>
          <g stroke={"var(--cy)"} strokeOpacity={".6"} strokeWidth={"1.3"}><path className={"flow"} d={"M40 60L110 110M205 50L135 108M50 190L108 135M200 196L138 138M40 60L50 190M205 50L200 196"}></path></g>
          <circle className={"pulse"} cx={"120"} cy={"122"} r={"26"} fill={"var(--cy)"} fillOpacity={".14"} stroke={"var(--cy)"}></circle><circle cx={"120"} cy={"122"} r={"10"} fill={"var(--cy)"}></circle>
          <g fill={"var(--bg2)"} stroke={"var(--mag)"} strokeWidth={"1.4"}><rect x={"30"} y={"50"} width={"20"} height={"20"}></rect><rect x={"195"} y={"40"} width={"20"} height={"20"}></rect><rect x={"40"} y={"180"} width={"20"} height={"20"}></rect><rect x={"190"} y={"186"} width={"20"} height={"20"}></rect></g>
        </svg>
        <div className={"hd"}><h3><button type={"button"} aria-expanded={"true"} aria-controls={"p-ia"} data-en={"Applied AI"}>IA aplicada</button></h3>
          <div className={"det"} id={"p-ia"}><p data-en={"Agents with controlled data access, evaluated against real cases before gaining autonomy."}>Agentes com acesso controlado a dados, avaliados contra casos reais antes de ganhar autonomia.</p>
          <div className={"chips"}><span className={"chip"}>Claude</span><span className={"chip"}>Vercel AI SDK</span><span className={"chip"}>MCP</span><span className={"chip"}>RAG</span><span className={"chip"}>Evals</span><span className={"chip"}>Guardrails</span></div></div></div>
      </div></div>
      <div className={"pane hud"}><div className={"in"}>
        <svg className={"art"} viewBox={"0 0 240 240"} fill={"none"} aria-hidden={"true"}>
          <g stroke={"var(--cy)"} strokeWidth={"1.4"}><ellipse cx={"120"} cy={"48"} rx={"62"} ry={"18"} fill={"var(--bg2)"}></ellipse><path d={"M58 48v40c0 10 28 18 62 18s62-8 62-18V48"} fill={"var(--bg2)"}></path><path d={"M58 88v40c0 10 28 18 62 18s62-8 62-18V88"} fill={"var(--bg2)"}></path><path d={"M58 128v40c0 10 28 18 62 18s62-8 62-18v-40"} fill={"var(--bg2)"}></path></g>
          <path className={"flow"} d={"M120 200v30M60 20v-14M180 20v-14"} stroke={"var(--mag)"} strokeWidth={"1.4"}></path>
          <circle className={"pulse"} cx={"120"} cy={"106"} r={"4"} fill={"var(--cy)"}></circle><circle className={"pulse"} cx={"120"} cy={"146"} r={"4"} fill={"var(--mag)"} style={{"animationDelay": ".8s"} as CSSProperties}></circle><circle className={"pulse"} cx={"120"} cy={"64"} r={"4"} fill={"var(--amb)"} style={{"animationDelay": "1.6s"} as CSSProperties}></circle>
        </svg>
        <div className={"hd"}><h3><button type={"button"} aria-expanded={"false"} aria-controls={"p-be"}>Backend</button></h3>
          <div className={"det"} id={"p-be"}><p data-en={"APIs and queues that handle failure: idempotency, database-level auditing and SQL that holds up under volume."}>APIs e filas que lidam com falha: idempotência, auditoria no banco e SQL que aguenta volume.</p>
          <div className={"chips"}><span className={"chip"}>Node.js</span><span className={"chip"}>Fastify</span><span className={"chip"}>PostgreSQL</span><span className={"chip"}>pg-boss</span><span className={"chip"}>Java 21</span></div></div></div>
      </div></div>
      <div className={"pane hud"}><div className={"in"}>
        <svg className={"art"} viewBox={"0 0 240 240"} fill={"none"} aria-hidden={"true"}>
          <g stroke={"var(--cy)"} strokeWidth={"1.4"}><rect x={"38"} y={"30"} width={"150"} height={"104"} fill={"var(--bg2)"} transform={"skewY(-6)"}></rect><rect x={"56"} y={"62"} width={"150"} height={"104"} fill={"var(--art-middle)"} transform={"skewY(-6)"}></rect><rect x={"74"} y={"94"} width={"150"} height={"104"} fill={"var(--art-front)"} transform={"skewY(-6)"}></rect></g>
          <path className={"flow"} d={"M92 140h90M92 160h60"} stroke={"var(--mag)"} strokeWidth={"1.4"} transform={"skewY(-6)"}></path>
          <path d={"M150 170l22 8-9 4 7 12-6 3-7-12-7 6z"} fill={"var(--ink)"} className={"pulse"}></path>
        </svg>
        <div className={"hd"}><h3><button type={"button"} aria-expanded={"false"} aria-controls={"p-fs"}>Full Stack</button></h3>
          <div className={"det"} id={"p-fs"}><p data-en={"From the database to the interface, with end-to-end tests and a pipeline that blocks leaked secrets."}>Do banco à interface, com testes de ponta a ponta e pipeline que barra segredo vazado.</p>
          <div className={"chips"}><span className={"chip"}>Next.js 16</span><span className={"chip"}>React 19</span><span className={"chip"}>TypeScript</span><span className={"chip"}>Playwright</span></div></div></div>
      </div></div>
    </div>
  </div>
</section>
  );
}
