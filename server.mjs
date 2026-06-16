import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { pathToFileURL } from 'node:url';

const PORT = Number(process.env.PORT || 4173);
const ROOT = process.env.NETLIFY ? process.cwd() : new URL('.', import.meta.url).pathname;
const PUBLIC_DIR = join(ROOT, 'public');
const INDEX_PATH = join(PUBLIC_DIR, 'index.html');
const APTITUDE_PATH = join(PUBLIC_DIR, 'aptitude.html');

const corpusCache = new Map();

await loadEnv();

async function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const raw = await readFile(join(ROOT, file), 'utf8');
      raw.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eq = trimmed.indexOf('=');
        if (eq < 1) return;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      });
    } catch {}
  }
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon'
};

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, {
    'content-type': type,
    'cache-control': 'no-store'
  });
  res.end(Buffer.isBuffer(body) || typeof body === 'string' ? body : JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw);
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|h[1-6]|li|dt|dd)>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&#8377;|₹/g, '₹')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(html, regex) {
  const match = html.match(regex);
  return match ? stripTags(match[1]) : '';
}

function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9₹%+.-]+/g, ' ').trim();
}

function termsFrom(html) {
  const chunks = [];
  const termRegex = /<div class="term">([\s\S]*?<dl class="term-rows">[\s\S]*?<\/dl>\s*<\/div>)/g;
  let match;
  while ((match = termRegex.exec(html))) {
    const block = match[1];
    const termNumber = firstMatch(block, /<span class="term-num">([\s\S]*?)<\/span>/);
    const title = firstMatch(block, /<h3 class="term-name">([\s\S]*?)<\/h3>/);
    const definition = firstMatch(block, /<p class="term-def">([\s\S]*?)<\/p>/);
    const rows = [...block.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)]
      .map(row => `${stripTags(row[1])}: ${stripTags(row[2])}`);
    const text = [definition, ...rows].filter(Boolean).join(' ');
    if (!termNumber || !title || !text) continue;
    chunks.push({
      id: `term-${termNumber}`,
      type: 'term',
      title: `Term ${termNumber}: ${title}`,
      anchor: `term-${termNumber}`,
      section: 'Terms',
      termNumber,
      text
    });
  }
  return chunks;
}

function scenariosFrom(html) {
  const section = html.match(/<section[^>]*id="scenarios"[^>]*>([\s\S]*?)<section[^>]*id="cheat"[^>]*>/);
  if (!section) return [];
  const chunks = [];
  const scenarioParts = section[1].split(/(?=<div class="scenario">)/g).filter(part => part.includes('scenario-head'));
  scenarioParts.forEach((block, index) => {
    const title = firstMatch(block, /<h3>([\s\S]*?)<\/h3>/) || `Scenario ${index + 1}`;
    const tag = firstMatch(block, /<span class="scenario-tag">([\s\S]*?)<\/span>/);
    const steps = [...block.matchAll(/<div class="scenario-step">([\s\S]*?)(?=<div class="scenario-step">|<\/div>\s*<\/div>\s*<\/div>)/g)]
      .map(step => stripTags(step[1]))
      .filter(Boolean);
    const text = [tag, ...steps].filter(Boolean).join(' ');
    if (!text) return;
    chunks.push({
      id: `scenario-${index + 1}`,
      type: 'scenario',
      title,
      anchor: 'scenarios',
      section: 'Scenarios',
      text
    });
  });
  return chunks;
}

function cheatFrom(html) {
  const section = html.match(/<section[^>]*id="cheat"[^>]*>([\s\S]*?)<footer>/);
  if (!section) return [];
  const chunks = [];
  const cards = [...section[1].matchAll(/<div class="cheat">([\s\S]*?)<\/div>/g)];
  cards.forEach((card, index) => {
    const block = card[1];
    const title = firstMatch(block, /<h4>([\s\S]*?)<\/h4>/) || `Cheat Sheet ${index + 1}`;
    const text = stripTags(block);
    chunks.push({
      id: `cheat-${index + 1}`,
      type: 'cheat',
      title: `Cheat Sheet: ${title}`,
      anchor: 'cheat',
      section: 'Cheat Sheet',
      text
    });
  });
  return chunks;
}

