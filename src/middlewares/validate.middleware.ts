import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateData = (schema: ZodType, target: "body" | "params" | "query" = "body") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[target] = schema.parse(req[target]);
      next();
    } catch (error) {
      next(error); 
  };
}};
