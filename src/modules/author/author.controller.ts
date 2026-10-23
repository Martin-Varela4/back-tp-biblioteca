import { Request, Response, NextFunction } from "express";
import { authorService } from "./author.service.js";


export const getAllAuthors = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await authorService.getAll();
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const author = await authorService.getById(id);
    res.json(author);
  } catch (error: any) {
    if (error.message === "Autor no encontrado") {
      res.status(404).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const savedAuthor = await authorService.create(req.body);
    res.status(201).json({ message: "Autor creado exitosamente", author: savedAuthor });
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updatedAuthor = await authorService.update(id, req.body);
    res.json({ message: "Autor actualizado exitosamente", author: updatedAuthor });
  } catch (error: any) {
    if (error.message === "Autor no encontrado") {
      res.status(404).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const response = await authorService.delete(id);
    res.json(response);
  } catch (error: any) {
    if (error.message === "Autor no encontrado") {
      res.status(404).json({ message: error.message });
      return;
    }
    next(error);
  }
};
