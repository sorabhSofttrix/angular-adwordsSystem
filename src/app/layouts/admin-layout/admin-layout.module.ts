import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from '../../pages/register-user/register-user.component';
import { AccountsComponent } from '../../pages/accounts/accounts.component';
import { AddAccountComponent } from '../../pages/add-account/add-account.component';
import { AccountInfoComponent } from '../../pages/account-info/account-info.component';
import { UsersComponent } from '../../pages/users/users.component';
import { SyncComponent } from 'app/pages/sync/sync.component';
import { AccountAlertComponent } from 'app/pages/account-alert/account-alert.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    RegisterUserComponent,
    AccountsComponent,
    AddAccountComponent,
    AccountInfoComponent,
    UsersComponent,
    SyncComponent,
    AccountAlertComponent
    
  ]
})

export class AdminLayoutModule { }
