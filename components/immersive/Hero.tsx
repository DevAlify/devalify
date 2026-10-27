import { Icon } from '../ui/Sprite';
import { WHATSAPP_URL } from '../../lib/site';
import Portrait from './Portrait';

export default function Hero() {
  return <section className="hero" id="top"><div className="wrap">
    <div className="hero-copy" id="heroCopy">
      <h1 id="h1" aria-label="Do dado ao agente, em produção." data-en-label="From data to agent, in production.">
        <span className="ln"><span className="dec" data-en="From data">Do dado</span></span>
        <span className="ln"><span className="dec" data-en="to agent,">ao agente,</span></span>
        <span className="ln"><span className="dec" data-en="in">em</span> <em className="dec" data-en="production">produção</em><span className="dec">.</span></span>
      </h1>
      <p className="sub" id="sub" data-en="Alify Lopes, AI and software engineer in São Paulo. Agents, backend and interfaces with real tests.">Alify Lopes, engenheiro de IA e software em São Paulo. Agentes, backend e interfaces com teste de verdade.</p>
      <div className="cta" id="heroCta">
        <a className="btn btn-p" href="#cases"><span data-en="See cases">Ver cases</span><Icon id="arrow-down" className="dn" /></a>
        <a className="btn btn-s" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Icon id="whatsapp" /><span data-en="Chat on WhatsApp">Falar no WhatsApp</span></a>
      </div>
    </div>
    <Portrait />
  </div></section>;
}
