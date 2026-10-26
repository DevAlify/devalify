import Portrait from "../effects/Portrait";
import Tunnel from "../effects/Tunnel";

export default function Hero() {
  return (
<section className={"hero"} id={"top"}>
  <Tunnel />
  <div className={"horizon"} aria-hidden={"true"}><i></i></div>
  <div className={"wrap"}>
    <div>
      <h1 id={"h1"} aria-label={"Do dado ao agente, em produção."}>Do dado ao agente, em <em>produção</em>.</h1>
      <p className={"sub rv"} data-en={"Alify Lopes, AI and software engineer in São Paulo. Agents, backend and interfaces with real tests."}>Alify Lopes, engenheiro de IA e software em São Paulo. Agentes, backend e interfaces com teste de verdade.</p>
      <div className={"cta rv"}>
        <a className={"btn p"} href={"#cases"}><span data-en={"See cases"}>Ver cases</span> <svg viewBox={"0 0 16 16"}><path d={"M4 12L12 4M5 4h7v7"}></path></svg></a>
        <a className={"btn s"} href={"#trajetoria"}><span data-en={"Career"}>Trajetória</span> <svg viewBox={"0 0 16 16"}><path d={"M8 3v10M4 9l4 4 4-4"}></path></svg></a>
        <a className={"btn m2"} href={"https://wa.me/5511973397668"} target={"_blank"} rel={"noopener"}><svg className={"wa"} viewBox={"0 0 24 24"} aria-hidden={"true"}><use href={"#i-wa"}></use></svg><span data-en={"Chat on WhatsApp"}>Falar no WhatsApp</span></a>
      </div>
    </div>
    <div className={"rv"}>
      <div className={"stage"} id={"stage"}>
        <div className={"c3"} id={"c3"}>
          <div className={"plate"}></div>
          <div className={"orb o2"}></div><div className={"orb o1"}></div>
          <i className={"brk a"}></i><i className={"brk b"}></i><i className={"brk c"}></i><i className={"brk d"}></i>
          <div className={"frame"}>
            <div className={"grid"}></div>
              <Portrait alt={"Retrato de Alify Lopes, sorrindo, com camiseta branca"} englishAlt={"Portrait of Alify Lopes, smiling, in a white T-shirt"} />
            <div className={"scan"}></div><div className={"glare"}></div>
          </div>
          <div className={"orb o3"}></div>
        </div>
      </div>
      <div className={"read"} role={"group"} aria-label={"Leituras do perfil"} data-en-label={"Profile readouts"}>
        <div>ID<b>Alify Lopes</b></div><div data-en={"Role<b>AI and software engineer</b>"}>Função<b>Engenheiro de IA e software</b></div>
        <div data-en={"Base<b>São Paulo, SP</b>"}>Base<b>São Paulo, SP</b></div><div data-en={"In tech<b>since 2017</b>"}>Em tecnologia<b>desde 2017</b></div>
        <div className={"st"} data-en={"Status<b>open to offers</b>"}>Status<b>aberto a propostas</b></div><div className={"st"} data-en={"Mode<b>remote, hybrid or on-site</b>"}>Modo<b>remoto, híbrido ou presencial</b></div>
      </div>
      <p className={"cap"}><span data-en={"portrait, São Paulo"}>retrato, São Paulo</span><span>4:5</span></p>
    </div>
  </div>
</section>
  );
}
