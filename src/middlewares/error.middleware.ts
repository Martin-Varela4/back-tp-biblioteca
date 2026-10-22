import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";


export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ message: "Ruta no encontrada" });
};


export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensaje: issue.message,
      })),
    });
  }

  const status: number = err.status ?? 500;

  if (status === 500) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }

  res.status(status).json({ message: err.message });
};
