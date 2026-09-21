'use strict';

// Os filtros consultam a API. As páginas já chegam preenchidas pelo servidor.
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const dateLabel = value => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

async function getData(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Não foi possível carregar os dados.');
  const payload = await response.json();
  return payload.data;
}

function courseCard(course) {
  const c = Object.fromEntries(Object.entries(course).map(([key, value]) => [key, typeof value === 'string' ? escapeHtml(value) : value]));
  return `<div class="col-md-6"><article class="course-card h-100"><div class="d-flex justify-content-between align-items-start"><span class="course-icon"><i class="bi bi-${c.icon}" aria-hidden="true"></i></span><span class="course-tag">${c.category}</span></div><p class="course-acronym">${c.acronym}</p><h3><a href="/cursos/${encodeURIComponent(course.slug)}">${c.name}</a></h3><p class="course-summary">${c.summary}</p><div class="course-meta"><span><i class="bi bi-clock" aria-hidden="true"></i> ${c.duration}</span><span>Graduação gratuita</span></div><a class="course-link" href="/cursos/${encodeURIComponent(course.slug)}">Conheça o curso <i class="bi bi-arrow-up-right" aria-hidden="true"></i><span class="visually-hidden"> de ${c.name}</span></a></article></div>`;
}

const courseForm = document.querySelector('#courseFilters');
if (courseForm) {
  const results = document.querySelector('#courseResults');
  const status = document.querySelector('#courseStatus');
  let controller;
  async function filterCourses(event) {
    event?.preventDefault();
    controller?.abort();
    controller = new AbortController();
    const current = controller;
    status.textContent = 'Buscando cursos…';
    results.setAttribute('aria-busy', 'true');
    results.classList.add('loading-results');
    try {
      const params = new URLSearchParams(new FormData(courseForm));
      const courses = await getData(`/api/cursos?${params}`, current.signal);
      results.innerHTML = courses.length ? courses.map(courseCard).join('') : '<div class="col-12"><div class="empty-state"><i class="bi bi-search" aria-hidden="true"></i><p class="mt-3 mb-2">Nenhum curso encontrado.</p><span>Experimente outro nome ou selecione todas as áreas.</span></div></div>';
      status.textContent = `${courses.length} ${courses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}`;
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = 'Não foi possível atualizar a busca. Os resultados anteriores foram mantidos. Tente novamente.';
    } finally {
      if (controller === current) { results.classList.remove('loading-results'); results.removeAttribute('aria-busy'); }
    }
  }
  courseForm.addEventListener('submit', filterCourses);
  document.querySelector('#courseCategory').addEventListener('change', filterCourses);
  document.querySelector('#courseSearch').addEventListener('search', filterCourses);
}

function eventRow(event) {
  const startMonth = new Date(`${event.start}T12:00:00`).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const range = event.start === event.end ? dateLabel(event.start) : `${dateLabel(event.start)} a ${dateLabel(event.end)}`;
  return `<article class="event-row"><div class="event-date"><strong>${escapeHtml(event.start.slice(8))}</strong><span>${startMonth}</span></div><div class="event-content"><span class="category-label">${escapeHtml(event.category)}</span><h3>${escapeHtml(event.title)}</h3><p>${range} · ${escapeHtml(event.start.slice(0, 4))}</p><p class="event-description">${escapeHtml(event.description)}</p></div><a class="event-arrow" href="${escapeHtml(event.source)}" target="_blank" rel="noopener noreferrer" aria-label="Consultar ${escapeHtml(event.title)} no calendário oficial (PDF)"><i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></article>`;
}

const eventForm = document.querySelector('#eventFilters');
if (eventForm) {
  const results = document.querySelector('#eventResults');
  const status = document.querySelector('#eventStatus');
  const monthSelect = document.querySelector('#eventMonth');
  const now = new Date();
  let visibleMonth = now.getFullYear() === 2026 ? Math.max(8, Math.min(11, now.getMonth())) : 8;
  let calendarEvents = [];
  let controller;
  let calendarFailed = false;
  const previous = document.querySelector('#previousMonth');
  const next = document.querySelector('#nextMonth');
  function drawCalendar() {
    document.querySelector('#calendarTitle').textContent = new Date(2026, visibleMonth, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const firstDay = new Date(2026, visibleMonth, 1).getDay();
    const days = new Date(2026, visibleMonth + 1, 0).getDate();
    let markup = '<span aria-hidden="true"></span>'.repeat(firstDay);
    for (let day = 1; day <= days; day++) {
      const iso = `2026-${String(visibleMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const activities = calendarEvents.filter(item => item.start <= iso && item.end >= iso);
      const isToday = now.getFullYear() === 2026 && now.getMonth() === visibleMonth && now.getDate() === day;
      const label = `${day} de ${new Date(2026, visibleMonth, 1).toLocaleDateString('pt-BR', { month: 'long' })}${activities.length ? ': ' + activities.map(item => item.title).join(', ') : ''}`;
      markup += `<span class="${activities.length ? 'has-event' : ''} ${isToday ? 'today' : ''}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}" ${isToday ? 'aria-current="date"' : ''}>${day}</span>`;
    }
    document.querySelector('#calendarDays').innerHTML = markup;
    previous.disabled = visibleMonth === 8;
    next.disabled = visibleMonth === 11;
  }
  async function filterEvents() {
    controller?.abort(); controller = new AbortController(); const current = controller;
    if (monthSelect.value) visibleMonth = Number(monthSelect.value.slice(5)) - 1;
    drawCalendar();
    status.textContent = 'Carregando agenda…';
    results.classList.add('loading-results'); results.setAttribute('aria-busy', 'true');
    try {
      const params = new URLSearchParams(new FormData(eventForm));
      const events = await getData(`/api/eventos?${params}`, current.signal);
      results.innerHTML = events.length ? events.map(eventRow).join('') : '<div class="empty-state">Nenhuma atividade encontrada para estes filtros. Escolha outro período ou categoria.</div>';
      status.textContent = `${events.length} ${events.length === 1 ? 'atividade encontrada' : 'atividades encontradas'}${calendarFailed ? '. As marcações do calendário estão indisponíveis; consulte a lista.' : ''}`;
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = 'Não foi possível atualizar a agenda. A lista anterior foi mantida. Tente novamente.';
    } finally {
      if (controller === current) { results.classList.remove('loading-results'); results.removeAttribute('aria-busy'); }
    }
  }
  function changeMonth(delta) {
    visibleMonth = Math.max(8, Math.min(11, visibleMonth + delta));
    monthSelect.value = `2026-${String(visibleMonth + 1).padStart(2, '0')}`;
    filterEvents();
  }
  previous.addEventListener('click', () => changeMonth(-1));
  next.addEventListener('click', () => changeMonth(1));
  eventForm.addEventListener('change', filterEvents);
  eventForm.addEventListener('submit', event => { event.preventDefault(); filterEvents(); });
  drawCalendar();
  getData('/api/eventos').then(events => { calendarEvents = events; drawCalendar(); }).catch(() => { calendarFailed = true; status.textContent = 'A lista está disponível. Não foi possível carregar as marcações do calendário; recarregue para tentar novamente.'; });
}
