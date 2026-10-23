import type { Request, Response } from "express";
import { genreService } from "./genre.service.js";

export const getAllGenres = async (_req: Request, res: Response) => {
  const genres = await genreService.getAll();
  return res.status(200).json(genres);
};

export const getGenreById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const genre = await genreService.getById(id);
  return res.status(200).json(genre);
};

export const createGenre = async (req: Request, res: Response) => {
  const genre = await genreService.create(req.body);
  return res.status(201).json(genre);
};

export const updateGenre = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const genre = await genreService.update(id, req.body);
  return res.status(200).json(genre);
};

export const deleteGenre = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await genreService.delete(id);
  return res.status(204).send();
};
