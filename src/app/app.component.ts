import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from './helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private _router: Router) {

  }

  ngOnInit() {
    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
        Helpers.bodyClass('fixed-layout');
      }
      if (route instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        Helpers.setLoading(false);
        Helpers.bodyClass('fixed-layout');
        // Initialize page: handlers ...

      }
    });
  }


}
