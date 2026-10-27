import { bi, same, type Bi } from './bi';

export type Job = { period: Bi; role: Bi; org: Bi; summary: Bi; highlights: Bi[] };

/** Career, newest first. The 466 orders appear here and in the numbers, never as a case. */
export const JOBS: Job[] = [
  {
    period: bi('09/2026 a hoje', '09/2026 to present'), role: bi('Cofundador e CTO', 'Co-founder and CTO'), org: same('syphrax'),
    summary: bi('Software, IA e segurança. Construí o ERP, o revisor de PR com LLM e a infraestrutura da empresa.', "Software, AI and security. I built the ERP, the LLM PR reviewer and the company's infrastructure."),
    highlights: [bi('15 módulos, 68 tabelas, ~2.240 testes', '15 modules, 68 tables, ~2,240 tests'), bi('RAG com pgvector e CRM com IA para clientes', 'RAG with pgvector and an AI CRM for clients'), bi('VPS, Coolify, Cloudflare e backup cifrado', 'VPS, Coolify, Cloudflare and encrypted backup')],
  },
  {
    period: bi('07/2026 a 09/2026', '07/2026 to 09/2026'), role: bi('Engenheiro de IA', 'AI Engineer'), org: same('GE Finance'),
    summary: bi('Projeto interno de agentes de IA no suporte de um SaaS financeiro e fiscal para marketplaces.', 'Internal AI agent project in the support of a financial and tax SaaS for marketplaces.'),
    highlights: [bi('Principal autor do agente N1 e do servidor MCP', 'Primary author of the L1 agent and the MCP server'), bi('Evals, guardrails, RAG e 42 checks de CI', 'Evals, guardrails, RAG and 42 CI checks')],
  },
  {
    period: bi('08/2025 a 06/2026', '08/2025 to 06/2026'), role: bi('Analista de Sustentação Sênior', 'Senior Support Analyst'), org: same('GE Finance'),
    summary: bi('Sustentação N2/N3 em .NET/C#, Python, AWS Lambda, SQL Server e Elastic.', 'L2/L3 support on .NET/C#, Python, AWS Lambda, SQL Server and Elastic.'),
    highlights: [bi('466 pedidos destravados e causa raiz documentada', '466 orders unblocked and the root cause documented'), bi('Registro de incidentes N3 adotado pelo time', 'L3 incident register adopted by the team')],
  },
  {
    period: bi('01/2025 a 06/2025', '01/2025 to 06/2025'), role: bi('Desenvolvedor Full Stack Java', 'Full Stack Java Developer'), org: same('WTEAM, freelance'),
    summary: bi('Fase final de um projeto para cliente do setor bancário: Java 21, Spring, React e SQL.', 'Final phase of a project for a banking-sector client: Java 21, Spring, React and SQL.'),
    highlights: [bi('Cerca de 30% menos tempo de resposta', 'About 30% less response time'), bi('Deploys por ambiente, menos falhas em homologação', 'Per-environment deployments, fewer staging failures')],
  },
  {
    period: bi('08/2022 a 12/2024', '08/2022 to 12/2024'), role: bi('Analista de Suporte Sênior', 'Senior Support Analyst'), org: same('Arcólor Brasil'),
    summary: bi('Responsável técnico pela TI: ERP TOTVS Protheus, SQL Server e Azure.', 'Technical lead for IT: TOTVS Protheus ERP, SQL Server and Azure.'),
    highlights: [bi('Cerca de 100 usuários, 300 dispositivos e equipe de até 5', 'About 100 users, 300 devices and a team of up to 5'), bi('Help desk N1/N2 e troca de servidores com plano de retorno', 'L1/L2 help desk and server replacement with a rollback plan')],
  },
  {
    period: bi('03/2017 a 07/2022', '03/2017 to 07/2022'), role: bi('Pleno, Assistente e Jovem Aprendiz', 'Support Analyst, IT Assistant and IT Apprentice'), org: same('Arcólor Brasil'),
    summary: bi('Pleno (09/2020 a 07/2022), Assistente de TI (10/2018 a 09/2020) e Jovem Aprendiz (03/2017 a 09/2018).', 'Support Analyst (09/2020 to 07/2022), IT Assistant (10/2018 to 09/2020) and IT Apprentice (03/2017 to 09/2018).'),
    highlights: [bi('Firewall SonicWall, VPN e Active Directory', 'SonicWall firewall, VPN and Active Directory'), bi('Zabbix, inventário de rede e SQL Server', 'Zabbix, network inventory and SQL Server')],
  },
];
