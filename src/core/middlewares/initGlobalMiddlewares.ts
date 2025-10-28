import { Express } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export function initGlobalMiddlewares(app: Express): void {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet()); // adds basic security headers
  app.use(morgan('dev'));
}
