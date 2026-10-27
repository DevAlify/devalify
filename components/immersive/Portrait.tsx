import { basePath } from '../../lib/site';

type Layer = { className: string; alt?: string; altEn?: string };

/** The same picture four times: the base, two color channels for the RGB split and a tinted scan layer. */
function Picture({ className, alt = '', altEn }: Layer) {
  const base = !alt ? {} : { fetchPriority: 'high' as const };
  return <picture>
    <source srcSet={`${basePath}/alify-b.avif`} type="image/avif" />
    <img className={className} src={`${basePath}/alify-b.webp`} width="720" height="900" alt={alt} aria-hidden={alt ? undefined : true} decoding="async" data-en-alt={altEn} {...base} />
  </picture>;
}

export default function Portrait() {
  return <div className="portrait" id="portrait">
    <div className="glow" aria-hidden="true" />
    <div className="stack">
      <Picture className="base" alt="Retrato de Alify Lopes, sorrindo, com camiseta branca" altEn="Portrait of Alify Lopes, smiling, in a white T-shirt" />
      <Picture className="layer l-r" /><Picture className="layer l-c" /><Picture className="layer scan" />
    </div>
    <div className="line" aria-hidden="true" />
    <svg className="brk" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8V0H8" /><path d="M92 0H100V8" /><path d="M100 92V100H92" /><path d="M8 100H0V92" /></svg>
  </div>;
}
