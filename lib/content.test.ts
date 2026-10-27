import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from '../components/immersive/content/cases.ts';
import { JOBS } from '../components/immersive/content/career.ts';
import { GATES } from '../components/immersive/content/gates.ts';
import { EDUCATION } from '../components/immersive/content/profile.ts';
import { SKILL_GROUPS } from '../components/immersive/content/skills.ts';

/** Every bilingual text of the immersive page, flattened. */
function texts(): { pt: string; en: string }[] {
  const found: { pt: string; en: string }[] = [];
  const visit = (value: unknown) => {
    if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === 'object') {
      const record = value as Record<string, unknown>;
      if (typeof record.pt === 'string' && typeof record.en === 'string') found.push({ pt: record.pt, en: record.en });
      else Object.values(record).forEach(visit);
    }
  };
  visit([CASES, JOBS, GATES, EDUCATION, SKILL_GROUPS]);
  return found;
}

test('the five approved cases keep their write-ups and the L3 support case stays out', () => {
  assert.deepEqual(CASES.map(item => item.slug), ['ai-support-agent', 'llm-pr-reviewer', 'syphrax-erp', 'genoma-erp', 'career-automation']);
  assert.equal(CASES.some(item => /l3-support/.test(item.slug)), false);
});

test('the numbers the scroll flies through are the verified ones', () => {
  assert.deepEqual(GATES.map(gate => gate.count), [430, 51, 466, 2240]);
  assert.equal(GATES[3].grouped, true);
});

test('stack keeps the resume skills', () => {
  const labels = SKILL_GROUPS.flatMap(group => group.items.map(item => item.label.pt));
  for (const skill of ['LangGraph', 'A2A (Agent2Agent)', 'Model Context Protocol (MCP)', 'Vitest']) assert(labels.includes(skill), skill);
});

test('every text has both languages and sentences are really translated', () => {
  const all = texts();
  assert(all.length > 250, `${all.length} texts`);
  for (const { pt, en } of all) {
    assert(pt.trim() && en.trim(), `empty text: ${pt}`);
    if (pt.length > 40) assert.notEqual(pt, en, `untranslated: ${pt}`);
  }
});

test('no text carries content that must stay out of the portfolio', () => {
  for (const { pt, en } of texts()) assert.doesNotMatch(`${pt} ${en}`, /krono|3,76|tribut|crédito|credit tax/i, `${pt} / ${en}`);
});
