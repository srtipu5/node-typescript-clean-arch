import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../interfaces/iUserService';
import { ErrorLog, log, sendData, sendError } from '../../../core/utils';

export class UserController {
  constructor(private service: IUserService) {}

  async getUsers(_: Request, res: Response): Promise<void> {
    try {
      log({
        message: `getUsers called`,
        caller: 'getUsers',
      });

      sendData(res, {
        user: 'users',
      });
    } catch (error: any) {
      log({
        message: error.message,
        level: ErrorLog,
        caller: 'getUsers',
      });
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'User fetch internal error.',
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.service.register(req.body);
      res.status(201).json(user);
    } catch (error) {}
  }
}
