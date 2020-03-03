import { Component, OnInit } from '@angular/core';
import { DeleteComponent } from '../delete/delete.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'app/api-services/api-types/api-types.service';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  client: Client[] = []

  constructor(private modalService: NgbModal, private api: ApiServiceService, ) { }

  ngOnInit() {

    this.api.getAllClient().subscribe((res) => {
      if (res['status']) {
        this.client = res['data']
      }
    })
  }

  addClient(id?: number) {
    const modalRef = this.modalService.open(AddClientComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'windowsize'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.listener = this;
  }


  delete(id) {
    const modalRef = this.modalService.open(DeleteComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'windowsize'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Client';
    modalRef.componentInstance.listener = this;
  }

  onApiResolve() {
    this.ngOnInit();
  }

}
