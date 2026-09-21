# Fatec Zona Sul — Portal acadêmico

Projeto completo de frontend e backend para **Desenvolvimento Web III**, com Node.js, Express, EJS e Bootstrap 5. O servidor principal utiliza obrigatoriamente a **porta 2000**.

## Executar

Requisito: Node.js 20 ou superior e npm.

```bash
npm ci
npm start
```

Acesse **http://localhost:2000**. Para desenvolvimento com reinício do servidor: `npm run dev`. O conteúdo das views e dos arquivos públicos é atualizado ao recarregar a página.

```bash
npm test
npm run check
```

Bootstrap, ícones, fontes dos ícones e fotografia são servidos localmente. Após instalar as dependências, o portal funciona sem CDN; apenas os links para serviços externos precisam de internet. Se o npm apresentar erro de permissão no cache do Windows, use `npm ci --cache .npm-cache`.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` e `/index.html` | Apresentação, cursos, acesso ao vestibular e próximos eventos |
| `/vestibular` | Etapas, calendário 2027, orientações, FAQ e portal oficial |
| `/cursos` | Quatro cursos com busca por nome/sigla e filtro por área |
| `/cursos/analise-e-desenvolvimento-de-sistemas` | Detalhes de ADS |
| `/cursos/desenvolvimento-de-software-multiplataforma` | Detalhes de DSM |
| `/cursos/gestao-empresarial` | Detalhes de Gestão Empresarial |
| `/cursos/logistica` | Detalhes de Logística |
| `/infraestrutura` | Laboratórios, biblioteca, estudo e localização |
| `/eventos` | Agenda, calendário e filtros de mês/categoria |
| `/quem-somos` | História e apresentação da própria Fatec, conforme orientação do solicitante |

**Divergência deliberada do enunciado:** o texto da atividade solicita integrantes do grupo em “Quem Somos”. O solicitante orientou expressamente que a página seja sobre a FATEC; essa orientação foi aplicada. Nenhuma identidade fictícia foi criada.

## Arquitetura

```text
Navegador → Rotas → Controllers → Services → Repository → Dados
                 ↘ API JSON ↗
                       ↓
                  Views EJS → HTML + Bootstrap + JavaScript
```

```text
src/
  server.js                 # Inicialização e encerramento na porta 2000
  app.js                    # Express, segurança, assets e tratamento de erros
  routes/                   # Rotas HTML e API REST
  controllers/              # Orquestração da renderização das páginas
  services/                 # Busca, filtros e seleção de próximos eventos
  repositories/             # Acesso aos dados com cópias defensivas
  data/                     # Conteúdo editorial, cursos e eventos pesquisados
  views/pages/              # Páginas EJS renderizadas no servidor
  views/partials/            # Componentes compartilhados
public/
  css/styles.css            # Identidade visual e responsividade
  js/main.js                # Filtros via Fetch API e calendário
  img/                      # Imagens locais
test/portal.test.js          # Testes de integração HTTP e regras de negócio
docs/                       # Fontes e orientações de entrega
```

Separação de responsabilidades: rotas mapeiam URLs, controllers coordenam páginas, services aplicam regras e repository isola a fonte de conteúdo. A API compartilha as mesmas regras das views. O frontend tem conteúdo inicial no HTML e consulta a API para filtros, com estados de carregamento, vazio e erro. O repositório usa dados editoriais versionados; não há banco de dados, autenticação ou gravação de dados pessoais neste escopo. A interface do repositório permite futura substituição por banco sem misturar persistência e apresentação.

## API

| Método | Endpoint | Função |
| --- | --- | --- |
| GET | `/api/health` | Saúde do serviço |
| GET | `/api/cursos?q=DSM&category=Tecnologia` | Busca e filtro; parâmetros opcionais |
| GET | `/api/cursos/:slug` | Um curso ou resposta 404 |
| GET | `/api/eventos?month=2026-11&category=Tecnologia` | Eventos por mês/categoria; parâmetros opcionais |
| GET | `/api/instituicao` | Dados institucionais |

Coleções e detalhes usam `{ "data": ... }`. Erros usam `{ "error": "mensagem" }` com status 400, 404 ou 500. `month` aceita meses de 2026, correspondentes ao calendário cadastrado. Não existe sincronização automática com a instituição: atualizar `src/data/` e a página de vestibular quando houver retificação.

## Qualidade e acessibilidade

- Grade responsiva, menu móvel e accordion com Bootstrap.
- HTML semântico, rótulos de formulário, link para pular ao conteúdo e foco visível.
- `aria-live` nos resultados, suporte a redução de movimento e conteúdo base sem JavaScript.
- Helmet, Content Security Policy, escapes EJS e escape de conteúdo na renderização client-side.
- Validação dos filtros e páginas próprias de erro 404/500.
- Testes HTTP de páginas, dados, filtros, assets, erros e links internos.

## Conteúdo e entrega

Informações consultadas em **21/09/2026**. Veja [fontes e créditos](docs/FONTES.md). As páginas têm links diretos para confirmação de datas e detalhes. A fotografia é histórica e identificada como tal. As descrições de áreas de estudo são sínteses, não reprodução da matriz curricular.

Veja [orientações de entrega pelo GitHub](docs/ENTREGA.md). Este é um portal acadêmico demonstrativo, sem publicação ou vínculo oficial presumido.
