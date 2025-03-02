import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao listar os livros: ${error.message}` });
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro na requisição do Livro: ${error.message}` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro na atualização: ${error.message}` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluido" });
    } catch (error) {
      res.status(500).json({ message: `Erro na exclusão: ${error.message}` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const licroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Criado com sucesso", livro: novoLivro });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao criar o livro: ${error.message}` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    try {
      const editora = req.query.editora;
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao listar os livros: ${error.message}` });
    }
  }
}

export default LivroController;
