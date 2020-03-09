import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { ApiServiceService } from '../api-services/api-service/api-service.service';
import { Router } from '@angular/router';
import { User } from 'app/api-services/api-types/api-types.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    nottoShowInMenu?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/project', title: 'Project', icon: 'nc-tap-01', class: '' },
    { path: '/profile', title: 'Profiles', icon: 'nc-single-02', class: '' },
    { path: '/client', title: 'Clients', icon: 'nc-ruler-pencil', class: '' },
    { path: '/sync', title: 'Unassigned account', icon: 'nc-cart-simple', class: '' },
    { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '', nottoShowInMenu: true },
    { path: '/register-user', title: 'Add Member', icon: 'nc-simple-add', class: '', nottoShowInMenu: true },
    { path: '/setup-accounts', title: 'Setup Accounts', icon: 'nc-simple-add', class: '' },
    { path: '/accounts', title: 'Management Acc.', icon: 'nc-simple-add', class: '' },
    { path: '/ad-account', title: 'Add Ad-Account', icon: 'nc-simple-add', class: '', nottoShowInMenu: true },
    { path: '/account-info', title: 'Ad-Account Details', icon: 'nc-simple-add', class: '', nottoShowInMenu: true },
    { path: '/users', title: 'Users', icon: 'nc-single-02', class: '' },
    { path: '/reasons', title: 'Reasons', icon: 'nc-single-02', class: '' },
];



@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    currentUser: User;

    constructor(
        private authService: AuthServiceService,
        private api: ApiServiceService,
        private router: Router,
    ) {
        this.currentUser = this.authService.token.user;

    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => !menuItem.nottoShowInMenu);
    }
    // private getMenuItems() {
    //     if (this.currentUser.role == 1) {
    //         return this.createMenuItemForAdmin();
    //     } else if (this.currentUser.role = 2) {
    //         return this.createMenuItemForAdmin();
    //     }
    //     return [];
    // }


    // createMenuItemForAdmin() {
    //     const menuItems = [];
    //     menuItems.push({ link: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' });
    //     menuItems.push({ link: '/sync', title: 'Unassigned account', icon: 'nc-cart-simple', class: '' });
    //     menuItems.push({ link: 'user', title: 'User Profile', icon: 'nc-single-02', class: '', nottoShowInMenu: true });
    //     menuItems.push({ link: '/register-user', title: 'Add Member', icon: 'nc-simple-add', class: '', nottoShowInMenu: true });
    //     menuItems.push({ link: '/accounts', title: 'Assigned Accounts', icon: 'nc-single-02', class: '' });
    //     menuItems.push({ link: '/ad-account', title: 'Add Ad-Account', icon: 'nc-simple-add', class: '', nottoShowInMenu: true });
    //     menuItems.push({ link: '/account-info', title: 'Ad-Account Details', icon: 'nc-simple-add', class: '', nottoShowInMenu: true });
    //     menuItems.push({ link: '/users', title: 'Users', icon: 'nc-single-02', class: '' });
    //     menuItems.push({ link: '/reasons', title: 'Reasons', icon: 'nc-single-02', class: '' });
    //     return menuItems;
    // }



    logout() {
        this.api.logout().subscribe(res => { });
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
