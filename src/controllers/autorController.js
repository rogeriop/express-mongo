import { autor } from "../models/Autor.js";
class AutorController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao listar os autores: ${error.message}` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await livro.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro na requisição do Autor: ${error.message}` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro na atualização: ${error.message}` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluido" });
    } catch (error) {
      res.status(500).json({ message: `Erro na exclusão: ${error.message}` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao criar o autor: ${error.message}` });
    }
  }
}

export default AutorController;
