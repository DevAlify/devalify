
export default function Marquee() {
  const words = ['TypeScript', 'Claude', 'MCP', 'RAG', 'Evals', 'Node.js', 'PostgreSQL', 'pgvector', 'Next.js 16', 'AWS Lambda', 'Playwright', 'Java 21', 'SQL Server', 'Cloudflare'];
  return (
<div className={"mq"} role={"img"} aria-label={"Tecnologias"} data-en-label={"Technologies"}><div className={"mqt"} id={"mqt"} aria-hidden={"true"}>{[...words, ...words].map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</div></div>
  );
}
