import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { AUTH_URL } from '../constants';

const TOKEN = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = '2f6bb7e80b8f4c0d8ddfd6007bac801e';
  private redirectUri = encodeURIComponent('http://localhost:4200/authorized');
  private readonly mToken: BehaviorSubject<string>;

  constructor(private storageService: StorageService) {
    const token = this.storageService.isItemExists(TOKEN) ? this.storageService.getItem(TOKEN) : '';
    this.mToken = new BehaviorSubject<string>(token);
  }

  authorize(): void {
    window.location.href = AUTH_URL + '?client_id=' + this.clientId + '&response_type=token&redirect_uri=' + this.redirectUri + '&state=&show_dialog=true&scope=user-read-private%20playlist-read-private%20playlist-modify-public%20playlist-read-collaborative%20user-top-read%20user-read-recently-played%20user-library-read%20user-library-modify%20user-read-currently-playing%20user-modify-playback-state%20user-read-playback-state%20user-follow-read%20user-follow-modify%20streaming';
  }

  logout(): void {
    this.storageService.removeItem(TOKEN);
  }

  token(): BehaviorSubject<string> {
    return this.mToken;
  }

  setToken(token: string): void {
    this.storageService.setItem('auth_token', token);
    this.mToken.next(token);
  }
}
