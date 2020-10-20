import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  static extractToken(fragment: string): string {
    if (!!fragment) {
      try {
        const tokenParam = fragment.split('&').find(s => s.includes('access_token'));
        return tokenParam.split('=')[1];
      } catch (err) {
        console.log(err);
      }
    }
    return null;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = TokenGuard.extractToken(next.fragment);

    if (!!token) {
      this.authService.setToken(token);
      return true;
    }
    else {
      return false;
    }
  }
}
