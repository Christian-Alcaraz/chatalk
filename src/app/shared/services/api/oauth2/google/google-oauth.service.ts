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
  constructor(private http: HttpService) {}

  consentLogin() {
    return this.http.start<any>('get', `${this.url}/login`);
  }

  getGoogleOAuthHREF(): string {
    return `${environment.API_URL}${this.url}/login`;
  }
}
