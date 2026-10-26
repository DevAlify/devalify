'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { terminalContent } from '@/lib/terminal-content';
import { runCommand } from '@/lib/terminal';
import type { Language } from '@/lib/locale';

export default function Terminal({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const text = terminalContent[language];
  const close = useCallback(() => { setOpen(false); }, []);
  useEffect(() => {
    const show = () => {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    };
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('#tbtn, #tbtn2'));
    buttons.forEach(button => button.addEventListener('click', show));
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { event.preventDefault(); close(); }
      if (event.altKey && event.code === 'Backquote') { event.preventDefault(); if (open) close(); else show(); }
      if (event.key === 'Tab' && open && panel.current) {
        const elements = Array.from(panel.current.querySelectorAll<HTMLElement>('button,input'));
        const current = elements.indexOf(document.activeElement as HTMLElement);
        event.preventDefault(); elements[(current + (event.shiftKey ? -1 : 1) + elements.length) % elements.length]?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => { buttons.forEach(button => button.removeEventListener('click', show)); window.removeEventListener('keydown', key); };
  }, [open, close]);
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const background = Array.from(document.querySelectorAll<HTMLElement>('body > main, main, header, footer, .rail, .tbtn, .skip'));
    const previous = background.map(element => element.inert);
    background.forEach(element => element.inert = true);
    return () => {
      background.forEach((element, index) => element.inert = previous[index]);
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [lines]);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const value = input.current?.value ?? ''; const result = runCommand(value, language);
    if (input.current) input.current.value = '';
    if (result.action === 'clear') setLines([]);
    else if (result.action === 'exit') close();
    else if (result.action === 'print') setLines(previous => [...previous, `$ ${value.trim()}`, result.text]);
  };
  return <div id="term" ref={panel} role="dialog" aria-modal="true" aria-label={language === 'pt' ? 'Mini-terminal' : 'Mini terminal'} hidden={!open}><div className="box"><div className="hud s"><div className="in"><div className="top"><span>{text.prompt}</span><button type="button" onClick={close} aria-label={text.close}>x</button></div><div id="tout" ref={output} role="log" aria-live="polite"><div className="c">{text.hello}</div>{lines.map((line, index) => <div key={index} className={line.startsWith('$') ? 'c' : undefined}>{line}</div>)}</div><form autoComplete="off" onSubmit={submit}><label htmlFor="tin" className="sr">{text.lab}</label><span aria-hidden="true">$</span><input ref={input} id="tin" type="text" spellCheck={false} autoCapitalize="off" placeholder={text.ph} /></form></div></div></div></div>;
}
