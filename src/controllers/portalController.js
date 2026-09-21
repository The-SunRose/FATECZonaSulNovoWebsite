import { portalService as portal } from '../services/portalService.js';
import { calendarSource } from '../data/events.js';

const render = (res, view, title, data = {}) => res.render(view, { title, ...data });
export const portalController = {
  home: (req, res) => render(res, 'pages/home', 'Seu futuro começa aqui', { courses: portal.courses(), events: portal.upcoming() }),
  courses: (req, res) => render(res, 'pages/courses', 'Nossos cursos', { courses: portal.courses() }),
  course: (req, res, next) => {
    const course = portal.course(req.params.slug);
    if (!course) return next();
    render(res, 'pages/course', course.name, { course, description: course.summary });
  },
  vestibular: (req, res) => render(res, 'pages/vestibular', 'Vestibular 2027'),
  infrastructure: (req, res) => render(res, 'pages/infrastructure', 'Infraestrutura'),
  events: (req, res) => render(res, 'pages/events', 'Eventos e calendário', { events: portal.events(), calendarSource }),
  about: (req, res) => render(res, 'pages/about', 'Quem somos')
};
