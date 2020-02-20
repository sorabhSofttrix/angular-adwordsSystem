import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private _router: Router, private ngxLoader: NgxUiLoaderService) {

  }

  ngOnInit() {
    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        this.ngxLoader.startLoader('loader-01');

      }
      if (route instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        this.ngxLoader.stopLoader('loader-01');
        // Initialize page: handlers ...

      }
    });
  }


}
