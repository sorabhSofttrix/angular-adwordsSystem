import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { timer } from 'rxjs';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']


})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  alertCount: number = 0;
  public isCollapsed = true;
  sub: any;
  unAuth: any;

  @ViewChild("navbar-cmp", { static: false }) button;


  constructor(location: Location, private renderer: Renderer, public auth: AuthServiceService,
    private element: ElementRef, private router: Router, private api: ApiServiceService) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.getAllAlertCounts();
    this.sub = this.auth.authenticationState.subscribe(res => {
      if (!res) {
        clearInterval(this.unAuth)
      } else {
        this.unAuth = setInterval(() => {
          this.getAllAlertCounts();
        }, 60000);
      }
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }


  getAllAlertCounts() {
    this.api.getAllAlertCount().subscribe((res) => {
      if (res['status']) {
        this.alertCount = res['data']

      }
      else { this.alertCount = 0 }

    }, ((error) => {
      this.alertCount = 0;
      console.log(error.error);

    }))
  }


  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      } else {
        let titl: any = titlee;
        titl = (titl.charAt(0) == '/') ? titl.slice(1).split('/') : titl.split('/');
        if (titl && '/' + titl[0] == this.listTitles[item].path) {
          return this.listTitles[item].title;
        }
      }
    }
    return 'Dashboard';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      if (mainPanel) {
        mainPanel.style.position = 'fixed';
      }
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        if (mainPanel) {
          mainPanel.style.position = '';
        }
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }




}
