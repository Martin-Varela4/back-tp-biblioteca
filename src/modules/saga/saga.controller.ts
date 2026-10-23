import type { Request, Response } from "express";
import { sagaService } from "./saga.service.js";

export const getAllSagas = async (_req: Request, res: Response) => {
  const sagas = await sagaService.getAll();
  return res.status(200).json(sagas);
};

export const getSagaById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const saga = await sagaService.getById(id);
  return res.status(200).json(saga);
};

export const createSaga = async (req: Request, res: Response) => {
  const saga = await sagaService.create(req.body);
  return res.status(201).json(saga);
};

export const updateSaga = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const saga = await sagaService.update(id, req.body);
  return res.status(200).json(saga);
};

export const deleteSaga = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await sagaService.delete(id);
  return res.status(204).send();
};
