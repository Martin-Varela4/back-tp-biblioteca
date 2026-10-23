import type { Request, Response } from "express";
import { bookService } from "./book.service.js";
import { BookFilterParams } from "./book.repository.js";

export const getAllBooks = async (req: Request, res: Response) => {
  const query = req.query as any;
  const publicationYear = query.publicationYear ?? query.year;

  const filters: BookFilterParams = {
    genreId: query.genreId ? Number(query.genreId) : undefined,
    genre: query.genre ? String(query.genre) : undefined,
    authorId: query.authorId ? Number(query.authorId) : undefined,
    author: query.author ? String(query.author) : undefined,
    publicationYear: publicationYear ? Number(publicationYear) : undefined,
    shelfId: query.shelfId ? Number(query.shelfId) : undefined,
    sagaId: query.sagaId ? Number(query.sagaId) : undefined,
    title: query.title ? String(query.title) : undefined,
  };

  const books = await bookService.getAll(filters);
  return res.status(200).json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = await bookService.getById(id);
  return res.status(200).json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await bookService.create(req.body);
  return res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = await bookService.update(id, req.body);
  return res.status(200).json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await bookService.delete(id);
  return res.status(204).send();
};
