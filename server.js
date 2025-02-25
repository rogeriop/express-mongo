import http from "http";

const PORT = 3000;

const rotas = {
  "/": "Curso de Node.js\n",
  "/livros": "Entrei na rota de livros\n",
  "/autores": "Entrei na rota de autores\n",
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(rotas[req.url] || "Rota não encontrada\n");
});

server.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
