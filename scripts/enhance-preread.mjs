import { readFile, writeFile } from 'node:fs/promises';

const sourcePath = '/Users/piyushx17/Downloads/Finance_preread (1).html';
const targetPath = new URL('../public/index.html', import.meta.url);

let html = await readFile(sourcePath, 'utf8');

const extraCss = `

/* ===== ANTBOX LEARNING TOOL UPGRADE ===== */
:root {
  --cream: #f3f0e7;
  --cream-warm: #ebe5d8;
  --purple: #8f48b7;
  --purple-soft: #dac2e9;
  --purple-mist: #f2e7f7;
  --purple-deep: #5d287a;
  --ink: #141416;
  --ink-muted: #5f5d59;
  --ink-soft: #8d887f;
  --line: #ded7c8;
  --line-soft: #ebe4d7;
}

.brand-logo,
.topbar-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.brand-logo img,
.topbar-logo img {
  display: block;
  width: auto;
  object-fit: contain;
}

.brand-logo img { height: 54px; }
.topbar-logo img { height: 30px; }

.logo,
.logo .dot,
.topbar-logo .dot {
  display: none;
}

.hero-top {
  align-items: flex-start;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 28px 0 4px;
}

.hero-action {
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--cream);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.hero-action.secondary {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}

.tool-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ask-ant-btn,
.clear-search-btn,
.ant-send,
.ant-chip {
  font-family: 'Poppins', sans-serif;
  border: 1px solid var(--line);
  background: var(--white);
  color: var(--ink);
  cursor: pointer;
  transition: background .16s, border-color .16s, color .16s, transform .16s;
}

.ask-ant-btn {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--cream);
  border-radius: 6px;
  padding: 9px 13px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

body:not(.searching) .topbar {
  transform: translateY(0);
}

.topbar {
  background: rgba(243,240,231,0.97);
}

.hero .brand-logo {
  display: none;
}

.hero-top {
  justify-content: flex-end;
  margin-bottom: 64px;
}

.ask-ant-btn:hover,
.ant-send:hover {
  background: var(--purple-deep);
  border-color: var(--purple-deep);
  color: white;
}

.search-panel {
  display: none;
  position: fixed;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: min(980px, calc(100vw - 32px));
  max-height: calc(100vh - 92px);
  overflow: auto;
  z-index: 120;
  background: rgba(255,255,255,.98);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 18px 50px rgba(20,20,22,.16);
}

/* Unit reader mode */
section.learning-unit {
  padding: 28px 0;
}

section.learning-unit .section-head {
  margin-bottom: 0;
  cursor: pointer;
  position: relative;
  padding-right: 54px;
}

section.learning-unit .section-head::after {
  content: '+';
  position: absolute;
  right: 0;
  top: 8px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--ink);
  color: var(--cream);
  font-family: 'Century Gothic', sans-serif;
  font-size: 22px;
  line-height: 1;
}

section.learning-unit.unit-open {
  padding: 72px 0;
}

section.learning-unit.unit-open .section-head {
  margin-bottom: 48px;
}

section.learning-unit.unit-open .section-head::after {
  content: '−';
  background: var(--purple-deep);
}

section.learning-unit:not(.unit-open) .wrap > :not(.section-head) {
  display: none;
}

.toc {
  grid-template-columns: repeat(3, 1fr);
  padding: 0;
  overflow: hidden;
  gap: 0;
}

.toc a {
  display: block;
  padding: 20px;
  border-bottom: 1px solid var(--line-soft);
  border-right: 1px solid var(--line-soft);
}

.toc a span:first-child {
  display: block;
  font-family: 'Century Gothic', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.35;
  margin-bottom: 10px;
}

.toc a .n {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 24px;
  border-radius: 999px;
  background: var(--purple-mist);
}

.search-panel.visible { display: block; }

.search-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line-soft);
}

.search-title {
  font-family: 'Century Gothic', sans-serif;
  font-size: 16px;
  font-weight: 700;
}

.search-title span {
  color: var(--purple-deep);
}

.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line-soft);
}

.filter-btn {
  border: 1px solid var(--line);
  background: var(--cream);
  color: var(--ink-muted);
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.filter-btn.active {
  background: var(--purple-mist);
  border-color: var(--purple);
  color: var(--purple-deep);
}

.search-results {
  padding: 8px 20px 20px;
}

.search-result {
  display: block;
  text-decoration: none;
  color: var(--ink);
  border-bottom: 1px solid var(--line-soft);
  padding: 16px 0;
}

.search-result:hover .search-result-title {
  color: var(--purple-deep);
}

.search-result-meta {
  font-size: 10px;
  font-weight: 700;
  color: var(--purple-deep);
  text-transform: uppercase;
  letter-spacing: .12em;
  margin-bottom: 5px;
}

.search-result-title {
  font-family: 'Century Gothic', sans-serif;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 7px;
}

.search-result p {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.55;
}

mark {
  background: var(--purple-mist);
  color: var(--purple-deep);
  border-radius: 2px;
  padding: 0 2px;
}

.clear-search-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
}

.ant-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20,20,22,.28);
  opacity: 0;
  pointer-events: none;
  transition: opacity .18s;
  z-index: 130;
}

.ant-overlay.visible {
  opacity: 1;
  pointer-events: auto;
}

.ant-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: min(460px, 100vw);
  height: 100vh;
  background: var(--cream);
  border-left: 1px solid var(--line);
  z-index: 140;
  transform: translateX(100%);
  transition: transform .24s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(20,20,22,.18);
}

.ant-panel.visible { transform: translateX(0); }

.ant-head {
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.ant-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ant-avatar {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: var(--cream);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.ant-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ant-name h2 {
  font-size: 18px;
  line-height: 1;
}

.ant-name p {
  font-size: 12px;
  color: var(--ink-muted);
}

.ant-status {
  display: inline-flex;
  margin-top: 4px;
  border-radius: 999px;
  background: var(--purple-mist);
  color: var(--purple-deep);
  border: 1px solid var(--purple-soft);
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.ant-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: white;
  cursor: pointer;
  font-size: 20px;
}

.ant-messages {
  flex: 1;
  overflow: auto;
  padding: 18px 18px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ant-message {
  max-width: 92%;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px 14px;
  background: white;
  font-size: 14px;
  line-height: 1.55;
  white-space: pre-wrap;
}

.ant-message.user {
  margin-left: auto;
  background: var(--ink);
  color: var(--cream);
  border-color: var(--ink);
}

.ant-message.loading {
  color: var(--ink-muted);
  font-style: italic;
}

.ant-citations {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--line-soft);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ant-citations a {
  color: var(--purple-deep);
  background: var(--purple-mist);
  border: 1px solid var(--purple-soft);
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
}

.ant-quick {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 18px;
  border-top: 1px solid var(--line-soft);
}

.ant-chip {
  border-radius: 999px;
  padding: 7px 10px;
  white-space: nowrap;
  font-size: 12px;
}

.ant-chip:hover {
  border-color: var(--purple);
  color: var(--purple-deep);
}

.ant-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--line);
}

.ant-input {
  resize: none;
  min-height: 44px;
  max-height: 110px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 11px 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  background: white;
  color: var(--ink);
}

.ant-input:focus {
  outline: none;
  border-color: var(--purple);
}

.ant-send {
  align-self: end;
  height: 44px;
  border-radius: 8px;
  padding: 0 15px;
  background: var(--ink);
  color: var(--cream);
  border-color: var(--ink);
  font-weight: 700;
}

@media (max-width: 720px) {
  .brand-logo img { height: 44px; }
  .hero-top { gap: 18px; flex-direction: column; }
  .hero-meta { flex-wrap: wrap; }
  .tool-actions { width: 100%; }
  .ask-ant-btn { padding: 9px 11px; }
  .search-panel {
    top: 96px;
    width: calc(100vw - 20px);
    max-height: calc(100vh - 112px);
  }
  .search-panel-head {
    align-items: flex-start;
  }
  .toc { grid-template-columns: 1fr; }
  .ant-panel {
    width: 100vw;
    border-left: none;
  }
}
`;

