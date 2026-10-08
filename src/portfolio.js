const buttons = [...document.querySelectorAll('[data-language]')];
const elements = [...document.querySelectorAll('[data-pt][data-en]')];
function setLanguage(language) {
  const locale = language === 'en' ? 'en' : 'pt';
  document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR';
  elements.forEach(element => { element.textContent = element.dataset[locale]; });
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === locale)));
  document.querySelector('meta[name="description"]').content = locale === 'en'
    ? 'Alify Silva, mid-level software engineer. Backend, full stack, integrations and applied AI with TypeScript, Node.js, Java, React and SQL.'
    : 'Alify Silva, engenheiro de software pleno. Backend, full stack, integrações e IA aplicada com TypeScript, Node.js, Java, React e SQL.';
  try { sessionStorage.setItem('portfolio-language', locale); } catch { /* The page works without storage. */ }
}
buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
try { setLanguage(sessionStorage.getItem('portfolio-language') || 'pt'); } catch { setLanguage('pt'); }
