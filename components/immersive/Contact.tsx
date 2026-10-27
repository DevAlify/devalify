import { Icon } from '../ui/Sprite';
import { WHATSAPP_URL } from '../../lib/site';

const EMAIL = 'alify.alves@hotmail.com';
const OUTBOUND = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function Contact() {
  return <section className="sec contact" id="contato" aria-labelledby="h-contato"><div className="wrap">
    <h2 id="h-contato" className="dec-h" data-en="Let's build something that stays online.">Vamos construir algo que fique no ar.</h2>
    <div className="cta rv">
      <a className="btn btn-p" href={WHATSAPP_URL} {...OUTBOUND}><Icon id="whatsapp" /><span data-en="Chat on WhatsApp">Falar no WhatsApp</span><Icon id="arrow-up-right" className="go" /></a>
    </div>
    <div className="addr rv">
      <a href={`mailto:${EMAIL}`}>{EMAIL}<Icon id="arrow-up-right" className="go" /></a>
      <a href="https://linkedin.com/in/alify-silva" {...OUTBOUND}>linkedin.com/in/alify-silva<Icon id="arrow-up-right" className="go" /></a>
      <a href="https://github.com/DevAlify" {...OUTBOUND}>github.com/DevAlify<Icon id="arrow-up-right" className="go" /></a>
    </div>
    <p className="resume rv">
      <span data-en="I do not publish resume PDFs. Ask and I send the version that fits the role, in Portuguese or English.">Não publico PDFs de currículo. Peça e envio a versão adequada à vaga, em português ou inglês.</span>{' '}
      <a href={`mailto:${EMAIL}?subject=Curr%C3%ADculo`} data-en="Request by e-mail">Pedir por e-mail</a>
    </p>
  </div></section>;
}
