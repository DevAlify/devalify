import type { CSSProperties } from "react";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Telemetry from "./Telemetry";
import Pillars from "./Pillars";
import Cases from "./Cases";
import Inventory from "./Inventory";
import Career from "./Career";
import Education from "./Education";
import Contact from "./Contact";

export default function PortfolioContent() {
 return <>
<svg width={"0"} height={"0"} style={{"position": "absolute"} as CSSProperties} aria-hidden={"true"}><symbol id={"i-wa"} viewBox={"0 0 24 24"}><path fillRule={"evenodd"} d={"M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.3 15.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 0 1 12 3.8zM8.6 7.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4l-2-1c-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.5-.4-.5-.6-.5z"}></path></symbol></svg><a className={"skip"} href={"#main"} data-en={"Skip to content"}>Pular para o conteúdo</a><header><div className={"wrap"}>
  <a className={"logo"} href={"#top"} aria-label={"Alify Lopes, início"} data-en-label={"Alify Lopes, home"}>AL<b>_</b></a>
  <nav className={"navc"} aria-label={"Principal"} data-en-label={"Main"}>
    <a className={"l"} href={"#numeros"}><span className={"roll"}><span data-en={"Numbers"}>Números</span><span aria-hidden={"true"} data-en={"Numbers"}>Números</span></span></a>
    <a className={"l"} href={"#cases"}><span className={"roll"}><span>Cases</span><span aria-hidden={"true"}>Cases</span></span></a>
    <a className={"l"} href={"#inventario"}><span className={"roll"}><span>Stack</span><span aria-hidden={"true"}>Stack</span></span></a>
    <a className={"l"} href={"#trajetoria"}><span className={"roll"}><span data-en={"Career"}>Trajetória</span><span aria-hidden={"true"} data-en={"Career"}>Trajetória</span></span></a>
    <span className={"lt"} role={"group"} aria-label={"Idioma"} data-en-label={"Language"}><button type={"button"} data-language={"pt"} aria-pressed={"true"} lang={"pt"}>PT</button><button type={"button"} data-language={"en"} aria-pressed={"false"} lang={"en"}>EN</button></span>
    <a className={"m"} href={"https://wa.me/5511973397668"} target={"_blank"} rel={"noopener"}><svg viewBox={"0 0 24 24"} aria-hidden={"true"}><use href={"#i-wa"}></use></svg><span data-en={"Chat on WhatsApp"}>Falar no WhatsApp</span></a>
  </nav>
</div></header><nav className={"rail"} aria-label={"Seções"} data-en-label={"Sections"}><a href={"#top"} aria-label={"Início"} data-en-label={"Home"}></a><a href={"#numeros"} aria-label={"Números"} data-en-label={"Numbers"}></a><a href={"#pilares"} aria-label={"Pilares"} data-en-label={"Pillars"}></a><a href={"#cases"} aria-label={"Cases"}></a><a href={"#inventario"} aria-label={"Stack"}></a><a href={"#trajetoria"} aria-label={"Trajetória"} data-en-label={"Career"}></a><a href={"#formacao"} aria-label={"Formação"} data-en-label={"Education"}></a><a href={"#contato"} aria-label={"Contato"} data-en-label={"Contact"}></a></nav><button className={"tbtn"} id={"tbtn"} type={"button"} aria-haspopup={"dialog"}>terminal [Alt+~]</button>
<main id="main">
<Hero />
<Marquee />
<Telemetry />
<Pillars />
<Cases />
<Inventory />
<Career />
<Education />
<Contact />
</main>
<footer><div className={"wrap"}><span>Alify Lopes, São Paulo</span><span data-en={"Remote, hybrid or on-site"}>Remoto, híbrido ou presencial</span><button className={"tlink"} id={"tbtn2"} type={"button"} aria-haspopup={"dialog"}>terminal [Alt+~]</button></div></footer>
</>;
}
