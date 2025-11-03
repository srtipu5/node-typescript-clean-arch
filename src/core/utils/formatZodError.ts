import { ZodError } from 'zod';

export const formatZodError = (error: ZodError) =>
  error.issues.map((issue) => ({
    path: issue.path.join('.') || '(root)',
    message: issue.message,
  }));
