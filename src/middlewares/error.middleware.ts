import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

export const notFoundHandler = (req: Request, res: Response): void => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Ruta no encontrada" });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
    logger.warn(`Validación fallida en ${req.method} ${req.originalUrl}`);
    res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues.map((issue) => {
        const cleanPath = issue.path.filter((p) => p !== "body").join(".");
        return {
          campo: cleanPath || issue.path.join("."),
          mensaje: issue.message,
        };
      }),
    });
    return;
  }

  const status: number = err.status ?? (err.statusCode ?? 500);

  if (status >= 500) {
    logger.error(
      `Error inesperado en ${req.method} ${req.originalUrl}: ${err.message || err}`,
      err.stack
    );
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }

  logger.warn(
    `Error controlado (${status}) en ${req.method} ${req.originalUrl}: ${err.message}`
  );
  res.status(status).json({ message: err.message });
};