function diagramsFrom(html) {
  const chunks = [];
  const diagrams = [...html.matchAll(/<div class="diagram">([\s\S]*?)<\/div>\s*(?=<div class="terms">|<div class="term"|<\/div>\s*<\/section>)/g)];
  diagrams.forEach((diagram, index) => {
    const block = diagram[1];
    const title = firstMatch(block, /<div class="diagram-title">([\s\S]*?)<\/div>/) || `Diagram ${index + 1}`;
    const sub = firstMatch(block, /<div class="diagram-sub">([\s\S]*?)<\/div>/);
    const note = firstMatch(block, /<div class="diagram-note">([\s\S]*?)<\/div>/);
    const text = [sub, note].filter(Boolean).join(' ');
    if (!text) return;
    chunks.push({
      id: `diagram-${index + 1}`,
      type: 'diagram',
      title,
      anchor: 'intro',
      section: 'Diagrams',
      text
    });
  });
  return chunks;
}

async function getCorpus(filePath = INDEX_PATH, cacheKey = filePath) {
  if (corpusCache.has(cacheKey)) return corpusCache.get(cacheKey);
  const html = await readFile(filePath, 'utf8');
  const chunks = [
    ...termsFrom(html),
    ...scenariosFrom(html),
    ...cheatFrom(html),
    ...diagramsFrom(html)
  ].map(chunk => ({
    ...chunk,
    searchText: normalizeText(`${chunk.title} ${chunk.text}`)
  }));
  const corpus = { total: chunks.length, chunks };
  corpusCache.set(cacheKey, corpus);
  return corpus;
}

function tokenize(query) {
  return normalizeText(query).split(/\s+/).filter(token => token.length > 1);
}

function searchChunks(chunks, query, filters = ['all'], limit = 24) {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const active = new Set(filters && filters.length ? filters : ['all']);
  const allowed = chunk => active.has('all') || active.has(chunk.type);
  return chunks
    .filter(allowed)
    .map(chunk => {
      let score = 0;
      for (const token of tokens) {
        if (chunk.searchText.includes(token)) score += 8;
        if (normalizeText(chunk.title).includes(token)) score += 10;
        const hits = chunk.searchText.split(token).length - 1;
        score += Math.min(hits, 8);
      }
      return { chunk, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk, score }) => ({
      id: chunk.id,
      type: chunk.type,
      title: chunk.title,
      anchor: chunk.anchor,
      section: chunk.section,
      snippet: snippetFor(chunk.text, tokens),
      score
    }));
}

function snippetFor(text, tokens) {
  const lower = text.toLowerCase();
  const first = tokens
    .map(token => lower.indexOf(token))
    .filter(index => index >= 0)
    .sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, first - 90);
  const end = Math.min(text.length, first + 260);
  return `${start > 0 ? '...' : ''}${text.slice(start, end)}${end < text.length ? '...' : ''}`;
}

function localAnswer(question, results) {
  if (!results.length) {
    return {
      answer: 'No matching preread passage was found. No AI provider key is configured right now, so I cannot safely generate a broader answer yet.',
      confidence: 'low'
    };
  }
  const top = results.slice(0, 3);
  const lines = top.map((item, index) => `${index + 1}. ${item.title}\n${item.snippet.replace(/\s+/g, ' ')}`);
  return {
    answer: `No AI provider key is configured right now, so I am showing exact preread matches instead of generating an answer.\n\n${lines.join('\n\n')}`,
    confidence: results[0].score >= 16 ? 'medium' : 'low'
  };
}

