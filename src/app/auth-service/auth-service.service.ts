import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authenticationState = new BehaviorSubject(false);
  token: any;
  constructor(private router: Router,) { 
    this.checkToken();
  }
 
  alterToken(newValue: any) {
    newValue.createdAt = new Date();
    delete newValue.expires_in;
    return newValue;
  }
  updateTokenValue(newValue: any) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(this.alterToken(newValue)));
    this.token = newValue;
  }

  checkToken() {
    let locToken = localStorage.getItem(TOKEN_KEY);
    if(locToken) {
      this.token = JSON.parse(locToken);
      this.authenticationState.next(true);
    }
  }
 
  login(token: any) {
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
