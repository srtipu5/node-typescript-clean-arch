import axios from 'axios';
import { config } from '../../../config';
import { IMsAuthService } from '../interfaces/iMsAuthService';

export class MsAuthService implements IMsAuthService {
  private msAuthUrl: string;
  private msTokenUrl: string;
  private msUserGetUrl: string;

  constructor() {
    this.msAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`;
    this.msTokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
    this.msUserGetUrl = 'https://graph.microsoft.com/v1.0/me';
  }
  generateMsAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: config.MICROSOFT_GRAPH_CLIENT_ID,
      response_type: 'code',
      redirect_uri: config.MICROSOFT_GRAPH_REDIRECT_URI,
      response_mode: 'query',
      scope: 'openid profile email User.Read',
    });
    return `${this.msAuthUrl}?${params.toString()}`;
  }

  async verifyAndGetUserInfo(code: string) {
    const tokenResponse = await axios.post(
      `${this.msTokenUrl}`,
      new URLSearchParams({
        client_id: config.MICROSOFT_GRAPH_CLIENT_ID,
        client_secret: config.MICROSOFT_GRAPH_CLIENT_SECRET,
        code,
        redirect_uri: config.MICROSOFT_GRAPH_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    );

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get(this.msUserGetUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      email: userResponse.data.mail || userResponse.data.userPrincipalName,
      name: userResponse.data.displayName,
    };
  }

  async refreshToken(refreshToken: string) {
    const tokenResponse = await axios.post(
      `${this.msTokenUrl}`,
      new URLSearchParams({
        client_id: config.MICROSOFT_GRAPH_CLIENT_ID,
        client_secret: config.MICROSOFT_GRAPH_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    );
    return { accessToken: tokenResponse.data.access_token };
  }
}
