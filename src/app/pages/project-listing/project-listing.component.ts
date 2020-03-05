import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { DeleteComponent } from '../delete/delete.component';
import { Project } from 'app/api-services/api-types/api-types.service';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent implements OnInit {

  project: Project[] = []

  constructor(private modalService: NgbModal, private api: ApiServiceService, ) { }

  ngOnInit() {

    this.api.getAllProject().subscribe((res) => {
      if (res['status']) {
        this.project = res['data'];
      }
    })
  }

  addProject(id?: number) {
    const modalRef = this.modalService.open(AddProjectComponent, {
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
    modalRef.componentInstance.type = 'Project';
    modalRef.componentInstance.listener = this;
  }

  onApiResolve() {
    this.ngOnInit();
  }

}