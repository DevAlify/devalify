'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Language } from '@/lib/locale';

const boot = {
  pt: ['núcleo carregado', 'agente N1: guardrails ativos', 'servidor MCP: somente leitura', 'evals: 51 casos, 10 selados', 'auditoria append-only no banco', 'túnel de dados online', 'alify@syphrax: sessão iniciada'],
  en: ['core loaded', 'L1 agent: guardrails on', 'MCP server: read-only', 'evals: 51 cases, 10 sealed', 'append-only audit in the database', 'data tunnel online', 'alify@syphrax: session started'],
};

export default function Preloader({ language }: { language: Language }) {
  const [closed, setClosed] = useState(false);
  const [line, setLine] = useState(0);
  const close = useCallback(() => {
    setClosed(previous => {
      if (!previous) window.dispatchEvent(new Event('portfolio:boot-complete'));
      return true;
    });
  }, []);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) { close(); return; }
    let current = 0;
    const interval = window.setInterval(() => {
      current++; setLine(Math.min(current, boot.pt.length));
      if (current > boot.pt.length) close();
    }, matchMedia('(max-width: 899px)').matches ? 120 : 230);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    const onReduce = () => { if (reduced.matches) close(); };
    window.addEventListener('keydown', onKey); reduced.addEventListener('change', onReduce);
    return () => { clearInterval(interval); window.removeEventListener('keydown', onKey); reduced.removeEventListener('change', onReduce); };
  }, [close]);
  if (closed) return null;
  const percent = Math.round(line / boot.pt.length * 100);
  return <div id="pre" onClick={close}><div className="b"><pre aria-hidden="true">{boot[language].slice(0, line).map((text, index) => <span key={text}><b>[ ok ]</b> {text}{index < line - 1 ? '\n' : ''}</span>)}</pre><div className="bar" aria-hidden="true"><i style={{ width: `${percent}%` }} /></div><div className="pc"><button type="button" onClick={close}>{language === 'pt' ? 'clique ou Esc para pular' : 'click or Esc to skip'}</button><span aria-hidden="true">{percent}%</span></div></div></div>;
}
