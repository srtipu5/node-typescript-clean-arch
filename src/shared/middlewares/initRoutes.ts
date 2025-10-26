import { Express } from 'express';
import rootRoutes from '../../shared/routes/rootRoutes';
import userRoutes from '../../modules/user/routes/userRoutes';
export function initRoutes(app: Express) {
  app.use('/', rootRoutes);
  // user
  app.use('/api/v1/users', userRoutes);
}
