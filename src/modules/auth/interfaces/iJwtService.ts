export interface IJwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtService {
  generateTokens(userId: string): IJwtTokens;
  verifyToken(token: string): any;
}
