import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { IJwtService } from '../interfaces/iJwtService';

export class JwtService implements IJwtService {
  generateTokens(userId: string) {
    const accessToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.JWT_SECRET);
  }
}
