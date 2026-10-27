import { tx } from './content/bi';
import { SKILL_GROUPS } from './content/skills';

export default function Stack() {
  return <section className="sec" id="stack" aria-labelledby="h-stack"><div className="wrap">
    <h2 id="h-stack" className="dec-h" data-en="Stack and skills">Stack e competências</h2>
    <p className="lead rv" data-en="Hover or focus the underlined items to see where each one was used.">Passe o mouse ou foque nos itens sublinhados para ver onde cada um foi usado.</p>
    <div className="sk" id="skills" translate="no">
      {SKILL_GROUPS.map(group => <div className="sk-row rv" data-group={group.id} key={group.id}>
        <h3 className="sk-name" {...tx(group.name)}>{group.name.pt}</h3>
        <ul className="sk-list">{group.items.map(item => <li key={item.label.pt}>
          {item.tip
            ? <button type="button" className="sk-item has-tip" data-tip={item.tip.pt} data-en-tip={item.tip.en} {...tx(item.label)}>{item.label.pt}</button>
            : <span className="sk-item" {...tx(item.label)}>{item.label.pt}</span>}
        </li>)}</ul>
      </div>)}
    </div>
  </div></section>;
}
