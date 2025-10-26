import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { ErrorLog, log, sendData, sendError } from '../../../shared/utils';
import { StatusCodes } from 'http-status-codes';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
