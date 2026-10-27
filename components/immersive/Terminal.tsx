'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { TERMINAL_INTRO, runCommand } from '../../lib/terminal-commands';
import { currentLanguage } from '../motion/dom';
import { Icon } from '../ui/Sprite';

type Line = { tone: 'prompt' | 'error' | 'plain'; text: string };

/** Everything behind the dialog becomes inert while it is open. */
const BACKGROUND = 'main,header,footer,#tbtn,#mbtn,.skip';
const TONE_CLASS = { prompt: 'c', error: 'e', plain: undefined } as const;
const isToggle = (event: KeyboardEvent) => event.altKey && (event.code === 'Backquote' || event.key === '~' || (event.code === 'Quote' && event.key === 'Dead'));

/** Mini terminal (Alt+~ or the button): help, whoami, stack, cases, timeline, edu, contact, clear, exit. */
export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const opener = useRef<Element | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => { opener.current = document.activeElement; setOpen(true); }, []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { event.preventDefault(); hide(); return; }
      if (isToggle(event)) { event.preventDefault(); if (open) hide(); else show(); return; }
      if (event.key === 'Tab' && open) {
        // Focus stays between the close button and the command line.
        const order = [closeButton.current, input.current];
        const index = order.findIndex(element => element === document.activeElement);
        event.preventDefault();
        order[(index + (event.shiftKey ? -1 : 1) + order.length) % order.length]?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, show, hide]);

  useEffect(() => {
    if (!open) return;
    const background = Array.from(document.querySelectorAll<HTMLElement>(BACKGROUND));
    background.forEach(element => { element.inert = true; });
    setLines(current => (current.length ? current : [{ tone: 'prompt', text: TERMINAL_INTRO[currentLanguage()] }]));
    const timer = window.setTimeout(() => input.current?.focus(), 30);
    return () => {
      window.clearTimeout(timer);
      background.forEach(element => { element.inert = false; });
      if (opener.current instanceof HTMLElement) opener.current.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => { const log = output.current; if (log) log.scrollTop = log.scrollHeight; }, [lines]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const typed = value.trim();
    const result = runCommand(typed, currentLanguage());
    setValue('');
    if (result.type === 'noop') return;
    history.current.push(typed); cursor.current = history.current.length;
    if (result.type === 'clear') { setLines([]); return; }
    const prompt: Line = { tone: 'prompt', text: `$ ${typed}` };
    if (result.type === 'exit') { setLines(current => [...current, prompt]); hide(); return; }
    setLines(current => [...current, prompt, { tone: result.type === 'error' ? 'error' : 'plain', text: result.text ?? '' }]);
  };

  const browseHistory = (event: ReactKeyboardEvent) => {
    const entries = history.current;
    if (!entries.length || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
    event.preventDefault();
    cursor.current = event.key === 'ArrowUp' ? Math.max(0, cursor.current - 1) : Math.min(entries.length, cursor.current + 1);
    setValue(entries[cursor.current] ?? '');
  };

  return <>
    <button className="tbtn" id="tbtn" type="button" aria-haspopup="dialog" onClick={show}><Icon id="terminal" />terminal<span className="k">&nbsp;[Alt+~]</span></button>
    <div id="term" translate="no" role="dialog" aria-modal="true" aria-label="Mini-terminal" hidden={!open}>
      <div className="box"><div className="in">
        <div className="top">
          <span data-en="alify@syphrax:~$ (Esc closes)">alify@syphrax:~$ (Esc fecha)</span>
          <button type="button" id="tclose" ref={closeButton} onClick={hide} aria-label="Fechar terminal" data-en-label="Close terminal"><Icon id="x" /></button>
        </div>
        <div id="tout" ref={output} role="log" aria-live="polite">{lines.map((line, index) => <div key={index} className={TONE_CLASS[line.tone]}>{line.text}</div>)}</div>
        <form id="tform" autoComplete="off" onSubmit={submit}>
          <label htmlFor="tin" className="sr" data-en="Command">Comando</label><span aria-hidden="true">$</span>
          <input id="tin" ref={input} name="command" type="text" enterKeyHint="go" spellCheck={false} autoCapitalize="off" placeholder="digite help" data-en-placeholder="type help" value={value} onChange={event => setValue(event.target.value)} onKeyDown={browseHistory} />
        </form>
      </div></div>
    </div>
  </>;
}
