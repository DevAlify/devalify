import { tx } from './content/bi';
import { JOBS } from './content/career';

export default function Career() {
  return <section className="sec" id="trajetoria" aria-labelledby="h-traj"><div className="wrap">
    <h2 id="h-traj" className="dec-h" data-en="From infrastructure to software.">Da infraestrutura ao software.</h2>
    <div className="tl" id="tl">
      <svg className="tl-svg" id="tlSvg" aria-hidden="true"><path className="rail" id="tlRail" d="M18 0V10" /><path id="tlDraw" d="M18 0V10" /></svg>
      <i className="tl-head" id="tlHead" aria-hidden="true" />
      {JOBS.map(job => <article className="job rv" key={job.period.pt}>
        <time {...tx(job.period)}>{job.period.pt}</time>
        <h3><span {...tx(job.role)}>{job.role.pt}</span><small>{job.org.pt}</small></h3>
        <p {...tx(job.summary)}>{job.summary.pt}</p>
        <ul>{job.highlights.map(item => <li key={item.pt} {...tx(item)}>{item.pt}</li>)}</ul>
      </article>)}
    </div>
  </div></section>;
}
