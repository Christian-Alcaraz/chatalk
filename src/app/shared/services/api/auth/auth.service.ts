import { inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `/auth`;
  private readonly http = inject(HttpService);

  login() {
    return this.http.start<any>('post', `${this.url}/login`);
  }
}
