import { Component, OnInit, Input } from '@angular/core';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { PagerService } from 'app/api-services/pager.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'app/auth-service/auth-service.service';

@Component({
  selector: 'app-acc-specific',
  templateUrl: './acc-specific.component.html',
  styleUrls: ['./acc-specific.component.scss']
})
export class AccSpecificComponent implements OnInit {


  @Input() listener: OnResolveResponseListener;
  @Input() id: number;

  specificAcc: [] = [];
  pager: any = {};
  pagedItems: any[];
  count: any;

  constructor(public activeModal: NgbActiveModal, private router: Router, public authService: AuthServiceService,
    private api: ApiServiceService, private pagerService: PagerService) { }

  ngOnInit() {
    if (this.id) {
      this.api.getAccounts(null, this.id).subscribe(res => {
        this.specificAcc = res['data']
        this.setPage(1);
      }
      );
    }

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.specificAcc.length, page);
    // get current page of items
    this.pagedItems = this.specificAcc.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (this.pager.currentPage == 1) {
      this.count = 1 + '-' + this.pager.currentPage * 50
    }
    else if (this.pagedItems.length < 50) {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.specificAcc.length;
    }
    else {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.pager.currentPage * 50

    }
  }



  addCount(id?: number) {
    const param = id ? `/${id}` : '';
    this.router.navigate([`ad-account${param}`]);
    this.activeModal.dismiss();

  }


  infoAccount(id: number) {
    this.activeModal.dismiss();
    this.router.navigate([`account-info/${id}`]);
  }
}