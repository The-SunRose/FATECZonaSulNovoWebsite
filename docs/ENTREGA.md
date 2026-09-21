# Entrega do Projeto 02

O formato solicitado é um link de repositório no GitHub. Repositório do projeto: [The-SunRose/FATECZonaSulNovoWebsite](https://github.com/The-SunRose/FATECZonaSulNovoWebsite).

1. Execute `npm ci`, `npm test` e `npm start`.
2. Acesse `http://localhost:2000` e navegue pelas páginas.
3. Crie um repositório vazio no GitHub.
4. No diretório do projeto, execute os comandos abaixo, substituindo USUARIO e REPOSITORIO pelos valores reais:

```bash
git init
git add .
git commit -m "Implementa portal Fatec Zona Sul com Node.js e Bootstrap"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Não envie `node_modules`, `.npm-cache` nem arquivos `.env`. O `.gitignore` já os exclui. Inclua `package-lock.json` para instalação reproduzível.

O GitHub Pages hospeda arquivos estáticos e **não executa o servidor Node.js/Express**. A entrega por repositório permite ao avaliador clonar, instalar e iniciar a aplicação na porta 2000.

## Pontos para apresentação

- Mostrar rotas de páginas e de API.
- Demonstrar busca por ADS/DSM e filtro de área.
- Demonstrar agenda com filtro por mês e categoria.
- Explicar o fluxo route → controller/service → repository → data e renderização EJS.
- Mostrar o código que fixa a porta 2000 e executar os testes.
- Explicar que datas foram pesquisadas em fontes oficiais e que a atualização editorial é manual.

## Atenções ao enunciado

- Existem dois horários no texto recebido: 14h39 no cabeçalho e 14h49 nas diretrizes, em 28/09/2026. Planeje o envio antes do mais cedo e confirme com o professor.
- “Quem Somos” foi implementado sobre a instituição por orientação expressa do solicitante, embora o enunciado mencione integrantes. Se o professor exigir a apresentação técnica do grupo, ela ainda deverá ser adicionada com os nomes reais.
