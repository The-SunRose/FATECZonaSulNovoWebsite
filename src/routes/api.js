import { Router } from 'express';
import { portalService as portal } from '../services/portalService.js';
export const apiRouter = Router();
apiRouter.get('/health', (req, res) => res.json({ status: 'ok', service: 'fatec-zona-sul' }));
apiRouter.get('/cursos', (req, res) => {
  const { q, category } = req.query;
  if ((q !== undefined && (typeof q !== 'string' || q.length > 100)) || (category !== undefined && !['', 'Tecnologia', 'Negócios'].includes(category))) return res.status(400).json({ error: 'Filtros de cursos inválidos.' });
  res.json({ data: portal.courses({ q, category }) });
});
apiRouter.get('/cursos/:slug', (req, res) => {
  const course = portal.course(req.params.slug);
  return course ? res.json({ data: course }) : res.status(404).json({ error: 'Curso não encontrado.' });
});
apiRouter.get('/eventos', (req, res) => {
  const { month, category } = req.query;
  if ((month !== undefined && (typeof month !== 'string' || !/^(?:2026-(?:0[1-9]|1[0-2]))?$/.test(month))) || (category !== undefined && !['', 'Acadêmico', 'Avaliações', 'Institucional', 'Tecnologia'].includes(category))) return res.status(400).json({ error: 'Filtros de eventos inválidos.' });
  res.json({ data: portal.events({ month, category }) });
});
apiRouter.get('/instituicao', (req, res) => res.json({ data: portal.institution() }));
apiRouter.use((req, res) => res.status(404).json({ error: 'Endpoint não encontrado.' }));
