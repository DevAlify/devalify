import assert from 'node:assert/strict';
import test from 'node:test';
import { CHOICE_TEXTS } from './page-texts.ts';

// The root URL is the one printed on resumes and LinkedIn: its title and previews stay the professional ones
// (the visible "Escolha como ver o portfólio" lives on the page, not in the metadata).
test('the root keeps the professional title, description and preview text in both languages', () => {
  assert.deepEqual(CHOICE_TEXTS.pt, {
    title: 'Alify Lopes | Engenheiro de IA e software',
    description: 'Alify Lopes, engenheiro de IA e software em São Paulo. Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.',
    og: 'Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.',
  });
  assert.equal(CHOICE_TEXTS.en.title, 'Alify Lopes | AI and Software Engineer');
  assert.doesNotMatch(`${CHOICE_TEXTS.en.description} ${CHOICE_TEXTS.en.og}`, /choose|escolha/i);
});
