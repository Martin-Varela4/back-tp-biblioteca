import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateData = (schema: ZodType, target: "body" | "params" | "query" = "body") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (target === "body") {
        const wrappedResult = schema.safeParse({ body: req.body });
        if (wrappedResult.success) {
          req.body = (wrappedResult.data as any).body;
          return next();
        }

        const directResult = schema.safeParse(req.body);
        if (directResult.success) {
          req.body = (directResult.data as any)?.body ?? directResult.data;
          return next();
        }

        const isWrappedSchema = !wrappedResult.error.issues.some(
          (i) => i.path.length === 1 && i.path[0] === "body"
        );

        if (isWrappedSchema) {
          throw wrappedResult.error;
        }

        throw directResult.error;
      }

      (req as any)[target] = schema.parse((req as any)[target]);
      next();
    } catch (error) {
      next(error);
    }
  };
};
