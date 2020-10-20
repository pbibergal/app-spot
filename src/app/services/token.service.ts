import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  token: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
  }
}
