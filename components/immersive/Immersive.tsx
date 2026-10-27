import { Icon, Sprite } from '../ui/Sprite';
import RememberChoice from '../ui/RememberChoice';
import Cases from './Cases';
import Career from './Career';
import Contact from './Contact';
import Gates from './Gates';
import Header from './Header';
import Hero from './Hero';
import ImmersiveMotion from './ImmersiveMotion';
import Profile from './Profile';
import Stack from './Stack';
import Terminal from './Terminal';

/** Portrait channels: red, cyan (green + blue) and a cyan tint; added back together they reproduce the photo. */
const FILTERS = [
  { id: 'f-red', values: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0' },
  { id: 'f-cyan', values: '0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0' },
  { id: 'f-tint', values: '0 0 0 0 .098  0 0 0 0 .941  0 0 0 0 1  0 0 0 1 0' },
];

export default function Immersive() {
  return <>
    <a className="skip" href="#main" data-en="Skip to content">Pular para o conteúdo</a>
    <Sprite icons={['arrow-up-right', 'arrow-down', 'whatsapp', 'x', 'terminal', 'pause', 'play']}>
      {FILTERS.map(filter => <filter key={filter.id} id={filter.id} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={filter.values} /></filter>)}
    </Sprite>
    <canvas id="scene" aria-hidden="true" />
    <div className="vignette" aria-hidden="true" />
    <div className="dither" id="dither" aria-hidden="true" />
    <Header />
    <main id="main"><Hero /><Gates /><Cases /><Stack /><Career /><Profile /><Contact /></main>
    <footer><div className="wrap"><span>Alify Lopes, São Paulo</span><span data-en="Remote, hybrid or on-site">Remoto, híbrido ou presencial</span></div></footer>
    <Terminal />
    <button className="mbtn" id="mbtn" type="button" aria-pressed="false">
      <Icon id="pause" className="i-pause" /><Icon id="play" className="i-play" /><span data-en="pause motion">pausar movimento</span>
    </button>
    <div id="tip" role="tooltip" />
    <ImmersiveMotion />
    <RememberChoice kind="imersivo" />
  </>;
}
