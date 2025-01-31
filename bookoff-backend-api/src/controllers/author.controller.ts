import { Request, Response } from "express";
import authorService from "../services/author.service";

const getAllAuthors = async (req: Request, res: Response) => {
  const authors = await authorService.getAllAuthors();
  res.json(authors);
};

const getAuthorById = async (req: Request, res: Response) => {
  const author = await authorService.getAuthorById(Number(req.params.id));
  res.json(author);
};

const getAuthorBySlug = async (req: Request, res: Response) => {
  const author = await authorService.getAuthorBySlug(req.params.slug);
  res.json(author);
};

const createAuthor = async (req: Request, res: Response) => {
  const newAuthor = await authorService.createAuthor(req.body);
  res.status(201).json(newAuthor);
};

const updateAuthor = async (req: Request, res: Response) => {
  const updatedAuthor = await authorService.updateAuthor(
    Number(req.params.id),
    req.body
  );
  res.json(updatedAuthor);
};

const deleteAuthor = async (req: Request, res: Response) => {
  const deletedAuthor = await authorService.deleteAuthor(Number(req.params.id));
  res.json(deletedAuthor);
};

export default {
  getAllAuthors,
  getAuthorById,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
