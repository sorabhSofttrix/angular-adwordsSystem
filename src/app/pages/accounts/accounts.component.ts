import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { AdAccount, AccountStatus } from 'app/api-services/api-types/api-types.service';
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
  searchText: string;
  status_filter: string;

  accStatus = ['All', AccountStatus.active, AccountStatus.closed, AccountStatus.paused];


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

    this.status_filter = this.accStatus[1]
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

  search() {
    // console.log(this.status_filter)
    if (!this.searchText && this.status_filter == 'All') {
      this.setPage(1);
    } else {
      let filteredItems = this.allAccounts.filter(
        item => {
          if (!this.searchText && this.status_filter != 'All') {
            return item.acc_status == this.status_filter
          }
          if (this.searchText && this.status_filter != 'All') {
            return (!item.acc_name) ? false :
              (item.acc_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
                || item.g_acc_id.indexOf(this.searchText) > -1
                || item.director_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
                || item.manager_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
              ) && (
                item.acc_status == this.status_filter
              )
          }

          if (this.searchText && this.status_filter == 'All') {
            return (!item.acc_name) ? false :
              (item.acc_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
                || item.g_acc_id.indexOf(this.searchText) > -1
                || item.director_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
                || item.manager_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
              )
          }
        }
      );
      // get pager object from service
      this.pager = this.pagerService.getPager(filteredItems.length, 1);
      // get current page of items
      this.pagedItems = filteredItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allAccounts.length, page);

    // get current page of items
    this.pagedItems = this.allAccounts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
