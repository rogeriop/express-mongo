import express from "express";

const app = express();
app.use(express.json());

const livros = [
  { id: 1, titulo: "O Senhor dos Anéis" },
  { id: 2, titulo: "Harry Potter" },
];

function buscaLivro(id) {
  return livros.find((livro) => livro.id === Number(id));
}

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js\n");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livro/:id", (req, res) => {
  const livro = buscaLivro(req.params.id);
  if (!livro) return res.status(404).send("Livro não encontrado");
  res.status(200).json(livro);
});

// INCLUSÃO DE UM NOVO LIVRO
app.post("/livro", (req, res) => {
  const livro = req.body;
  livros.push(livro);
  res.status(201).json(livros);
});

// ALTERAÇÃO DE UM LIVRO
app.put("/livro/:id", (req, res) => {
  const idMov = req.params.id;
  const livroMov = req.body;
  const livro = buscaLivro(idMov);
  if (!livro) return res.status(404).send("Livro não encontrado");
  livro.titulo = livroMov.titulo;
  livros[idMov - 1] = livro;
  res.status(200).json(livros);
});

// EXCLUSÃO DE UM LIVRO
app.delete("/livro/:id", (req, res) => {
  const livro = buscaLivro(req.params.id);
  const index = livro.id - 1;
  if (!index) return res.status(404).send("Livro não encontrado");
  livros.splice(index, 1);
  res.status(200).json(livros);
});

export default app;
