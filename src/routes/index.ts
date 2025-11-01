import { Express } from 'express';
import coreRoutes from '../core/routes';
import authRoute from '../modules/auth/routes';

export function initRoutes(app: Express) {
  app.use('/', coreRoutes);
  app.use('/auth', authRoute);
}
