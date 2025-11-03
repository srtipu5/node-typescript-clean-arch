export interface IJwtTokens {
  accessToken: string;
  refreshToken: string;
}

export type TokenPayload = {
  userId: string;
  email: string;
  name?: string;
  type?: 'access' | 'refresh';
};

export interface IJwtService {
  generateTokens(payload: TokenPayload): Promise<IJwtTokens>;
  verifyToken(token: string): any;
}
