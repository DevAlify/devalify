import { tx } from './content/bi';
import { GATES } from './content/gates';

export default function Gates() {
  return <section className="gates" id="numeros" aria-labelledby="h-num">
    <div className="stage" id="gatesStage">
      <div className="wrap">
        <h2 id="h-num" className="dec-h" data-en="Numbers from real work">Números do trabalho real</h2>
        <ol className="gate-list" id="gateList">
          {GATES.map(gate => <li className="gate" key={gate.shown}>
            <b className="gnum" data-count={gate.count} data-prefix={gate.prefix} data-suffix={gate.suffix} data-fmt={gate.grouped ? '1' : undefined}>{gate.shown}</b>
            <p className="gcap" {...tx(gate.caption)}>{gate.caption.pt}</p>
            <p className="gsub" {...tx(gate.sub)}>{gate.sub.pt}</p>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