const floatingUi = `
<!-- ===== FLOATING UI ===== -->
<div id="topbar" class="topbar">
  <div class="topbar-inner">
    <a href="/" class="topbar-logo" aria-label="The antBox Library"><img src="/assets/antbox-logo-cropped.png" alt="Antbox"></a>
    <div class="topbar-search">
      <input type="search" id="search" placeholder="Search the full preread..." autocomplete="off" spellcheck="false">
      <span class="search-hint">/</span>
    </div>
    <div class="topbar-progress">
      <div class="topbar-progress-text"><strong id="progress-count">0</strong> / 117 reviewed</div>
      <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
    </div>
    <button id="ask-ant" class="ask-ant-btn" type="button">Ask Ant</button>
  </div>
</div>`;

const searchPanel = `
<div id="search-panel" class="search-panel" aria-live="polite">
  <div class="search-panel-head">
    <div class="search-title"><span id="search-total">0</span> matches in the preread</div>
    <button id="clear-search" class="clear-search-btn" type="button" aria-label="Clear search">×</button>
  </div>
  <div class="search-filters" role="group" aria-label="Search filters">
    <button class="filter-btn active" type="button" data-filter="all">All</button>
    <button class="filter-btn" type="button" data-filter="term">Terms</button>
    <button class="filter-btn" type="button" data-filter="scenario">Scenarios</button>
    <button class="filter-btn" type="button" data-filter="cheat">Cheat Sheet</button>
  </div>
  <div id="search-results" class="search-results"></div>
</div>`;

