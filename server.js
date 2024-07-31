const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Ler o conteúdo de db.json
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));

// Configurar o roteamento
const router = jsonServer.router(db); // Passar os dados lidos para o router

// Usar o middleware padrão
const middlewares = jsonServer.defaults();

// Criar o servidor
const server = jsonServer.create();

server.use(middlewares);

// Redirecionando todas as requisições GET para /produtos
server.use(jsonServer.rewriter({
  '/': '/produtos' 
}));

server.use(router);

// Listen to port
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
