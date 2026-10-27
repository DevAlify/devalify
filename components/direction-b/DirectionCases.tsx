import Case1 from "./Case1";
import Case2 from "./Case2";
import Case3 from "./Case3";
import Case4 from "./Case4";
import Case5 from "./Case5";
export default function DirectionCases() {  
return <section className="cases" id="cases">
    <div className="wrap head">
      <h2 className="rv" data-en="Cases with numbers">Cases com números</h2>
    </div>
    <div className="pan" id="pan">
      <div className="track" id="track">
        <Case1 />
        <Case2 />
        <Case3 />
        <Case4 />
        <Case5 />
        <div className="pad" aria-hidden="true" />
      </div>
    </div>
    <div className="wrap more">
      <a className="case-link" href="https://github.com/DevAlify/engineering-cases" target="_blank" rel="noopener noreferrer" data-en="All cases">Todos os cases</a>
      <p data-en="Case studies describe my contribution and scope. Company source code stays private.">Os estudos de caso descrevem minha contribuição e o escopo. O código das empresas continua privado.</p>
    </div>
  </section>;
}