const antPanel = `
<div id="ant-overlay" class="ant-overlay"></div>
<aside id="ant-panel" class="ant-panel" aria-label="Ask Ant assistant" aria-hidden="true">
  <div class="ant-head">
    <div class="ant-name">
      <div class="ant-avatar"><img src="/assets/ant-avatar.png" alt="Ant"></div>
      <div>
        <h2>Ant</h2>
        <p>Answers from this preread first</p>
        <span id="ant-status" class="ant-status">Checking mode</span>
      </div>
    </div>
    <button id="ant-close" class="ant-close" type="button" aria-label="Close Ant">×</button>
  </div>
  <div id="ant-messages" class="ant-messages">
    <div class="ant-message">Ask me about a finance term, scenario, journal entry, GST mismatch, close process, or anything in this preread.</div>
  </div>
  <div class="ant-quick">
    <button class="ant-chip" type="button">Explain this like I’m new to finance</button>
    <button class="ant-chip" type="button">Give me the journal entry</button>
    <button class="ant-chip" type="button">What can go wrong here?</button>
    <button class="ant-chip" type="button">Show related terms</button>
  </div>
  <form id="ant-form" class="ant-form">
    <textarea id="ant-input" class="ant-input" rows="1" placeholder="Ask Ant..."></textarea>
    <button class="ant-send" type="submit">Send</button>
  </form>
</aside>`;