async function callGemini(question, contexts, webContexts = [], assistantKind = 'finance') {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) return null;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const prompt = buildPrompt(question, contexts, webContexts, assistantKind);
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
  });
  if (!response.ok) throw new Error(`Gemini ${response.status}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map(part => part.text).join('\n').trim() || null;
}

async function callGroq(question, contexts, webContexts = [], assistantKind = 'finance') {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: assistantKind === 'aptitude' ? 'You are Ant, the Antbox aptitude vault assistant. Answer from supplied aptitude context first. Show formulas and steps clearly. Use web context only when marked and label it.' : 'You are Ant, the Antbox finance preread assistant. Answer from supplied preread context first. Use web context only when marked and label it.' },
        { role: 'user', content: buildPrompt(question, contexts, webContexts, assistantKind) }
      ]
    })
  });
  if (!response.ok) throw new Error(`Groq ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

function buildPrompt(question, contexts, webContexts, assistantKind = 'finance') {
  const preread = contexts.map((item, index) => `[${index + 1}] ${item.title}\n${item.snippet}`).join('\n\n');
  const web = webContexts.map((item, index) => `[W${index + 1}] ${item.title}\n${item.snippet}\n${item.url}`).join('\n\n');
  return `Question: ${question}

Preread context:
${preread || 'No strong preread context found.'}

${web ? `Web fallback context:\n${web}` : ''}

${assistantKind === 'aptitude'
  ? 'Write a clear quant aptitude answer. Include the formula, step-by-step working, and final answer when the question is numerical. Then include a "Used from aptitude vault" line naming the sources.'
  : 'Write a concise answer for a new finance associate. Start with the answer, then include a "Used from preread" line naming the preread sources.'} If web fallback context is used, add a separate "From web" line. Do not invent facts beyond the supplied context.`;
}

async function webSearch(query) {
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query + ' finance accounting')}`;
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 AntboxPreread/1.0' } });
  if (!response.ok) throw new Error(`Search ${response.status}`);
  const html = await response.text();
  const results = [...html.matchAll(/class="result__a" href="([^"]+)"[\s\S]*?>([\s\S]*?)<\/a>[\s\S]*?class="result__snippet"[\s\S]*?>([\s\S]*?)<\/a>/g)]
    .slice(0, 3)
    .map(match => ({
      url: decodeDuckUrl(match[1]),
      title: stripTags(match[2]),
      snippet: stripTags(match[3])
    }))
    .filter(item => item.url && item.title);
  return results;
}

function decodeDuckUrl(url) {
  try {
    const parsed = new URL(url, 'https://duckduckgo.com');
    return parsed.searchParams.get('uddg') || parsed.href;
  } catch {
    return url;
  }
}

async function answerQuestion(question, filePath = INDEX_PATH, cacheKey = filePath, assistantKind = 'finance') {
  const corpus = await getCorpus(filePath, cacheKey);
  const results = searchChunks(corpus.chunks, question, ['all'], 6);
  const shouldUseWeb = !results.length || (results[0]?.score || 0) < 12;
  let webResults = [];
  if (shouldUseWeb) {
    try { webResults = await webSearch(question); } catch { webResults = []; }
  }

  let provider = 'local';
  let answer = null;
  try {
    answer = await callGemini(question, results, webResults, assistantKind);
    if (answer) provider = 'gemini';
  } catch {}
  if (!answer) {
    try {
      answer = await callGroq(question, results, webResults, assistantKind);
      if (answer) provider = 'groq';
    } catch {}
  }
  if (!answer) {
    const local = localAnswer(question, results);
    answer = local.answer;
  }

  return {
    answer,
    provider,
    providerLabel: provider === 'gemini' ? 'Gemini' : provider === 'groq' ? 'Groq Llama' : 'Local preread only',
    aiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GROQ_API_KEY),
    usedWeb: webResults.length > 0,
    citations: results.map(item => ({ title: item.title, anchor: item.anchor, type: item.type })),
    webCitations: webResults.map(item => ({ title: item.title, url: item.url }))
  };
}

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/corpus') {
    const corpus = await getCorpus();
    send(res, 200, corpus);
    return true;
  }
  if (req.method === 'GET' && url.pathname === '/api/corpus-aptitude') {
    const corpus = await getCorpus(APTITUDE_PATH, 'aptitude');
    send(res, 200, corpus);
    return true;
  }
  if (req.method === 'GET' && url.pathname === '/api/status') {
    send(res, 200, {
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
      groqConfigured: Boolean(process.env.GROQ_API_KEY),
      mode: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
        ? 'Gemini primary'
        : process.env.GROQ_API_KEY
          ? 'Groq Llama fallback'
          : 'Local preread only'
    });
    return true;
  }
  if (req.method === 'POST' && url.pathname === '/api/search') {
    const body = await readJson(req);
    const corpus = await getCorpus();
    const results = searchChunks(corpus.chunks, body.query || '', body.filters || ['all'], 40);
    send(res, 200, { query: body.query || '', total: results.length, results });
    return true;
  }
  if (req.method === 'POST' && url.pathname === '/api/search-aptitude') {
    const body = await readJson(req);
    const corpus = await getCorpus(APTITUDE_PATH, 'aptitude');
    const results = searchChunks(corpus.chunks, body.query || '', body.filters || ['all'], 40);
    send(res, 200, { query: body.query || '', total: results.length, results });
    return true;
  }
  if (req.method === 'POST' && url.pathname === '/api/ask') {
    const body = await readJson(req);
    const question = String(body.question || '').trim();
    if (!question) send(res, 400, { error: 'Question is required.' });
    else send(res, 200, await answerQuestion(question));
    return true;
  }
  if (req.method === 'POST' && url.pathname === '/api/ask-aptitude') {
    const body = await readJson(req);
    const question = String(body.question || '').trim();
    if (!question) send(res, 400, { error: 'Question is required.' });
    else send(res, 200, await answerQuestion(question, APTITUDE_PATH, 'aptitude', 'aptitude'));
    return true;
  }
  if (req.method === 'POST' && url.pathname === '/api/web-search') {
    const body = await readJson(req);
    send(res, 200, { results: await webSearch(String(body.query || '')) });
    return true;
  }
  return false;
}

export async function handleApiFetch(method, pathname, body = {}) {
  if (method === 'GET' && pathname === '/api/corpus') {
    return { status: 200, body: await getCorpus() };
  }
  if (method === 'GET' && pathname === '/api/corpus-aptitude') {
    return { status: 200, body: await getCorpus(APTITUDE_PATH, 'aptitude') };
  }
  if (method === 'GET' && pathname === '/api/status') {
    return {
      status: 200,
      body: {
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
        groqConfigured: Boolean(process.env.GROQ_API_KEY),
        mode: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
          ? 'Gemini primary'
          : process.env.GROQ_API_KEY
            ? 'Groq Llama fallback'
            : 'Local preread only'
      }
    };
  }
  if (method === 'POST' && pathname === '/api/search') {
    const corpus = await getCorpus();
    const results = searchChunks(corpus.chunks, body.query || '', body.filters || ['all'], 40);
    return { status: 200, body: { query: body.query || '', total: results.length, results } };
  }
  if (method === 'POST' && pathname === '/api/search-aptitude') {
    const corpus = await getCorpus(APTITUDE_PATH, 'aptitude');
    const results = searchChunks(corpus.chunks, body.query || '', body.filters || ['all'], 40);
    return { status: 200, body: { query: body.query || '', total: results.length, results } };
  }
  if (method === 'POST' && pathname === '/api/ask') {
    const question = String(body.question || '').trim();
    if (!question) return { status: 400, body: { error: 'Question is required.' } };
    return { status: 200, body: await answerQuestion(question) };
  }
  if (method === 'POST' && pathname === '/api/ask-aptitude') {
    const question = String(body.question || '').trim();
    if (!question) return { status: 400, body: { error: 'Question is required.' } };
    return { status: 200, body: await answerQuestion(question, APTITUDE_PATH, 'aptitude', 'aptitude') };
  }
  if (method === 'POST' && pathname === '/api/web-search') {
    return { status: 200, body: { results: await webSearch(String(body.query || '')) } };
  }
  return { status: 404, body: { error: 'Not found' } };
}

async function serveStatic(req, res, url) {
  let requested = decodeURIComponent(url.pathname);
  if (requested === '/' || requested === '') requested = '/home.html';
  if (requested === '/finance' || requested === '/finance.html') requested = '/index.html';
  if (requested === '/aptitude' || requested === '/aptitude.html') requested = '/aptitude.html';
  const safePath = normalize(join(PUBLIC_DIR, requested));
  if (!safePath.startsWith(PUBLIC_DIR)) {
    send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
    return;
  }
  try {
    const body = await readFile(safePath);
    send(res, 200, body, mime[extname(safePath)] || 'application/octet-stream');
  } catch {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    try {
      if (url.pathname.startsWith('/api/') && await handleApi(req, res, url)) return;
      await serveStatic(req, res, url);
    } catch (error) {
      send(res, 500, { error: error.message || 'Server error' });
    }
  }).listen(PORT, () => {
    console.log(`Antbox preread app running at http://localhost:${PORT}`);
  });
}
