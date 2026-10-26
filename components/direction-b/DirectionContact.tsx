export default function DirectionContact() {
  return <>
    <section className="ct" id="contato">
      <div className="wrap">
        <div>
          <h2 className="rv" data-en="Let's build something that stays online.">Vamos construir algo que fique no ar.</h2>
          <div className="addr rv">
            <a href="mailto:alify.alves@hotmail.com">alify.alves@hotmail.com</a>
            <a href="https://wa.me/5511973397668" target="_blank" rel="noopener noreferrer" data-en="Chat on WhatsApp">Falar no WhatsApp</a>
            <a href="https://linkedin.com/in/alify-silva" target="_blank" rel="noopener noreferrer">linkedin.com/in/alify-silva</a>
            <a href="https://github.com/DevAlify" target="_blank" rel="noopener noreferrer">github.com/DevAlify</a>
          </div>
          <div className="resume-note rv">
            <h3 data-en="Resume on request">Currículo sob pedido</h3>
            <p data-en="I do not publish resume PDFs. Ask and I send the version that fits the role, in Portuguese or English.">Não publico PDFs de currículo. Peça e envio a versão adequada à vaga, em português ou inglês.</p>
            <a href="mailto:alify.alves@hotmail.com?subject=Curr%C3%ADculo" data-en="Request by e-mail">Pedir por e-mail</a>
          </div>
        </div>
        <a className="ring rv" id="ring" href="mailto:alify.alves@hotmail.com">
          <span>
            <span data-en="Send e-mail">Enviar e-mail</span>
            <svg viewBox="0 0 34 34" aria-hidden="true">
              <path d="M7 27L27 7M11 7h16v16" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  </>;
}
