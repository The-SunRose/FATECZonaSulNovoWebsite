import { courses } from '../data/courses.js';
import { events } from '../data/events.js';
import { institution } from '../data/institution.js';

// A fonte de dados pode ser substituída por um banco sem alterar controllers/views.
export const portalRepository = {
  getCourses: () => courses.map(item => structuredClone(item)),
  getEvents: () => events.map(item => structuredClone(item)),
  getInstitution: () => structuredClone(institution)
};
