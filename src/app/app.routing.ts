import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard/auth-guard.service';
import { NonAuthGuardService } from './guards/non-auth-guard/non-auth-guard.service';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuardService]},
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivate: [AuthGuardService]
  }]},
]
