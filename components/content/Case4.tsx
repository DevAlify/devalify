
export default function Case4() {
 return (
<article className={"cd rv"} data-cd=""><div className={"tilt"}><div className={"flip"}>
        <div className={"face fr hud"}><div className={"in"}>
          <div className={"fgrid"}>
            <div><span className={"where"}>syphrax, 2026</span><h3 data-en={"Genoma: ERP installed on the customer's own infrastructure"}>Genoma: ERP instalado na infraestrutura do cliente</h3>
              <p className={"sm"} data-en={"ERP for small businesses that runs on the customer's own server, so the customer owns the data. Several installations that stay updatable without losing that isolation."}>ERP para pequenos negócios que roda no servidor do próprio cliente, que fica dono dos dados. Várias instalações que continuam atualizáveis sem perder esse isolamento.</p>
              <div className={"chips"}><span className={"chip"}>Next.js 16</span><span className={"chip"}>React 19</span><span className={"chip"}>TypeScript</span><span className={"chip"}>PostgreSQL</span><span className={"chip"}>Docker</span></div></div>
            <div className={"stats"}>
              <div className={"stat am"}><b>8</b><span data-en={"business modules"}>módulos de negócio</span></div><div className={"stat mg"}><b data-en={"~2,800"}>~2.800</b><span data-en={"test cases"}>casos de teste</span></div><div className={"stat"}><b>v1.0</b><span data-en={"validated product"}>produto validado</span></div>
              <div className={"stat w"}><span data-en={"Multi-store, NF-e, 2FA, daily backup and a deploy that rolls itself back"}>Multi-loja, NF-e, 2FA, backup diário e deploy que se desfaz sozinho</span></div>
            </div></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"See the dossier"}>Ver o dossiê</span> <svg viewBox={"0 0 14 14"}><path d={"M2 7h10M8 3l4 4-4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/genoma-erp.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
        <div className={"face bk hud"} inert={true}><div className={"in"}>
          <div><span className={"where"} data-en={"syphrax, 2026, dossier"}>syphrax, 2026, dossiê</span></div>
          <ul className={"bl"}>
            <li><b data-en={"Product:"}>Produto:</b> <span data-en={"small shops usually pick between spreadsheets and a SaaS where the vendor holds the data; Genoma runs on the customer's server instead."}>pequenos comércios costumam escolher entre planilhas e um SaaS em que os dados ficam com o fornecedor; o Genoma roda no servidor do cliente.</span></li>
            <li><b data-en={"Updates:"}>Atualizações:</b> <span data-en={"a versioned core with child installations; changes are backward compatible, so a new version does not break an installation that has not updated yet."}>núcleo versionado e instalações-filhas; as mudanças são compatíveis com versões anteriores, então uma versão nova não quebra quem ainda não atualizou.</span></li>
            <li><b data-en={"Multi-store:"}>Multi-loja:</b> <span data-en={"isolation between stores is enforced by the database, not only by the application."}>o isolamento entre lojas é imposto pelo banco, não só pela aplicação.</span></li>
            <li><b data-en={"Operations:"}>Operação:</b> <span data-en={"daily encrypted backup with an automated monthly restore test, health checks, and a deploy that rolls back on its own if a check fails."}>backup diário cifrado com teste mensal de restauração automatizado, checagens de saúde e deploy que volta atrás sozinho se uma checagem falha.</span></li>
            <li><b data-en={"Tax:"}>Fiscal:</b> <span data-en={"NF-e handled by a separate service, keeping the fiscal part isolated."}>NF-e em serviço separado, que isola a parte fiscal.</span></li>
            <li><b data-en={"Security:"}>Segurança:</b> <span data-en={"authentication with 2FA."}>autenticação com 2FA.</span></li>
            <li><b data-en={"Status:"}>Estado:</b> <span data-en={"validated product, v1.0. I make no claim of customers in production."}>produto validado, v1.0. Não afirmo clientes em produção.</span></li>
          </ul>
          <div className={"chips"}><span className={"chip"}>Next.js 16</span><span className={"chip"}>PostgreSQL</span><span className={"chip"}>pg-boss</span><span className={"chip"}>Docker Compose</span><span className={"chip"}>PHP</span></div>
          <div className={"fbs"}><button className={"fb"} type={"button"}><span data-en={"Back"}>Voltar</span> <svg viewBox={"0 0 14 14"}><path d={"M12 7H2M6 3L2 7l4 4"}></path></svg></button>
          <a className={"fb a2"} href={"https://github.com/DevAlify/engineering-cases/blob/main/cases/genoma-erp.md"} target={"_blank"} rel={"noopener"}><span data-en={"Read the case"}>Ler o case</span> <svg viewBox={"0 0 14 14"}><path d={"M3 11L11 3M4 3h7v7"}></path></svg></a></div></div></div>
      </div></div></article>
 );
}
