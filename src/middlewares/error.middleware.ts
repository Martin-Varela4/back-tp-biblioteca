
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

export const notFoundHandler = (_req: Request, res: Response) => {
  return res.status(404).json({
    message: "Ruta no encontrada",
  });
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues.map((issue) => {
        const cleanPath = issue.path
          .filter((p) => p !== "body" && p !== "params")
          .join(".");

        return {
          campo: cleanPath || issue.path.join("."),
          mensaje: issue.message,
        };
      }),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Error interno del servidor",
  });
};
