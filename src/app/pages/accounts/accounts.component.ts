import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { AdAccount, AccountStatus } from 'app/api-services/api-types/api-types.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
import { PagerService } from 'app/api-services/pager.service';
import { Subject } from 'rxjs/index';
import { debounceTime } from 'rxjs/internal/operators';
import { SharedService } from 'app/api-services/shared.service';
import { ToastrService } from 'ngx-toastr';

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
  modelChanged: Subject<string> = new Subject<string>();

  count: any;
  startDate;
  endDate

  btnDisable: boolean = false

  dataRes: any = [];

  constructor(private activatedRoute: ActivatedRoute,
    private api: ApiServiceService, private _sharedService: SharedService,
    public authService: AuthServiceService, private toastr: ToastrService,
    private router: Router, private pagerService: PagerService,
  ) {


    this.api.getAccounts().subscribe(res => {
      this.allAccounts = res.data;
      this.setPage(1);
    }

    );
    this.modelChanged.pipe(debounceTime(500))
      .subscribe(model => {
        // this.page.pageNumber = 0;
        this.searchFilter();
      });
  }

  addCount(id?: number) {
    const param = id ? `/${id}` : '';
    this.router.navigate([`ad-account${param}`]);
  };

  infoAccount(id: number) {
    this.router.navigate([`account-info/${id}`]);
  };

  ngOnInit() {
    // console.log(this.startDate)
    this.activatedRoute.queryParams.subscribe(params => {
      let value = params['q'];
      if (value) {
        this.status_filter = value
        console.log('if--->>', this.status_filter);
        this.searchFilter();
      }
      else {
        this.status_filter = this.accStatus[1]
      }
    });


  }

  searchFilter() {
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
    if (this.pager.currentPage == 1) {
      this.count = 1 + '-' + this.pager.currentPage * 50
    }
    else if (this.pagedItems.length < 50) {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.allAccounts.length
    }
    else {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.pager.currentPage * 50

    }
  }


  search() {
    this.modelChanged.next();
  }

  getData() {
    this.btnDisable = true
    if (!this.startDate) {
      this.toastr.error('Please select Start date')
      return
    }
    if (!this.endDate) {
      this.toastr.error('Please select End date')
      return
    }
    if (this.status_filter == 'All') {
      this.toastr.error('Please select other status except All')
      return
    }

    const from = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
    const to = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
    console.log('startDate -- >', from, 'endDate --->', to, 'Status', this.status_filter)
    if (from > to) {
      this.toastr.error('End date can not be greater than start date')
    }
    else {
      // this.toastr.success('Hurray!!')
      const reqBody = { from, to, 'status': this.status_filter }
      // console.log(reqBody)
      this.api.getDteWiseData(reqBody).subscribe((res) => {
        this.dataRes = res['data']
        this.filterFXn();
        this.btnDisable = false;
      })
    }
  }

  filterFXn() {
    // console.log(this.allAccounts);
    let filteredItems = [];
    filteredItems = this.allAccounts.filter(item => this.dataRes.includes(item.g_acc_id))
    filteredItems.map(item => {
      item.acc_status = this.status_filter;
    });
    // get pager object from service
    this.pager = this.pagerService.getPager(filteredItems.length, 1);
    // get current page of items
    this.pagedItems = filteredItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
