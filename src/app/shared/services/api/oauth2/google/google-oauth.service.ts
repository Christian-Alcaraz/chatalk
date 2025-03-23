import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OAUTH2_URL } from '..';
import { HttpService } from '../../http/http.service';

interface GoogleOAuthEnv {
  ROOT_URL: string;
  CLIENT_ID: string;
  SCOPES: string[];
  REDIRECT_URL: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleOAuthService {
  private readonly url = `/${OAUTH2_URL}/google`;
  private readonly googleOAuth: GoogleOAuthEnv = environment.GOOGLE_OAUTH;

  constructor(private http: HttpService) {}

  consentLogin() {
    return this.http.start<any>('get', `${this.url}/login`);
  }

  getGoogleOAuthHREF(): string {
    return `${environment.API_URL}${this.url}/login`;
  }

  getGoogleOAuthURL() {
    const rootUrl = this.googleOAuth.ROOT_URL;

    const options = {
      redirect_uri: this.googleOAuth.REDIRECT_URL,
      client_id: this.googleOAuth.CLIENT_ID,
      scope: this.googleOAuth.SCOPES.join(' '),
      access_type: 'online',
      response_type: 'token',
      prompt: 'consent',
    };

    const queryString = new URLSearchParams(options);

    return `${rootUrl}?${queryString.toString()}`;
  }
}
