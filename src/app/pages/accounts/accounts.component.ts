import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { AdAccount } from 'app/api-services/api-types/api-types.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
import { PagerService } from 'app/api-services/pager.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./account.component.scss'],


})
export class AccountsComponent implements OnInit {
  loading: boolean = true;
  allAccounts: AdAccount[];

  pager: any = {};
  pagedItems: any[];

  constructor(
    private api: ApiServiceService,
    public authService: AuthServiceService,
    private router: Router, private pagerService: PagerService,
  ) {
    this.api.getAccounts().subscribe(res => {
      this.allAccounts = res.data;
      this.setPage(1);
    }
    );
  }

  addCount(id?: number) {
    const param = id ? `/${id}` : '';
    this.router.navigate([`ad-account${param}`]);
  }

  infoAccount(id: number) {
    this.router.navigate([`account-info/${id}`]);
  }

  ngOnInit() {
  }

  initForm() {

  }

  search(ev) {
    if (ev) {
      let filteredItems = this.allAccounts.filter(
        item =>
          (!item.acc_name) ? false :
            (item.acc_name.toLowerCase().indexOf(ev.toLowerCase()) > -1
              || item.g_acc_id.indexOf(ev) > -1
              || item.director_name.toLowerCase().indexOf(ev.toLowerCase()) > -1
              || item.manager_name.toLowerCase().indexOf(ev.toLowerCase()) > -1
            )
      );

      // console.log(ev)
      // console.log(filteredItems)

      // get pager object from service
      this.pager = this.pagerService.getPager(filteredItems.length, 1);

      // get current page of items
      this.pagedItems = filteredItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } else {
      this.setPage(1);
    }


  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allAccounts.length, page);

    // get current page of items
    this.pagedItems = this.allAccounts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
