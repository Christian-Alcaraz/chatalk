import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Token } from '@core/constants';
import { CookieService } from '@shared/services/util/cookie.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `/auth`;
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  login(email: string, password: string) {
    return this.http.post<any>(environment.API_URL + `${this.url}/login`, {
      email,
      password,
    });
  }

  me() {
    const authCookie = this.cookieService.get(Token.Auth);

    return this.http.get<any>(environment.API_URL + `${this.url}/me`, {
      headers: {
        Authorization: `Bearer ${authCookie}`,
      },
    });
  }
}
