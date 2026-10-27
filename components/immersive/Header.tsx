import { Icon } from '../ui/Sprite';
import { ROUTES, WHATSAPP_URL, href } from '../../lib/site';

export default function Header() {
  return <header><div className="wrap">
    <a className="logo" translate="no" href="#top" aria-label="Alify Lopes, início" data-en-label="Alify Lopes, home">AL<i>_</i></a>
    <nav aria-label="Principal" data-en-label="Main"><ul>
      <li><a className="l" href="#numeros" data-en="Numbers">Números</a></li>
      <li><a className="l" href="#cases">Cases</a></li>
      <li><a className="l" href="#stack">Stack</a></li>
      <li><a className="l" href="#trajetoria" data-en="Career">Trajetória</a></li>
      <li className="keep"><a className="l" href={href(ROUTES.choice)} aria-label="Trocar experiência" data-en-label="Switch experience"><span data-en="Switch">Trocar</span><span className="sw-long" data-en=" experience"> experiência</span></a></li>
      <li className="keep"><span className="switch-lang" role="group" aria-label="Idioma" data-en-label="Language">
        <button type="button" data-language="pt" aria-pressed="true" lang="pt">PT</button>
        <button type="button" data-language="en" aria-pressed="false" lang="en">EN</button>
      </span></li>
      <li className="cta"><a className="btn btn-s hcta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" data-en-label="Chat on WhatsApp">
        <Icon id="whatsapp" /><span className="cta-text" data-en="Chat on WhatsApp">Falar no WhatsApp</span>
      </a></li>
    </ul></nav>
  </div></header>;
}
