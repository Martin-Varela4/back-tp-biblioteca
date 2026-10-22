import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateBody = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
