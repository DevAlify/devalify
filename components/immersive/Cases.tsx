import { Icon } from '../ui/Sprite';
import { caseUrl } from '../../lib/site';
import { bi, tx } from './content/bi';
import { CASES, type CaseData } from './content/cases';

function CaseRow({ data, position, open }: { data: CaseData; position: number; open: boolean }) {
  const id = `c${position}`;
  const name = bi(`${data.title.pt}, ${data.meta.pt}, ${data.figure.pt}`, `${data.title.en}, ${data.meta.en}, ${data.figure.en}`);
  return <li className={open ? 'case rv is-open' : 'case rv'} data-case>
    <h3 className="case-h"><button type="button" className="case-btn" id={`${id}-b`} aria-expanded={open} aria-controls={`${id}-p`} aria-label={name.pt} data-en-label={name.en}>
      <span className="c-meta" {...tx(data.meta)}>{data.meta.pt}</span>
      <span className="c-title" {...tx(data.title)}>{data.title.pt}</span>
      <span className="c-fig" {...tx(data.figure)}>{data.figure.pt}</span>
      <span className="c-ico" aria-hidden="true" />
    </button></h3>
    <div className="case-panel" id={`${id}-p`} role="region" aria-labelledby={`${id}-b`}><div className="case-body"><i className="sweep" aria-hidden="true" /><div className="case-inner">
      <div className="pad" />
      <div className="case-main fx">
        <p className="case-lead" {...tx(data.lead)}>{data.lead.pt}</p>
        <div className="figs">{data.facts.map(fact => <div className="fig" key={fact.label.pt}>
          <b {...tx(fact.value)}>{fact.value.pt}</b><span {...tx(fact.label)}>{fact.label.pt}</span>
        </div>)}</div>
        <p className="note" {...tx(data.note)}>{data.note.pt}</p>
      </div>
      <div className="case-side fx">
        <ul className="bl">{data.points.map(point => <li key={point.label.pt}>
          <b {...tx(point.label)}>{point.label.pt}</b> <span {...tx(point.text)}>{point.text.pt}</span>
        </li>)}</ul>
        <ul className="tags">{data.tags.map(tag => typeof tag === 'string' ? <li key={tag}>{tag}</li> : <li key={tag.pt} {...tx(tag)}>{tag.pt}</li>)}</ul>
        <a className="case-link" href={caseUrl(data.slug)} target="_blank" rel="noopener noreferrer"><span data-en="Read the case">Ler o case</span><Icon id="arrow-up-right" /></a>
      </div>
    </div></div></div>
  </li>;
}

export default function Cases() {
  return <section className="sec" id="cases" aria-labelledby="h-cases"><div className="wrap">
    <h2 id="h-cases" className="dec-h">Cases</h2>
    <p className="lead rv" data-en="Open each row to see the numbers and the full stack.">Abra cada linha para ver os números e a stack completos.</p>
    <ol className="cases-list">{CASES.map((data, index) => <CaseRow key={data.slug} data={data} position={index + 1} open={index === 0} />)}</ol>
  </div></section>;
}
