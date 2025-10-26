import express from 'express';
import { initGlobalMiddlewares, initRoutes, initErrorHandler } from './shared/middlewares';

const app = express();

// Global middlewares
initGlobalMiddlewares(app);

// initialize routes
initRoutes(app);

// Error middleware
initErrorHandler(app);

export default app;