const extraJs = `

// === Antbox upgraded full-document search ===
const searchPanel = document.getElementById('search-panel');
const searchResults = document.getElementById('search-results');
const searchTotal = document.getElementById('search-total');
const clearSearch = document.getElementById('clear-search');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
let activeFilter = 'all';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function highlightText(text, query) {
  const tokens = query.trim().split(/\\s+/).filter(Boolean).slice(0, 6);
  let escaped = escapeHtml(text);
  tokens.forEach(token => {
    const safe = token.replace(/[.*+?^\\$\\{\\}()|[\\]\\\\]/g, '\\\\$&');
    escaped = escaped.replace(new RegExp('(' + safe + ')', 'ig'), '<mark>$1</mark>');
  });
  return escaped;
}

async function runServerSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    searchPanel.classList.remove('visible');
    return;
  }
  searchPanel.classList.add('visible');
  searchResults.innerHTML = '<div class="search-result"><p>Searching the preread...</p></div>';
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: q, filters: [activeFilter] })
    });
    const data = await response.json();
    searchTotal.textContent = data.total;
    if (!data.results.length) {
      searchResults.innerHTML = '<div class="search-result"><div class="search-result-title">No matches</div><p>Try a broader finance term or ask Ant.</p></div>';
      return;
    }
    searchResults.innerHTML = data.results.map(item => '<a class="search-result" href="#' + escapeHtml(item.anchor) + '"><div class="search-result-meta">' + escapeHtml(item.section) + ' · ' + escapeHtml(item.type) + '</div><div class="search-result-title">' + highlightText(item.title, q) + '</div><p>' + highlightText(item.snippet, q) + '</p></a>').join('');
  } catch (error) {
    searchResults.innerHTML = '<div class="search-result"><div class="search-result-title">Search unavailable</div><p>The local page filter still works, but the server search could not respond.</p></div>';
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    runServerSearch();
  });
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  runFilter();
  searchPanel.classList.remove('visible');
  searchInput.focus();
});

searchPanel.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  searchPanel.classList.remove('visible');
});

searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    runFilter();
    runServerSearch();
  }, 80);
});

// === Unit reader mode ===
const unitSections = Array.from(document.querySelectorAll('section.learning-unit'));

function openUnit(id, shouldScroll = true, forceOpen = false) {
  const target = document.getElementById(id);
  if (!target || !target.classList.contains('learning-unit')) return;
  const shouldOpen = forceOpen || !target.classList.contains('unit-open');
  unitSections.forEach(section => {
    const open = section === target && shouldOpen;
    section.classList.toggle('unit-open', open);
    const head = section.querySelector('.section-head');
    if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  if (shouldScroll && shouldOpen) {
    const offset = topbar ? 78 : 0;
    window.scrollTo({ top: Math.max(0, target.offsetTop - offset), behavior: 'smooth' });
  }
}

unitSections.forEach(section => {
  const head = section.querySelector('.section-head');
  if (!head) return;
  head.setAttribute('role', 'button');
  head.setAttribute('tabindex', '0');
  head.setAttribute('aria-expanded', section.classList.contains('unit-open') ? 'true' : 'false');
  head.addEventListener('click', () => openUnit(section.id, false));
  head.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openUnit(section.id, false);
    }
  });
});

document.addEventListener('click', event => {
  const link = event.target.closest('.toc a[href^="#"], #rail a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  if (!document.getElementById(id)?.classList.contains('learning-unit')) return;
  event.preventDefault();
  event.stopPropagation();
  openUnit(id, true, true);
}, true);

// === Ant assistant ===
const antButton = document.getElementById('ask-ant');
const heroAntButton = document.getElementById('hero-ask-ant');
const antPanel = document.getElementById('ant-panel');
const antOverlay = document.getElementById('ant-overlay');
const antClose = document.getElementById('ant-close');
const antMessages = document.getElementById('ant-messages');
const antForm = document.getElementById('ant-form');
const antInput = document.getElementById('ant-input');
const antStatus = document.getElementById('ant-status');

async function loadAntStatus() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    antStatus.textContent = data.mode || 'Local preread only';
  } catch {
    antStatus.textContent = 'Local preread only';
  }
}

function openAnt(seed) {
  antPanel.classList.add('visible');
  antOverlay.classList.add('visible');
  antPanel.setAttribute('aria-hidden', 'false');
  antInput.focus();
  if (seed) antInput.value = seed;
}

function closeAnt() {
  antPanel.classList.remove('visible');
  antOverlay.classList.remove('visible');
  antPanel.setAttribute('aria-hidden', 'true');
}

function appendMessage(text, role, meta) {
  const el = document.createElement('div');
  el.className = 'ant-message' + (role ? ' ' + role : '');
  el.textContent = text;
  if (meta && ((meta.citations && meta.citations.length) || (meta.webCitations && meta.webCitations.length))) {
    const citations = document.createElement('div');
    citations.className = 'ant-citations';
    (meta.citations || []).slice(0, 4).forEach(citation => {
      const a = document.createElement('a');
      a.href = '#' + citation.anchor;
      a.textContent = citation.title;
      citations.appendChild(a);
    });
    (meta.webCitations || []).slice(0, 3).forEach(citation => {
      const a = document.createElement('a');
      a.href = citation.url;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.textContent = 'From web: ' + citation.title;
      citations.appendChild(a);
    });
    el.appendChild(citations);
  }
  antMessages.appendChild(el);
  antMessages.scrollTop = antMessages.scrollHeight;
  return el;
}

async function askAnt(question) {
  appendMessage(question, 'user');
  const loading = appendMessage('Ant is checking the preread first...', 'loading');
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    loading.remove();
    if (data.providerLabel) antStatus.textContent = data.providerLabel;
    appendMessage(data.answer || 'I could not answer that yet.', '', data);
  } catch (error) {
    loading.remove();
    appendMessage('I could not reach the assistant backend. The preread search is still available.', '');
  }
}

antButton.addEventListener('click', () => openAnt());
if (heroAntButton) heroAntButton.addEventListener('click', () => openAnt());
loadAntStatus();
antClose.addEventListener('click', closeAnt);
antOverlay.addEventListener('click', closeAnt);

document.querySelectorAll('.ant-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const selected = window.getSelection().toString().trim();
    openAnt((selected ? selected + '\\n\\n' : '') + chip.textContent);
  });
});

antForm.addEventListener('submit', event => {
  event.preventDefault();
  const question = antInput.value.trim();
  if (!question) return;
  antInput.value = '';
  askAnt(question);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && antPanel.classList.contains('visible')) closeAnt();
});
`;

