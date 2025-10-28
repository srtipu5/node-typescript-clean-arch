import { Express } from 'express';
import { errorHandler } from './errorHandler';

export function initErrorHandler(app: Express): void {
  app.use(errorHandler);
}
