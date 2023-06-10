import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const verifyDataMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const verifiedData = schema.parse(request.body);

    request.body = verifiedData;

    return next();
  };
