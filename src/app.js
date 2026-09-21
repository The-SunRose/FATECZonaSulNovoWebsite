import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pagesRouter } from './routes/pages.js';
import { apiRouter } from './routes/api.js';
import { portalService } from './services/portalService.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const app = express();
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: { directives: { 'script-src': ["'self'"], 'style-src': ["'self'"], 'img-src': ["'self'", 'data:'], 'upgrade-insecure-requests': null } }, strictTransportSecurity: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(root, 'src/views'));
app.use('/assets', express.static(path.join(root, 'public')));
app.use('/vendor/bootstrap', express.static(path.join(root, 'node_modules/bootstrap/dist')));
app.use('/vendor/icons', express.static(path.join(root, 'node_modules/bootstrap-icons/font')));
app.use((req, res, next) => {
  res.locals.institution = portalService.institution();
  res.locals.currentPath = req.path;
  res.locals.description = 'Conheça os cursos, o vestibular e a vida acadêmica da Fatec Zona Sul. Ensino superior público e gratuito em São Paulo.';
  res.locals.dateLabel = date => new Date(`${date}T12:00:00-03:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  next();
});
app.use('/api', apiRouter);
app.use(pagesRouter);
app.use((req, res) => res.status(404).render('pages/error', { title: 'Página não encontrada', code: 404, message: 'Esse caminho ainda não leva ao seu futuro.', detail: 'A página pode ter mudado de endereço. Volte ao início ou explore nossos cursos.' }));
app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  if (req.path.startsWith('/api/')) return res.status(500).json({ error: 'Não foi possível concluir a solicitação.' });
  res.status(500).render('pages/error', { title: 'Erro no servidor', code: 500, message: 'Precisamos de um instante.', detail: 'Não foi possível carregar esta página. Tente novamente em alguns minutos.' });
});
