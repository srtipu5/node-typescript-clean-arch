import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';
import { sendError } from '../utils';

export const validateQuery =
  <T extends ZodType<any, any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const formatted = (result.error as ZodError).format();
      sendError(res, { data: formatted });
      return;
    }

    (req.query as unknown) = result.data;

    next();
  };
