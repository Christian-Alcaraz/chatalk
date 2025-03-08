import { Injectable } from '@angular/core';
import { StringService } from './string/string.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(public string: StringService) {}
}
