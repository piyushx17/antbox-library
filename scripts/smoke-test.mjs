import { spawn } from 'node:child_process';

const server = spawn(process.execPath, ['server.mjs'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, PORT: '4183' }
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJson(path, options) {
  const response = await fetch(`http://localhost:4183${path}`, options);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.json();
}

async function fetchText(path) {
  const response = await fetch(`http://localhost:4183${path}`);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.text();
}

try {
  await wait(700);
  const home = await fetchText('/');
  if (!home.includes('The antBox Library')) throw new Error('Home route did not serve library page');

  const financePage = await fetchText('/finance');
  if (!financePage.includes('Finance Pre-Read')) throw new Error('Finance route did not serve finance book');

  const aptitudePage = await fetchText('/aptitude');
  if (!aptitudePage.includes('Aptitude Vault')) throw new Error('Aptitude route did not serve aptitude book');

  const corpus = await fetchJson('/api/corpus');
  if (corpus.chunks.filter(chunk => chunk.type === 'term').length !== 117) {
    throw new Error(`Expected 117 term chunks, got ${corpus.chunks.filter(chunk => chunk.type === 'term').length}`);
  }

  const accounts = await fetchJson('/api/search', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'accounts', filters: ['all'] })
  });
  if (!accounts.results.some(item => item.title.includes('Chart of Accounts'))) {
    throw new Error('accounts search did not return Chart of Accounts');
  }

  const gst = await fetchJson('/api/search', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'GST', filters: ['all'] })
  });
  if (!gst.results.some(item => item.title.toLowerCase().includes('gst') || item.snippet.toLowerCase().includes('gst'))) {
    throw new Error('GST search did not return GST content');
  }

  const aptitudeCorpus = await fetchJson('/api/corpus-aptitude');
  if (aptitudeCorpus.chunks.filter(chunk => chunk.type === 'term').length !== 90) {
    throw new Error(`Expected 90 aptitude term chunks, got ${aptitudeCorpus.chunks.filter(chunk => chunk.type === 'term').length}`);
  }

  const hcf = await fetchJson('/api/search-aptitude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'HCF LCM', filters: ['all'] })
  });
  if (!hcf.results.some(item => item.title.includes('HCF'))) {
    throw new Error('Aptitude search did not return HCF content');
  }

  const interest = await fetchJson('/api/search-aptitude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'compound interest', filters: ['all'] })
  });
  if (!interest.results.some(item => item.title.includes('Compound Interest'))) {
    throw new Error('Aptitude search did not return Compound Interest content');
  }

  const ratio = await fetchJson('/api/search-aptitude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'ratio proportion', filters: ['all'] })
  });
  if (!ratio.results.some(item => item.title.includes('Ratio'))) {
    throw new Error('Aptitude search did not return Ratio content');
  }

  const probability = await fetchJson('/api/search-aptitude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'probability dice', filters: ['all'] })
  });
  if (!probability.results.some(item => item.title.includes('Probability'))) {
    throw new Error('Aptitude search did not return Probability content');
  }

  const ask = await fetchJson('/api/ask', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ question: 'What is trial balance?' })
  });
  if (!ask.answer.toLowerCase().includes('trial balance')) {
    throw new Error('Ask endpoint did not answer from local preread');
  }

  console.log('Smoke tests passed');
} finally {
  server.kill('SIGTERM');
}
