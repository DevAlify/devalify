import { tx } from './content/bi';
import { EDUCATION } from './content/profile';

export default function Profile() {
  return <section className="sec" id="perfil" aria-labelledby="h-perfil"><div className="wrap">
    <h2 id="h-perfil" className="dec-h" data-en="Education, languages and availability">Formação, idiomas e disponibilidade</h2>
    <div className="perfil">
      <div className="rv">
        <h3 data-en="Education">Formação</h3>
        <ul className="edu">{EDUCATION.map(course => <li key={course.title.pt}>
          <b {...tx(course.title)}>{course.title.pt}</b><span {...tx(course.detail)}>{course.detail.pt}</span>
        </li>)}</ul>
      </div>
      <div className="rv">
        <h3 data-en="Languages">Idiomas</h3>
        <div className="lang"><b data-en="Portuguese">Português</b><span data-en="native">nativo</span></div>
        <div className="lang"><b data-en="English">Inglês</b><span data-en="B2, technical reading and writing">B2, leitura e escrita técnica</span></div>
        <p className="avail" data-en="Open to offers">Aberto a propostas</p>
        <p className="avail-sub" data-en="São Paulo, Brazil. Remote, hybrid or on-site.">São Paulo, SP. Remoto, híbrido ou presencial.</p>
      </div>
    </div>
  </div></section>;
}
