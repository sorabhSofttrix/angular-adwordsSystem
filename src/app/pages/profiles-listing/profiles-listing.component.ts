import { Component, OnInit } from '@angular/core';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { Profile } from 'app/api-services/api-types/api-types.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-profiles-listing',
  templateUrl: './profiles-listing.component.html',
  styleUrls: ['./profiles-listing.component.scss']
})
export class ProfilesListingComponent implements OnInit, OnResolveResponseListener {

  profiles: Profile[] = []

  constructor(private modalService: NgbModal, private api: ApiServiceService, ) { }

  ngOnInit() {

    this.api.getAllProfiles().subscribe((res) => {
      if (res['status']) {
        this.profiles = res['data']
      }
    })
  }

  addProfile(id?: number) {
    const modalRef = this.modalService.open(AddProfileComponent, {
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
    modalRef.componentInstance.type = 'Profile';
    modalRef.componentInstance.listener = this;
  }

  onApiResolve() {
    this.ngOnInit();
  }

}