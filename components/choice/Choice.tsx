import { Icon, Sprite } from '../ui/Sprite';
import { ROUTES, WHATSAPP_URL, href } from '../../lib/site';
import ChoiceMotion from './ChoiceMotion';
import { bricolage } from './font';

// The immersive page opens its iris only when it knows the visitor came from here.
const IMMERSIVE_HREF = `${href(ROUTES.immersive)}?from=selecao`;
const EDITORIAL_HREF = href(ROUTES.editorial);

export default function Choice() {
  return <div className={`choice-page ${bricolage.variable}`}>
    <a className="skip" href="#choices" data-en="Skip to the options">Pular para as opções</a>
    <Sprite icons={['arrow-right', 'whatsapp']}>
      <linearGradient id="sg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900">
        <stop offset="0" style={{ stopColor: 'var(--cy)' }} /><stop offset=".5" style={{ stopColor: 'var(--seam-mid)' }} /><stop offset="1" style={{ stopColor: 'var(--ac)' }} />
      </linearGradient>
    </Sprite>

    <header className="top">
      <p className="who" data-en="Alify Lopes · AI and software engineer">Alify Lopes · Engenheiro de IA e software</p>
      <div className="tools">
        <a className="wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" data-en-label="Chat on WhatsApp">
          <Icon id="whatsapp" /><span data-en="Chat on WhatsApp">Falar no WhatsApp</span>
        </a>
        <div className="lang" role="group" aria-label="Idioma" data-en-label="Language">
          <button type="button" data-language="pt" aria-pressed="true" lang="pt">PT</button>
          <button type="button" data-language="en" aria-pressed="false" lang="en">EN</button>
        </div>
      </div>
    </header>

    <main id="choices" className="stage" data-active="">
      <a className="continue r-im" id="resumeIm" href={IMMERSIVE_HREF} data-kind="imersivo" hidden>
        <span data-en="Continue in Immersive">Continuar no Imersivo</span><Icon id="arrow-right" />
      </a>
      <a className="continue r-ed" id="resumeEd" href={EDITORIAL_HREF} data-kind="editorial" hidden>
        <span data-en="Continue in Editorial">Continuar no Editorial</span><Icon id="arrow-right" />
      </a>

      <a className="choice c-im" id="cIm" href={IMMERSIVE_HREF} data-kind="imersivo" aria-label="Imersivo" data-en-label="Immersive" aria-describedby="dIm">
        <canvas className="bg" id="grid" aria-hidden="true" />
        <div className="spot" aria-hidden="true" />
        <div className="copy" id="copyIm">
          <h2 className="t im" id="tIm" data-en="Immersive">Imersivo</h2>
          <i className="rule" aria-hidden="true" />
          <p className="d" id="dIm" data-en="Minimal cyberpunk. Scroll-guided depth, text that decodes and a hidden terminal.">Cyberpunk minimalista. Profundidade guiada pelo scroll, texto que se decodifica e um terminal escondido.</p>
          <ul className="perks" aria-hidden="true">
            <li data-en="Scroll-guided camera">Câmera guiada pelo scroll</li>
            <li data-en="Grid that reacts to the cursor">Grade que reage ao cursor</li>
            <li data-en="Terminal with Alt+~">Terminal com Alt+~</li>
          </ul>
          <span className="go"><span data-en="Open immersive version">Abrir versão imersiva</span><Icon id="arrow-right" /></span>
        </div>
      </a>

      <a className="choice c-ed" id="cEd" href={EDITORIAL_HREF} data-kind="editorial" aria-label="Editorial" aria-describedby="dEd">
        <div className="spot" aria-hidden="true" />
        <svg className="mono" id="mono" viewBox="0 0 280 220" aria-hidden="true">
          <g transform="translate(10 10)"><path className="m2" d="M26 196 L86 26 L146 196 M48 142 H124 M188 26 V196 H262" /></g>
          <path className="m1" d="M20 190 L80 20 L140 190 M42 136 H118" />
          <path className="m1" d="M182 20 V190 H256" />
        </svg>
        <div className="copy" id="copyEd">
          <h2 className="t ed" id="tEd">Editorial</h2>
          <i className="rule" aria-hidden="true" />
          <p className="d" id="dEd" data-en="Big type, calm rhythm and direct reading. The same cases, no noise.">Tipografia grande, ritmo calmo e leitura direta. Os mesmos cases, sem ruído.</p>
          <ul className="perks" aria-hidden="true">
            <li data-en="Cases in a horizontal panel">Cases em painel horizontal</li>
            <li data-en="Monogram drawn in strokes">Monograma desenhado em traço</li>
            <li data-en="Portrait that gains color as you scroll">Retrato que ganha cor ao rolar</li>
          </ul>
          <span className="go"><span data-en="Open editorial version">Abrir versão editorial</span><Icon id="arrow-right" /></span>
        </div>
      </a>

      <h1 className="hint" id="hint" data-en="Choose how to view the portfolio">Escolha como ver o portfólio</h1>
      <svg className="seam" id="seamSvg" aria-hidden="true"><line id="seamL" x1="0" y1="0" x2="0" y2="0" /></svg>
      <div className="dither" id="dither" aria-hidden="true" />
    </main>

    <div className="veil" id="veil" aria-hidden="true">
      <div className="v-bg" id="vBg" /><i className="v-line" id="vLine" />
      <div className="v-cur" id="vCur" /><div className="v-cur2" id="vCur2" />
      <div className="v-title" id="vTitle" />
    </div>
    <ChoiceMotion />
  </div>;
}
