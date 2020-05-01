import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { TokenResponse, User } from '../api-services/api-types/api-types.service';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  tokenExpireCloselModals: BehaviorSubject<any> = new BehaviorSubject('');

  authenticationState = new BehaviorSubject(false);
  token: TokenResponse;
  constructor(private router: Router, ) {
    this.checkToken();
  }

  alterToken(newValue: TokenResponse) {
    newValue.createdAt = new Date() + '';
    newValue.expires_in = '';
    return newValue;
  }

  updateTokenValue(newValue: TokenResponse) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(this.alterToken(newValue)));
    this.token = newValue;
  }

  updateTokenUser(user: User) {
    this.token.user = user;
    this.updateTokenValue(this.token);
  }

  checkToken() {
    let locToken = localStorage.getItem(TOKEN_KEY);
    // let locToken = localStorage.getItem('1321321321asdsa');
    if (locToken) {
      this.token = JSON.parse(locToken);
      this.authenticationState.next(true);
    }
  }

  login(token: TokenResponse) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(this.alterToken(token)));
    this.token = token;
    this.authenticationState.next(true);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.token = null;
    this.authenticationState.next(false);
    this.router.navigate(['/login']);
    return this.authenticationState;
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
