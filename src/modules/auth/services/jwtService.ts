import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { IJwtService, TokenPayload } from '../interfaces/iJwtService';
import { IUserRepository } from '../interfaces/iUserRepository';

export class JwtService implements IJwtService {
  constructor(private userRepo: IUserRepository) {}
  async generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign({ ...payload, type: 'access' }, config.JWT_SECRET, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ userId: payload.userId, type: 'refresh' }, config.JWT_SECRET, {
      expiresIn: '7d',
    });

    await this.userRepo.updateById(payload.userId, { accessToken, refreshToken });

    return { accessToken, refreshToken };
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.JWT_SECRET);
  }
}
