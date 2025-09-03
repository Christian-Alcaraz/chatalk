import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { StringService } from './string.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    public string: StringService,
    public cookie: CookieService,
  ) {}
}
