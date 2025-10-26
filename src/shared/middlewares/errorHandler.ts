import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendError } from '../utils';

export function errorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  console.trace(err);
  sendError(res, {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Sorry, Something went wrong!',
  });
}
