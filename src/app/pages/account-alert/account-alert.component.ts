import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResolveComponent } from '../resolve/resolve.component';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';

@Component({
  selector: 'app-account-alert',
  templateUrl: './account-alert.component.html',
  styleUrls: ['./account-alert.component.scss']
})
export class AccountAlertComponent implements OnInit, OnResolveResponseListener {

  allAlert: any[] = []
  constructor(private api: ApiServiceService, private modalService: NgbModal, ) {

  }
  ngOnInit() {

    this.api.getALlAlerts().subscribe((res) => {
      if (res['status']) {
        this.allAlert = res.data
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

}
