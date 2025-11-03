import axios from 'axios';
import { config } from '../../config';
import { IMsAuthService } from '../interfaces/iMsAuthService';

export class MicrosoftService implements IMsAuthService {
  private msAuthUrl: string;
  private msTokenUrl: string;
  private msProfileUrl: string;
  private msGetEmailUrl: string;
  private msSendEmailUrl: string;
  private msEventsUrl: string;
  private msFilesUrl: string;
  private msContactUrl: string;

  constructor() {
    this.msAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`;
    this.msTokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
    this.msProfileUrl = 'https://graph.microsoft.com/v1.0/me';
    this.msGetEmailUrl = 'https://graph.microsoft.com/v1.0/me/messages';
    this.msSendEmailUrl = 'https://graph.microsoft.com/v1.0/me/sendMail';
    this.msEventsUrl = 'https://graph.microsoft.com/v1.0/me/events';
    this.msContactUrl = 'https://graph.microsoft.com/v1.0/me/contacts';
    this.msFilesUrl = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
  }

  // generate ms redirect url
  generateAuthUrl(frontendRedirectUrl: string): string {
    const params = new URLSearchParams({
      client_id: config.MICROSOFT_GRAPH_CLIENT_ID,
      response_type: 'code',
      redirect_uri: frontendRedirectUrl,
      response_mode: 'query',
      scope: [
        'openid',
        'profile',
        'email',
        'offline_access', // for refresh token
        'User.Read',
        'Mail.Read',
        'Mail.Send',
        'Calendars.Read',
        'Files.ReadWrite',
        'Contacts.Read',
      ].join(' '),
    });
    return `${this.msAuthUrl}?${params.toString()}`;
  }

  // verify and get token
  async verifyAndGetToken(frontendRedirectUrl: string, code: string) {
    const response = await axios.post(
      `${this.msTokenUrl}`,
      new URLSearchParams({
        client_id: config.MICROSOFT_GRAPH_CLIENT_ID,
        client_secret: config.MICROSOFT_GRAPH_CLIENT_SECRET,
        code,
        redirect_uri: frontendRedirectUrl,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  }

  // create new refresh token
  async refreshToken(refreshToken: string) {
    const response = await axios.post(
      `${this.msTokenUrl}`,
      new URLSearchParams({
        client_id: config.MICROSOFT_GRAPH_CLIENT_ID,
        client_secret: config.MICROSOFT_GRAPH_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response.data;
  }

  // fetch profile
  async getProfile(accessToken: string) {
    const response = await axios.get(`${this.msProfileUrl}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // fetch all mails
  async getEmails(accessToken: string) {
    const response = await axios.get(`${this.msGetEmailUrl}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // fetch mail by id
  async getEmailById(accessToken: string, id: number) {
    const response = await axios.get(`${this.msGetEmailUrl}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // fetch all events
  async getEvents(accessToken: string) {
    const response = await axios.get(`${this.msEventsUrl}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // fetch all files
  async getFiles(accessToken: string) {
    const response = await axios.get(`${this.msFilesUrl}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // fetch contact info
  async getContactInfo(accessToken: string) {
    const response = await axios.get(`${this.msContactUrl}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // send email
  async sendMail(accessToken: string, data: any) {
    const { to, subject, body } = data;
    const emailData = {
      message: {
        subject,
        body: {
          contentType: 'Text',
          content: body,
        },
        toRecipients: [{ emailAddress: { address: to } }],
      },
      saveToSentItems: true,
    };

    const response = await axios.post(`${this.msSendEmailUrl}`, emailData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  // upload file
  async uploadFile(accessToken: string, fileName: string, content: any) {
    const response = await axios.put(
      `${this.msProfileUrl}/drive/root:/${fileName}:/content`,
      content,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'text/plain',
        },
      },
    );
    return response.data;
  }
}
