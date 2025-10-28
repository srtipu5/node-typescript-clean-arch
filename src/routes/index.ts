import { Express } from 'express';
import coreRoutes from '../core/routes';
import userRoutes from '../modules/user/routes';
export function initRoutes(app: Express) {
  app.use('/', coreRoutes);
  app.use('/api/v1/users', userRoutes);
}
