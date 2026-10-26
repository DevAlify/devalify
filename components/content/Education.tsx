import type { CSSProperties } from "react";

export default function Education() {
  return (
<section className={"pan alt"} id={"formacao"}>
  <div className={"wipe"} aria-hidden={"true"}></div>
  <div className={"wrap"}>
    <div className={"hdr"}><span className={"lbl"} data-en={"profile"}>perfil</span><h2 className={"gl"} data-en={"Education, languages and availability"}>Formação, idiomas e disponibilidade</h2></div>
    <div className={"fi"}>
      <article className={"hud rv"}><div className={"in"}><span className={"lbl"} data-en={"education"}>formação</span>
        <ul className={"edu"}>
          <li><b data-en={"Associate Degree in Systems Analysis and Development"}>Tecnólogo em Análise e Desenvolvimento de Sistemas</b><span data-en={"Faculdade Impacta, 2020 to 2021"}>Faculdade Impacta, 2020 a 2021</span></li>
          <li><b data-en={"Full Stack Development, 240h"}>Desenvolvimento Full Stack, 240h</b><span data-en={"Udemy: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker and CI/CD"}>Udemy: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker e CI/CD</span></li>
          <li><b data-en={"Java Elite, UNIPDS (postgraduate program, not completed)"}>Java Elite, UNIPDS (pós-graduação interrompida)</b><span data-en={"Spring Boot, REST APIs, messaging and software architecture"}>Spring Boot, APIs REST, mensageria e arquitetura de software</span></li>
          <li><b data-en={"Java Programmer I to III, 100h"}>Java Programmer I a III, 100h</b><span data-en={"Impacta: Java SE, object-oriented programming, JDBC and MySQL"}>Impacta: Java SE, orientação a objetos, JDBC e MySQL</span></li>
        </ul></div></article>
      <div className={"col2"}>
        <article className={"hud rv"}><div className={"in"}><span className={"lbl"} data-en={"languages"}>idiomas</span>
          <div className={"lang"}><b data-en={"Portuguese"}>Português</b><span data-en={"native"}>nativo</span></div><div className={"lang"}><b data-en={"English"}>Inglês</b><span data-en={"B2, technical reading and writing"}>B2, leitura e escrita técnica</span></div></div></article>
        <article className={"hud rv"}><div className={"in"}><span className={"lbl"} data-en={"availability"}>disponibilidade</span><p className={"av"} style={{"marginTop": "12px"} as CSSProperties} data-en={"Open to offers"}>Aberto a propostas</p><p className={"note"} style={{"color": "var(--mute)", "fontSize": "14px", "marginTop": "10px", "fontFamily": "var(--sans)"} as CSSProperties} data-en={"São Paulo, Brazil. Remote, hybrid or on-site."}>São Paulo, SP. Remoto, híbrido ou presencial.</p></div></article>
      </div>
    </div>
  </div>
</section>
  );
}
