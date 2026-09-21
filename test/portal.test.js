import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';
import { portalService } from '../src/services/portalService.js';
import { portalRepository } from '../src/repositories/portalRepository.js';

const server = await new Promise((resolve, reject) => {
  const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  listener.once('error', reject);
});
const base = `http://127.0.0.1:${server.address().port}`;
after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); });

test('todas as páginas obrigatórias e os quatro cursos são renderizados', async () => {
  for (const route of ['/', '/index.html', '/cursos', '/vestibular', '/infraestrutura', '/eventos', '/quem-somos', ...portalService.courses().map(course => `/cursos/${course.slug}`)]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /<html lang="pt-BR">/, route);
    assert.match(html, /<main id="main">/, route);
    assert.match(html, /<h1[ >]/, route);
    assert.ok(!html.includes('undefined'), route);
    assert.match(response.headers.get('content-security-policy'), /script-src 'self'/);
    assert.equal(response.headers.get('x-powered-by'), null);
  }
});

test('API filtra cursos por sigla, nome sem acento e categoria', async () => {
  for (const [query, count, acronym] of [['q=analise', 1, 'ADS'], ['q=DSM', 1, 'DSM'], ['category=Neg%C3%B3cios', 2], ['q=inexistente', 0], ['q=DSM&category=Neg%C3%B3cios', 0]]) {
    const response = await fetch(`${base}/api/cursos?${query}`);
    assert.equal(response.status, 200);
    const { data } = await response.json();
    assert.equal(data.length, count, query);
    if (acronym) assert.equal(data[0].acronym, acronym);
  }
});

test('API retorna curso individual, instituição e saúde do servidor', async () => {
  const course = await fetch(`${base}/api/cursos/logistica`).then(response => response.json());
  assert.equal(course.data.acronym, 'LOG');
  const institution = await fetch(`${base}/api/instituicao`).then(response => response.json());
  assert.equal(institution.data.name, 'Fatec Zona Sul');
  assert.equal((await fetch(`${base}/api/health`).then(response => response.json())).status, 'ok');
});

test('agenda filtra por mês e categoria e preserva intervalo do evento', async () => {
  const response = await fetch(`${base}/api/eventos?month=2026-11&category=Tecnologia`);
  const { data } = await response.json();
  assert.equal(data.length, 1);
  assert.equal(data[0].start, '2026-11-16');
  assert.equal(data[0].end, '2026-11-19');
  assert.deepEqual(portalService.events({ month: '2026-10', category: 'Tecnologia' }), []);
});

test('validação rejeita parâmetros malformados e valores fora do domínio', async () => {
  for (const query of ['/api/cursos?q=a&q=b', '/api/cursos?category=Desconhecida', '/api/eventos?month=2026-99', '/api/eventos?month=2027-11', '/api/eventos?category=Desconhecida']) {
    const response = await fetch(base + query);
    assert.equal(response.status, 400, query);
    assert.ok((await response.json()).error);
  }
});

test('404 HTML para páginas e JSON para APIs', async () => {
  for (const route of ['/nao-existe', '/cursos/nao-existe']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404);
    assert.match(await response.text(), /Página não encontrada/);
  }
  for (const route of ['/api/nao-existe', '/api/cursos/nao-existe']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404);
    assert.ok((await response.json()).error);
  }
});

test('arquivos estáticos, Bootstrap, fontes e imagem são servidos localmente', async () => {
  for (const route of ['/assets/css/styles.css', '/assets/js/main.js', '/assets/img/campus.jpg', '/assets/img/favicon.svg', '/vendor/bootstrap/css/bootstrap.min.css', '/vendor/bootstrap/js/bootstrap.bundle.min.js', '/vendor/icons/bootstrap-icons.min.css', '/vendor/icons/fonts/bootstrap-icons.woff2']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.ok((await response.arrayBuffer()).byteLength > 50, route);
  }
});

test('metadados das páginas de detalhe correspondem a cada curso', async () => {
  for (const course of portalService.courses()) {
    const html = await fetch(`${base}/cursos/${course.slug}`).then(response => response.text());
    assert.ok(html.includes(`<title>${course.name} | Fatec Zona Sul</title>`));
    assert.ok(html.includes(`content="${course.summary}"`));
  }
});

test('próximos eventos incluem eventos em andamento e excluem passados', () => {
  const upcoming = portalService.upcoming('2026-11-18');
  assert.equal(upcoming[0].id, 'tecnologia');
  assert.equal(upcoming.length, 3);
  assert.deepEqual(portalService.upcoming('2027-01-01'), []);
});

test('repositório protege dados originais de mutação externa', () => {
  const courses = portalRepository.getCourses();
  courses[0].topics.push('mutação');
  assert.ok(!portalRepository.getCourses()[0].topics.includes('mutação'));
});

test('links internos de navegação não levam a páginas inexistentes', async () => {
  const paths = ['/', '/cursos', '/vestibular', '/infraestrutura', '/eventos', '/quem-somos', '/cursos/logistica'];
  const targets = new Set();
  for (const route of paths) {
    const html = await fetch(base + route).then(response => response.text());
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) targets.add(match[1]);
  }
  for (const target of targets) assert.equal((await fetch(base + target)).status, 200, target);
});
