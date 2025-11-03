import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { sendError } from '../utils/sendError';
import { formatZodError } from '../utils';

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = formatZodError(result.error);
      return sendError(res, { data: formattedErrors });
    }

    req.body = result.data;
    next();
  };
