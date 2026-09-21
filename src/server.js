import { app } from './app.js';

// Porta obrigatória do Projeto 02 de Desenvolvimento Web III.
const server = app.listen(2000, () => console.log('Portal Fatec Zona Sul disponível em http://localhost:2000'));
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? 'A porta 2000 já está em uso. Encerre o processo que a ocupa antes de iniciar o portal.' : error.message);
  process.exit(1);
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
