import type { Request, Response } from "express";
import { shelfService } from "./shelf.service.js";

export const getAllShelves = async (_req: Request, res: Response) => {
  const shelves = await shelfService.getAll();
  return res.status(200).json(shelves);
};

export const getShelfById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const shelf = await shelfService.getById(id);
  return res.status(200).json(shelf);
};

export const createShelf = async (req: Request, res: Response) => {
  const shelf = await shelfService.create(req.body);
  return res.status(201).json(shelf);
};

export const updateShelf = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const shelf = await shelfService.update(id, req.body);
  return res.status(200).json(shelf);
};

export const deleteShelf = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await shelfService.delete(id);
  return res.status(204).send();
};
