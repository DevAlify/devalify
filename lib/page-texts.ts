import type { Language } from './locale.ts';

/** Title, description and og:description of a route, per language. The server renders Portuguese; the hook swaps it. */
export type PageText = { title: string; description: string; og: string };
export type PageTexts = Record<Language, PageText>;

export const EDITORIAL_TEXTS: PageTexts = {
  pt: { title: 'Alify Lopes | Engenheiro de IA e software', description: 'Alify Lopes, engenheiro de IA e software em São Paulo. Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.', og: 'Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.' },
  en: { title: 'Alify Lopes | AI and Software Engineer', description: 'Alify Lopes, AI and software engineer in São Paulo, Brazil. Agents with LLMs, RAG and MCP, backend and tested interfaces, with a production background.', og: 'Agents with LLMs, RAG and MCP, backend and tested interfaces, with a production background.' },
};

/** The root URL is the one on resumes and LinkedIn, so its title and previews stay the professional ones. */
export const CHOICE_TEXTS: PageTexts = EDITORIAL_TEXTS;

export const IMMERSIVE_TEXTS: PageTexts = {
  pt: { title: 'Alify Lopes | Imersivo', description: 'Alify Lopes, engenheiro de IA e software em São Paulo. Versão imersiva do portfólio: agentes com LLMs, RAG e MCP, backend e interfaces com testes.', og: 'Versão imersiva do portfólio: agentes com LLMs, RAG e MCP, backend e interfaces com testes.' },
  en: { title: 'Alify Lopes | Immersive', description: 'Alify Lopes, AI and software engineer in São Paulo, Brazil. Immersive version of the portfolio: agents with LLMs, RAG and MCP, backend and tested interfaces.', og: 'Immersive version of the portfolio: agents with LLMs, RAG and MCP, backend and tested interfaces.' },
};
