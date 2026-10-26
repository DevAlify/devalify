import type { CSSProperties } from "react";

export default function Contact() {
  return (
<section className={"pan"} id={"contato"} style={{"paddingBottom": "90px"} as CSSProperties}>
  <div className={"wipe"} aria-hidden={"true"}></div>
  <div className={"wrap ctw"}>
    <div>
      <span className={"lbl"} data-en={"contact"}>contato</span>
      <h2 className={"gl"} data-en={"Let's build something that stays online."}>Vamos construir algo que fique no ar.</h2>
      <a className={"mail"} id={"mail"} href={"mailto:alify.alves@hotmail.com"} aria-label={"alify.alves@hotmail.com"}>alify.alves@hotmail.com</a>
      <div className={"links"}>
        <a className={"btn p"} href={"https://wa.me/5511973397668"} target={"_blank"} rel={"noopener"}><svg className={"wa"} viewBox={"0 0 24 24"} aria-hidden={"true"}><use href={"#i-wa"}></use></svg><span data-en={"Chat on WhatsApp"}>Falar no WhatsApp</span></a>
        <a className={"btn s"} href={"mailto:alify.alves@hotmail.com"}><span data-en={"Send e-mail"}>Enviar e-mail</span> <svg viewBox={"0 0 16 16"}><path d={"M4 12L12 4M5 4h7v7"}></path></svg></a>
        <a className={"btn s"} href={"https://linkedin.com/in/alify-silva"} target={"_blank"} rel={"noopener"}>LinkedIn <svg viewBox={"0 0 16 16"}><path d={"M4 12L12 4M5 4h7v7"}></path></svg></a>
        <a className={"btn m2"} href={"https://github.com/DevAlify"} target={"_blank"} rel={"noopener"}>GitHub <svg viewBox={"0 0 16 16"}><path d={"M4 12L12 4M5 4h7v7"}></path></svg></a>
      </div>
    </div>
    <article className={"hud rv"}><div className={"in"}><span className={"lbl"} data-en={"resume on request"}>currículo sob pedido</span>
      <p className={"lead"} style={{"fontSize": "var(--resume-note-size)"} as CSSProperties} data-en={"I do not publish resume PDFs. Ask and I send the version that fits the role, in Portuguese or English."}>Não publico PDFs de currículo. Peça e envio a versão adequada à vaga, em português ou inglês.</p>
      <ul className={"cvs"}>
        <li><a href={"https://wa.me/5511973397668"} target={"_blank"} rel={"noopener"}><span data-en={"Request on WhatsApp"}>Pedir pelo WhatsApp</span><span>WA</span></a></li>
        <li><a href={"mailto:alify.alves@hotmail.com?subject=Curr%C3%ADculo"}><span data-en={"Request by e-mail"}>Pedir por e-mail</span><span>@</span></a></li>
        <li><a href={"https://linkedin.com/in/alify-silva"} target={"_blank"} rel={"noopener"}><span data-en={"See LinkedIn profile"}>Ver perfil no LinkedIn</span><span>in</span></a></li>
      </ul></div></article>
  </div>
</section>
  );
}
