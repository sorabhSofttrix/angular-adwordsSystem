import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { ApiServiceService } from '../api-services/api-service/api-service.service';
import { Router } from '@angular/router';
import { User } from 'app/api-services/api-types/api-types.service';


export interface RouteInfo {
    id: number,
    path: string;
    title: string;
    icon: string;
    class: string;
    nottoShowInMenu?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { id: 1, path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { id: 2, path: '/project', title: 'Project', icon: 'nc-tap-01', class: '' },
    { id: 3, path: '/profile', title: 'Profiles', icon: 'nc-single-02', class: '' },
    { id: 4, path: '/client', title: 'Clients', icon: 'nc-ruler-pencil', class: '' },
    { id: 5, path: '/sync', title: 'Unassigned account', icon: 'nc-cart-simple', class: '' },
    { id: 6, path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '', nottoShowInMenu: true },
    { id: 7, path: '/register-user', title: 'Add Member', icon: 'nc-simple-add', class: '', nottoShowInMenu: true },
    { id: 8, path: '/setup-accounts', title: 'Setup Accounts', icon: 'nc-simple-add', class: '' },
    { id: 9, path: '/accounts', title: 'Management Acc.', icon: 'nc-simple-add', class: '' },
    { id: 10, path: '/ad-account', title: 'Add Ad-Account', icon: 'nc-simple-add', class: '', nottoShowInMenu: true },
    { id: 11, path: '/account-info', title: 'Ad-Account Details', icon: 'nc-simple-add', class: '', nottoShowInMenu: true },
    { id: 12, path: '/users', title: 'Users', icon: 'nc-single-02', class: '' },
    { id: 13, path: '/reasons', title: 'Reasons', icon: 'nc-single-02', class: '' },
];



@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    currentUser: User;

    supeAdminMenus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    adminMenus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    managerMenus = [1, 2, 5, 6, 8, 9, 10, 11, 12];

    constructor(
        private authService: AuthServiceService,
        private api: ApiServiceService,
        private router: Router,
    ) {
        this.currentUser = this.authService.token.user;

    }
    ngOnInit() {
        const menusAllowed = this.getMenuItems()
        this.menuItems = ROUTES.filter(menuItem => (!menuItem.nottoShowInMenu && menusAllowed.includes(menuItem.id)));
    }
    private getMenuItems() {
        if (this.currentUser.role_id == 1 || this.currentUser.role_id == 2) {
            return this.supeAdminMenus;
        }
        else if (this.currentUser.role_id == 3 || this.currentUser.role_id == 4) {
            return this.managerMenus;
        }
        return [];
    }


    logout() {
        this.api.logout().subscribe(res => { });
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
