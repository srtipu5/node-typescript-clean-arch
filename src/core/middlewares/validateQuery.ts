import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { formatZodError, sendError } from '../utils';

export const validateQuery =
  <T extends ZodType<any, any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const formattedErrors = formatZodError(result.error);
      return sendError(res, { data: formattedErrors });
    }

    (req.query as unknown) = result.data;

    next();
  };
