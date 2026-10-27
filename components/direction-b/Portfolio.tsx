import Marquee from '../content/Marquee';
import Telemetry from '../content/Telemetry';
import Inventory from '../content/Inventory';
import Education from '../content/Education';
import DirectionSections from './Sections';
import Motion from './Motion';
import nextConfig from '../../next.config';

const basePath = nextConfig.basePath ?? '';

export default function Portfolio() {
  return <>
    <a className="skip" href="#main" data-en="Skip to content">Pular para o conteúdo</a>
    <div id="reading-progress" aria-hidden="true" />
    <header><div className="wrap">
      <a className="logo" href="#top" aria-label="Alify Lopes, início" data-en-label="Alify Lopes, home">AL<b>.</b></a>
      <nav aria-label="Principal" data-en-label="Main">
        <a href="#pilares" data-en="Pillars">Pilares</a><a href="#cases">Cases</a>
        <a href="#trajetoria" data-en="Career">Trajetória</a>
        <a className="switch" href={`${basePath}/`} aria-label="Trocar experiência" data-en-label="Switch experience"><span data-en="Switch">Trocar</span><span className="desktop-label" data-en=" experience"> experiência</span></a>
        <span className="language" role="group" aria-label="Idioma" data-en-label="Language">
          <button type="button" data-language="pt" aria-pressed="true" lang="pt">PT</button>
          <button type="button" data-language="en" aria-pressed="false" lang="en">EN</button>
        </span>
        <a className="mail" href="https://wa.me/5511973397668" target="_blank" rel="noopener noreferrer"><span className="desktop-label" data-en="Chat on ">Falar no </span>WhatsApp</a>
      </nav>
    </div></header>
    <main id="main">
      <section className="hero" id="top"><div className="wrap">
        <div>
          <h1 className="name" aria-label="Alify Lopes"><span><i>Alify</i></span><span><i className="o">Lopes</i></span></h1>
          <div className="hero-copy rv">
            <p data-en="Alify Lopes, AI and software engineer in São Paulo. Agents, backend and interfaces with real tests.">Alify Lopes, engenheiro de IA e software em São Paulo. Agentes, backend e interfaces com teste de verdade.</p>
            <a className="btn" href="#cases"><span data-en="See cases">Ver cases</span><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" /></svg></a>
          </div>
        </div>
        <svg className="mono-art" viewBox="0 0 280 220" role="img" aria-label="Monograma AL" data-en-label="AL monogram">
          <g transform="translate(10 10)"><path className="m2" d="M26 196 L86 26 L146 196 M48 142 H124 M188 26 V196 H262" /></g>
          <path className="m1" pathLength="100" d="M20 190 L80 20 L140 190 M42 136 H118" />
          <path className="m1" pathLength="100" d="M182 20 V190 H256" />
        </svg>
      </div></section>
      <Marquee />
      <section className="profile"><div className="wrap profile-grid">
        <div className="portrait-mask"><picture>
          <source srcSet={`${basePath}/alify-b.avif`} type="image/avif" />
          <img className="portrait-photo" src={`${basePath}/alify-b.webp`} width="720" height="900" loading="lazy" alt="Retrato de Alify Lopes, sorrindo, com camiseta branca" data-en-alt="Portrait of Alify Lopes, smiling, in a white T-shirt" />
        </picture></div>
        <div className="profile-copy rv">
          <h2 data-en="From data to agent, in production.">Do dado ao agente, em produção.</h2>
          <dl><div><dt data-en="Role">Função</dt><dd data-en="AI and software engineer">Engenheiro de IA e software</dd></div>
            <div><dt data-en="Base">Base</dt><dd>São Paulo, SP</dd></div>
            <div><dt data-en="In tech">Em tecnologia</dt><dd data-en="since 2017">desde 2017</dd></div>
            <div><dt data-en="Status">Status</dt><dd data-en="open to offers">aberto a propostas</dd></div>
            <div><dt data-en="Mode">Modo</dt><dd data-en="remote, hybrid or on-site">remoto, híbrido ou presencial</dd></div></dl>
        </div>
      </div></section>
      <DirectionSections><Telemetry /><Inventory /><Education /></DirectionSections>
    </main>
    <footer><div className="wrap"><span>Alify Lopes, São Paulo</span><span data-en="Remote, hybrid or on-site">Remoto, híbrido ou presencial</span></div></footer>
    <Motion />
  </>;
}
