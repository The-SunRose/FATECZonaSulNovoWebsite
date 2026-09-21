export const courses = [
  {
    slug: 'analise-e-desenvolvimento-de-sistemas', acronym: 'ADS', category: 'Tecnologia', icon: 'terminal',
    name: 'Análise e Desenvolvimento de Sistemas',
    summary: 'Transforme desafios em sistemas inteligentes. Da análise à implementação, desenvolva soluções que fazem a diferença.',
    description: 'Uma formação voltada à criação e manutenção de sistemas de informação. O curso conecta raciocínio lógico, programação e metodologias de projeto à qualidade, usabilidade e segurança de software.',
    format: 'Presencial, com 6º semestre remoto', duration: '6 semestres',
    topics: ['Lógica e programação', 'Banco de dados', 'Engenharia de software', 'Análise de sistemas', 'Qualidade e segurança', 'Gestão de projetos'],
    careers: ['Desenvolvimento de sistemas', 'Análise de requisitos', 'Consultoria em tecnologia', 'Qualidade de software'],
    note: 'A página da unidade informa que as disciplinas do 6º semestre são remotas. Consulte os turnos e as vagas no processo seletivo vigente.',
    email: 'ff137coord.ads@cps.sp.gov.br'
  },
  {
    slug: 'desenvolvimento-de-software-multiplataforma', acronym: 'DSM', category: 'Tecnologia', icon: 'code-slash',
    name: 'Desenvolvimento de Software Multiplataforma',
    summary: 'Crie aplicações para conectar pessoas. Explore desenvolvimento web, mobile e soluções em nuvem.',
    description: 'O curso prepara para projetar e testar aplicações em diferentes plataformas. A formação articula programação, dados, segurança e inteligência artificial para desenvolver soluções tecnológicas.',
    format: 'Presencial, com atividades online', duration: '6 semestres',
    topics: ['Desenvolvimento web', 'Aplicações multiplataforma', 'Computação em nuvem', 'Banco de dados', 'Inteligência artificial', 'Segurança da informação'],
    careers: ['Desenvolvimento frontend e backend', 'Aplicações para dispositivos móveis', 'Soluções em nuvem', 'Engenharia de software'],
    note: 'Algumas disciplinas são oferecidas online e de forma síncrona, conforme o projeto pedagógico. Confirme a oferta atual na página oficial.',
    email: 'f137coord.dsm@cps.sp.gov.br'
  },
  {
    slug: 'gestao-empresarial', acronym: 'GE', category: 'Negócios', icon: 'bar-chart-line',
    name: 'Gestão Empresarial',
    summary: 'Conecte estratégia, pessoas e resultados. Desenvolva uma visão completa para transformar negócios.',
    description: 'A formação reúne planejamento de negócios, finanças e gestão de pessoas e operações. Prepara profissionais para tomar decisões, liderar equipes e empreender em diferentes contextos organizacionais.',
    format: 'Presencial e EaD', duration: '6 semestres',
    topics: ['Planejamento estratégico', 'Gestão financeira', 'Marketing', 'Gestão de pessoas', 'Empreendedorismo', 'Processos gerenciais'],
    careers: ['Gestão de empresas', 'Consultoria de negócios', 'Empreendedorismo', 'Gestão de processos'],
    note: 'A unidade informa oferta presencial e EaD. No curso presencial da tarde, as disciplinas do 4º ao 6º semestre são ministradas à noite. Vagas sujeitas ao edital vigente.',
    email: 'f137coord.gem@cps.sp.gov.br'
  },
  {
    slug: 'logistica', acronym: 'LOG', category: 'Negócios', icon: 'boxes',
    name: 'Logística',
    summary: 'Movimente o futuro. Planeje operações e conecte cada etapa da cadeia de suprimentos.',
    description: 'Uma formação em planejamento e gestão de armazenamento, distribuição e transporte. O profissional coordena fluxos de materiais e informações, estoques e redes de abastecimento.',
    format: 'Presencial', duration: '6 semestres',
    topics: ['Cadeia de suprimentos', 'Gestão de estoques', 'Transportes', 'Distribuição', 'Compras e fornecedores', 'Custos logísticos'],
    careers: ['Gestão de transportes', 'Planejamento de operações', 'Gestão de centros de distribuição', 'Consultoria logística'],
    note: 'A página da unidade apresenta oferta nos períodos da tarde e da noite. Confirme as vagas no edital do vestibular.',
    email: 'f137coord.log@cps.sp.gov.br'
  }
].map(course => ({ ...course, source: `https://fateczonasul.edu.br/index.php/${course.slug}/` }));
