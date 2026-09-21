import { portalRepository } from '../repositories/portalRepository.js';

const normalize = value => String(value ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
export const portalService = {
  courses({ q = '', category = '' } = {}) {
    return portalRepository.getCourses().filter(course =>
      normalize(`${course.name} ${course.acronym}`).includes(normalize(q)) && (!category || course.category === category));
  },
  course(slug) { return portalRepository.getCourses().find(course => course.slug === slug); },
  events({ month = '', category = '' } = {}) {
    return portalRepository.getEvents().filter(event => (!month || (event.start.slice(0, 7) <= month && event.end.slice(0, 7) >= month)) && (!category || event.category === category)).sort((a, b) => a.start.localeCompare(b.start));
  },
  institution: () => portalRepository.getInstitution(),
  upcoming(today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })) {
    return this.events().filter(event => event.end >= today).slice(0, 3);
  }
};
