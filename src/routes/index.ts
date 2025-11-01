import { Express } from 'express';
import coreRoutes from '../core/routes';
import microsoftRoutes from '../modules/auth/routes';

export function initRoutes(app: Express) {
  app.use('/', coreRoutes);
  app.use('/ms', microsoftRoutes); // microsoft all routes
}
