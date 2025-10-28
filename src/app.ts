import express from 'express';
import { initGlobalMiddlewares, initErrorHandler } from './core/middlewares';
import { initRoutes } from './routes';
const app = express();

// Global middlewares
initGlobalMiddlewares(app);

// initialize routes
initRoutes(app);

// Error middleware
initErrorHandler(app);

export default app;