html = html.replace('</style>', () => `${extraCss}\n</style>`);
html = html.replace(/<!-- ===== FLOATING UI ===== -->[\s\S]*?<div id="topbar" class="topbar">[\s\S]*?<\/div>\s*<\/div>/, () => floatingUi);
html = html.replace('<div id="search-empty" class="search-empty">', () => `${searchPanel}\n${antPanel}\n\n<div id="search-empty" class="search-empty">`);
html = html.replace('<div class="logo"><span class="dot"></span>antbox</div>', '<a href="/" class="brand-logo" aria-label="The antBox Library"><img src="/assets/antbox-logo-cropped.png" alt="Antbox"></a>');
html = html.replace('<span class="pill">Day 02</span>\n        <span>Pre-Read · Finance</span>', '<span>Pre-Read · Finance</span>');
html = html.replace('<title>Day 2 · Pre-Read · Finance Associate</title>', '<title>Antbox · Finance Pre-Read</title>');
html = html.replace('antbox · finance capsule · pre-read v1 · day 02', 'antbox · finance capsule · pre-read');
html = html.replace(/<p class="hero-sub">([\s\S]*?)<\/p>/, (match) => `${match}<div class="hero-actions"><button id="hero-ask-ant" class="hero-action" type="button">Ask Ant</button><a class="hero-action secondary" href="#intro">Choose a unit</a></div>`);
html = html.replace(/<section class="section( alt)?" id="(s0[1-9]|scenarios|cheat)">/g, (_match, alt = '', id) => `<section class="section${alt} learning-unit" id="${id}">`);
html = html.replace("const TOTAL_TERMS = 117;", "const TOTAL_TERMS = 117;");
html = html.replace("    term.dataset.termId = id;", "    term.dataset.termId = id;\n    term.id = 'term-' + id;");
html = html.replace("  searchInput.addEventListener('input', () => {\n    clearTimeout(searchTimer);\n    searchTimer = setTimeout(runFilter, 60);\n  });", "  // Replaced by the upgraded server-backed search listener below.");
html = html.replace("  document.querySelector('.topbar-logo').addEventListener('click', (e) => {\n    e.preventDefault();\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  });", "  // Logo links to the antBox Library home.");
html = html.replace('})();\n</script>', () => `${extraJs}\n})();\n</script>`);

await writeFile(targetPath, html);
console.log(`Wrote ${targetPath.pathname}`);
