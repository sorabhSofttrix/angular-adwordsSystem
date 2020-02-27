import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResolveComponent } from '../resolve/resolve.component';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { PagerService } from 'app/api-services/pager.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';

@Component({
  selector: 'app-account-alert',
  templateUrl: './account-alert.component.html',
  styleUrls: ['./account-alert.component.scss']
})
export class AccountAlertComponent implements OnInit, OnResolveResponseListener {

  pager: any = {};
  pagedItems: any[];

  allAlert: any[] = []
  searchText: string;
  modelChanged: Subject<string> = new Subject<string>()

  count: any;

  constructor(private api: ApiServiceService, private modalService: NgbModal, private pagerService: PagerService) {

    this.modelChanged.pipe(debounceTime(500))
      .subscribe(model => {
        // this.page.pageNumber = 0;
        this.searchFilter();
      });
  }
  ngOnInit() {
    this.api.getALlAlerts().subscribe((res) => {
      if (res['status']) {
        this.allAlert = res.data
        this.setPage(1);

      }
    })
  }


  resolve(id) {
    const modalRef = this.modalService.open(ResolveComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'windowsize'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.listener = this;
  }

  onApiResolve() {
    this.ngOnInit();
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allAlert.length, page);

    // get current page of items
    this.pagedItems = this.allAlert.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //pagination Count of Indexes
    if (this.pager.currentPage == 1) {
      this.count = 1 + '-' + this.pager.currentPage * 50
    }
    else if (this.pagedItems.length < 50) {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.allAlert.length
    }
    else {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.pager.currentPage * 50

    }
  }

  searchFilter() {
    let filteredItems = this.allAlert.filter(
      item => {
        // console.log('Without length----->', item.alerts.filter(alert => alert.title.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) > -1))
        // console.log('With length------->', item.alerts.filter(alert => alert.title.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) > -1).length > 0)
        return (!item.acc_name) ? false :
          (item.acc_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
            || item.g_id.indexOf(this.searchText) > -1
            || item.director_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
            || item.manager_name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
            || item.alerts.filter(alert => alert.title.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) > -1).length > 0

          )
      }
    );
    // get pager object from service
    this.pager = this.pagerService.getPager(filteredItems.length, 1);
    // get current page of items
    this.pagedItems = filteredItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  search() {
    this.modelChanged.next();
  }

}
