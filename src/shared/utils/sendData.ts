import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function sendData(res: Response, data: unknown, message?: string) {
  res.status(StatusCodes.OK).json({
    status: true,
    message: message || 'Success',
    data,
  });
}
