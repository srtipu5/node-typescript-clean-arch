export interface IMsAuthService {
  generateMsAuthUrl(): string;
  verifyAndGetUserInfo(code: string): Promise<any>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string }>;
}
