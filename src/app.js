import express from "express";
import consectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await consectaNaDatabase();
conexao.on("error", (erro) => {
  console.error("erro de conexao", erro);
});

conexao.once("open", () => {
  console.log("Conectado com sucesso");
});

const app = express();
routes(app);

// EXCLUSÃO DE UM LIVRO
app.delete("/livro/:id", (req, res) => {
  const livro = buscaLivro(req.params.id);
  const index = livro.id - 1;
  if (!index) return res.status(404).send("Livro não encontrado");
  livros.splice(index, 1);
  res.status(200).json(livros);
});

export default app;
