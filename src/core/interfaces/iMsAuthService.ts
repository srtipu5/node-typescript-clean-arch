export interface IMsAuthService {
  generateAuthUrl(frontendRedirectUrl: string): string;
  verifyAndGetToken(frontendRedirectUrl: string, code: string): Promise<any>;
  getProfile(accessToken: string): Promise<any>;
  getEmails(accessToken: string): Promise<any>;
  getEmailById(accessToken: string, id: number): Promise<any>;
  getEvents(accessToken: string): Promise<any>;
  getFiles(accessToken: string): Promise<any>;
  getContactInfo(accessToken: string): Promise<any>;
  sendMail(accessToken: string, data: any): Promise<any>;
  uploadFile(accessToken: string, fileName: string, content: any): Promise<any>;
  refreshToken(refreshToken: string): Promise<any>;
}
