import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export const httpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = performance.now();

  res.on("finish", () => {
    const duration = Math.round(performance.now() - start);
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;

    logger.http(`${method} ${url} | ${status} | ${duration}ms`);
  });

  next();
};
