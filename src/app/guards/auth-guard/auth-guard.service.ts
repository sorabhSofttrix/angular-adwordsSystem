import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from 'app/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthServiceService, private router: Router, ) { }

  canActivate(): boolean {
    const currentUser = this.auth.isAuthenticated();
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
