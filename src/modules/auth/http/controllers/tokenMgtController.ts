import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendData, sendError } from '../../../../core/utils';
import { UpadateTokenDto } from '../dtos';
import { IJwtService, IUserRepository } from '../../../../core/interfaces';

export class TokenMgtController {
  constructor(
    private jwtService: IJwtService,
    private userRepo: IUserRepository,
  ) {}

  async updateToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body as UpadateTokenDto;
      if (!refreshToken) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'Missing refresh token',
        });
      }

      const decoded: any = this.jwtService.verifyToken(refreshToken);
      const newTokens = this.jwtService.generateTokens(decoded.userId);

      // await this.userRepo.updateById(decoded.userId, newTokens.refreshToken);

      sendData(res, { data: newTokens });
    } catch (error) {
      sendError(res, {
        status: StatusCodes.UNAUTHORIZED,
        message: 'Invalid or expired refresh token',
      });
    }
  }
}
