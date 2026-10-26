import Case1 from "./Case1";
import Case2 from "./Case2";
import Case3 from "./Case3";
import Case4 from "./Case4";
import Case5 from "./Case5";

export default function Cases() {
  return (
<section className={"pan"} id={"cases"}>
  <div className={"wipe"} aria-hidden={"true"}></div>
  <div className={"wrap"}>
    <div className={"hdr"}><span className={"lbl"}>cases</span><h2 className={"gl"} data-en={"Cases with numbers"}>Cases com números</h2><p className={"lead"} data-en={"Click \"See the dossier\" for the full stack and the technical detail of each one."}>Clique em "Ver o dossiê" para a stack completa e o detalhe técnico de cada um.</p></div>
    <div className={"cards"}>

      <Case1></Case1>

      <Case2></Case2>

      <Case3></Case3>

      <Case4></Case4>

      <Case5></Case5>

    </div>
    <div className={"more"}><a className={"btn s"} href={"https://github.com/DevAlify/engineering-cases"} target={"_blank"} rel={"noopener"}><span data-en={"All cases"}>Todos os cases</span> <svg viewBox={"0 0 16 16"}><path d={"M4 12L12 4M5 4h7v7"}></path></svg></a><p data-en={"Case studies describe my contribution and scope. Company source code stays private."}>Os estudos de caso descrevem minha contribuição e o escopo. O código das empresas continua privado.</p></div>
  </div>
</section>
  );
}
