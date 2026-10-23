import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateData = (schema: ZodType, target: "body" | "params" | "query" = "body") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const hasBodyShape =
        target === "body" &&
        "shape" in (schema as any) &&
        Boolean((schema as any).shape?.body);

      const dataToValidate = hasBodyShape ? { body: req.body } : req[target];
      const parsed: any = schema.parse(dataToValidate);

      if (hasBodyShape) {
        req.body = parsed.body;
      } else if (target === "query") {
        Object.defineProperty(req, "query", {
          value: parsed,
          writable: true,
          configurable: true,
        });
      } else {
        req[target] = parsed;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
