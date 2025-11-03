import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendData, sendError } from '../../../core/utils';
import { IMsAuthService } from '../interfaces/iMsAuthService';
import { config } from '../../../config';
import { IJwtService } from '../interfaces/iJwtService';
import { IUserRepository } from '../interfaces/iUserRepository';
import axios from 'axios';

export class MicrosoftController {
  constructor(
    private msService: IMsAuthService,
    private jwtService: IJwtService,
    private userRepo: IUserRepository,
  ) {}

  async generateAuthUrl(req: Request, res: Response) {
    try {
      const { frontendRedirectUrl } = req.body;
      const url = this.msService.generateAuthUrl(frontendRedirectUrl);
      sendData(res, { url });
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to generate Microsoft login URL',
      });
    }
  }

  async verifyCode(req: Request, res: Response) {
    try {
      const { frontendRedirectUrl, code } = req.body;

      if (!code) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'Missing authorization code',
        });
      }

      const token = await this.msService.verifyAndGetToken(frontendRedirectUrl, code);

      if (!token) {
        return sendError(res, {
          status: StatusCodes.GATEWAY_TIMEOUT,
          message: 'Token generation failed',
        });
      }

      const msUser = await this.msService.getProfile(token.access_token);

      if (!msUser) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'User not found',
        });
      }

      let user = await this.userRepo.findByEmail(msUser.userPrincipalName);

      if (!user) {
        user = await this.userRepo.create({
          email: msUser.userPrincipalName,
          name: msUser.displayName,
          msId: msUser.id,
          msAccessToken: token.access_token,
          msRefreshToken: token.refresh_token,
        });
      } else {
        await this.userRepo.updateById(user._id.toString(), {
          msAccessToken: token.access_token,
          msRefreshToken: token.refresh_token,
        });
      }

      const newTokens = await this.jwtService.generateTokens({
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
      });

      sendData(res, {
        tokenType: token.token_type,
        ...newTokens,
      });
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to verify from Microsoft',
      });
    }
  }

  async getEmails(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userRepo.findById(req.user.userId);
      if (!user) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'User not found',
        });
      }
      const emails = await this.msService.getEmails(user.msAccessToken);

      if (!emails) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'Emals not found',
        });
      }

      sendData(res, {
        emails,
      });
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to get email from Microsoft',
      });
    }
  }

  async testFrontendProxy(req: Request, res: Response): Promise<void> {
    try {
      const code = req.query.code as string;
      if (!code) {
        return sendError(res, {
          status: StatusCodes.BAD_REQUEST,
          message: 'Missing authorization code',
        });
      }
      const response = await axios.post('http://localhost:5000/ms/verify-code', {
        frontendRedirectUrl: config.MICROSOFT_GRAPH_REDIRECT_URI,
        code,
      });

      const { data } = response;

      if (!data) {
        return sendError(res, {
          status: StatusCodes.GATEWAY_TIMEOUT,
          message: 'Token generation failed',
        });
      }

      sendData(res, data);
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Microsoft authentication failed',
      });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const data = this.msService.refreshToken(refreshToken);
      sendData(res, { data });
    } catch (error) {
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to generate Microsoft login URL',
      });
    }
  }
}
