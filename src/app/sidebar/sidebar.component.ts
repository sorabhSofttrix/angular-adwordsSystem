import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { ApiServiceService } from '../api-services/api-service/api-service.service';
import { Router } from '@angular/router';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    nottoShowInMenu?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',  title: 'Dashboard',  icon:'nc-bank', class: '' },
    { path: '/user', title: 'User Profile', icon:'nc-single-02', class: '' },
    { path: '/register-user', title: 'Add Member',  icon:'nc-simple-add',  class: '', nottoShowInMenu: true },
    { path: '/accounts', title: 'Ad Accounts', icon:'nc-simple-add', class: ''},
    { path: '/ad-account', title: 'Add Ad-Account', icon:'nc-simple-add', class: '', nottoShowInMenu: true },
    { path: '/account-info', title: 'Ad-Account Details', icon:'nc-simple-add', class: '', nottoShowInMenu: true },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(
        private authService: AuthServiceService,
        private api: ApiServiceService,
        private router: Router,
    ) {

    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => !menuItem.nottoShowInMenu);
    }

    logout(){
        this.api.logout().subscribe(res => { });
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
