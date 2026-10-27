import { bi, type Bi } from './bi';

export type Gate = { count: number; prefix?: string; suffix?: string; grouped?: boolean; shown: string; caption: Bi; sub: Bi };

/** The four numbers the scroll flies through. `shown` is the server-rendered text, in Portuguese. */
export const GATES: Gate[] = [
  { count: 430, suffix: '+', shown: '430+', caption: bi('testes no servidor MCP somente leitura', 'tests on the read-only MCP server'),
    sub: bi('31 consultas SQL fechadas e 1.067 colunas validadas contra o schema.', '31 fixed SQL queries and 1,067 columns validated against the schema.') },
  { count: 51, shown: '51', caption: bi('casos de eval reais, de 545 chamados', 'real eval cases, from 545 tickets'),
    sub: bi('10 selados (20%) decidem quando o agente ganha autonomia.', '10 sealed (20%) decide when the agent earns autonomy.') },
  { count: 466, shown: '466', caption: bi('pedidos presos por dois meses, destravados', 'orders stuck for two months, released'),
    sub: bi('Causa raiz rastreada em uma fila de integração.', 'Root cause traced to an integration queue.') },
  { count: 2240, prefix: '~', grouped: true, shown: '~2.240', caption: bi('casos de teste no ERP próprio', 'test cases in the in-house ERP'),
    sub: bi('231 arquivos Vitest e 24 specs Playwright, em 15 módulos.', '231 Vitest files and 24 Playwright specs, across 15 modules.') },
];
