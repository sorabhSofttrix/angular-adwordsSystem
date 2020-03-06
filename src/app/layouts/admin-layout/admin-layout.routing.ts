import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AuthGuardService } from '../../guards/auth-guard/auth-guard.service';
import { RegisterUserComponent } from '../../pages/register-user/register-user.component';
import { AccountsComponent } from '../../pages/accounts/accounts.component';
import { AddAccountComponent } from '../../pages/add-account/add-account.component';
import { AccountInfoComponent } from '../../pages/account-info/account-info.component';
import { UsersComponent } from '../../pages/users/users.component';
import { SyncComponent } from 'app/pages/sync/sync.component';
import { AccountAlertComponent } from 'app/pages/account-alert/account-alert.component';
import { ReasonComponent } from 'app/pages/reason/reason.component';
import { ProfilesListingComponent } from 'app/pages/profiles-listing/profiles-listing.component';
import { ClientListingComponent } from 'app/pages/client-listing/client-listing.component';
import { ProjectListingComponent } from 'app/pages/project-listing/project-listing.component';
import { ProjectInfoComponent } from 'app/pages/project-listing/project-info/project-info.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
    { path: 'register-user', component: RegisterUserComponent, canActivate: [AuthGuardService] },
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuardService] },
    { path: 'ad-account', component: AddAccountComponent, canActivate: [AuthGuardService] },
    { path: 'ad-account/:id', component: AddAccountComponent, canActivate: [AuthGuardService] },
    { path: 'account-info/:id', component: AccountInfoComponent, canActivate: [AuthGuardService] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
    { path: 'users/:id', component: UsersComponent, canActivate: [AuthGuardService] },
    { path: 'sync', component: SyncComponent, canActivate: [AuthGuardService] },
    { path: 'accAlerts', component: AccountAlertComponent, canActivate: [AuthGuardService] },
    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'reasons',
                component: ReasonComponent,
            },

        ]
    },

    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'profile',
                component: ProfilesListingComponent,
            },

        ]
    },

    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'client',
                component: ClientListingComponent,
            },

        ]
    },
    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'project',
                component: ProjectListingComponent
            },
            {
                path: 'project-info/:id',
                component: ProjectInfoComponent
            }
        ]
    }


];
