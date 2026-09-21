export const calendarSource = 'https://fateczonasul.edu.br/wp-content/uploads/2026/05/Calendario-Academico-2026_FATEC-Zona-Sul_Atualizado-e-Retificado_03.2026-1.pdf';
export const events = [
  { id: 'reposicao-setembro', title: 'Reposição de aulas', start: '2026-09-26', end: '2026-09-26', category: 'Acadêmico', description: 'Data de reposição prevista no calendário. Consulte a coordenação para confirmar as disciplinas e os horários.' },
  { id: 'provas-p1', title: 'Semana de provas P1', start: '2026-10-05', end: '2026-10-10', category: 'Avaliações', description: 'Período oficial de avaliações P1. A programação de cada disciplina é informada pelos docentes.' },
  { id: 'desistencia', title: 'Prazo para desistência de disciplina', start: '2026-10-06', end: '2026-10-06', category: 'Acadêmico', description: 'Prazo final para desistência de disciplinas de cursos semestrais, conforme o calendário acadêmico.' },
  { id: 'congregacao', title: 'Reunião da Congregação', start: '2026-10-08', end: '2026-10-08', category: 'Institucional', description: 'Reunião ordinária prevista no calendário da unidade. Consulte a instituição para informações sobre a pauta.' },
  { id: 'tecnologia', title: 'Semana de Tecnologia', start: '2026-11-16', end: '2026-11-19', category: 'Tecnologia', description: 'Uma semana dedicada à tecnologia e ao conhecimento. Datas previstas no calendário oficial; programação detalhada a divulgar.' },
  { id: 'provas-p2', title: 'Semana de provas P2', start: '2026-11-23', end: '2026-11-28', category: 'Avaliações', description: 'Período de avaliações P2. Consulte as orientações dos professores de cada disciplina.' },
  { id: 'termino', title: 'Término das aulas do semestre', start: '2026-12-14', end: '2026-12-14', category: 'Acadêmico', description: 'Encerramento das aulas do segundo semestre letivo de 2026.' }
].map(event => ({ ...event, source: calendarSource }));
