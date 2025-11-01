import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendData, sendError } from '../../../core/utils';
import { IMsAuthService } from '../interfaces/iMsAuthService';
import { config } from '../../../config';
import { IJwtService } from '../interfaces/iJwtService';
import { IUserRepository } from '../interfaces/iUserRepository';

export class MsAuthController {
  constructor(
    private msService: IMsAuthService,
    private jwtService: IJwtService,
    private userRepo: IUserRepository,
  ) {}

  async redirectToMicrosoft(_req: Request, res: Response): Promise<void> {
    try {
      const url = this.msService.generateMsAuthUrl();
      sendData(res, { data: { url } });
      // res.redirect(url)
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to generate Microsoft login URL',
      });
    }
  }

  async redirectToClient(req: Request, res: Response): Promise<void> {
    try {
      const code = req.query.code as string;
      if (!code) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'Missing authorization code',
        });
      }

      const msUser = await this.msService.verifyAndGetUserInfo(code);

      let user = await this.userRepo.findByEmail(msUser.email);

      if (!user) {
        user = await this.userRepo.create(msUser);
      }

      const tokens = this.jwtService.generateTokens(user.id);
      await this.userRepo.updateRefreshToken(user.id, tokens.refreshToken);

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 60 mins
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.redirect(`${config.FRONTEND_URL}`);
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Microsoft authentication failed',
      });
    }
  }
}
