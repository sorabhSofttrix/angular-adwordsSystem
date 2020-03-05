import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from 'app/helpers';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() id: any;
  type: string;
  message: string;
  loading: boolean = false;
  @Input() listener: OnResolveResponseListener;
  deleteValue: string;


  constructor(private api: ApiServiceService, public activeModal: NgbActiveModal,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    // console.log(this.id)
    const text = 'Are you sure you want to delete this';
    switch (this.type) {
      case 'Profile':
        this.message = text + ' Profile?';
        break;
      case 'Reason':
        this.message = text + ' Reason?';
        break;
      case 'Client':
        this.message = text + ' Client?';
        break;
      case 'Project':
        this.message = text + ' Project?';
        break;
    }
    this.loading = true;

  }

  ngAfterViewInit(): void {

  }


  confirm() {
    switch (this.type) {
      case 'Profile':
        this.deleteProfile();
        break;
      case 'Reason':
        this.deleteReason();
        break;
      case 'Client':
        this.deleteClient();
        break;
      case 'Project':
        this.deleteProject();
        break;


    }
  }

  deleteProject() {
    Helpers.setLoading(true)
    this.api.deleteProject(this.id).subscribe((res) => {
      if (res['status']) {
        this.deleteValue = 'Project'
        this.completeModal(this.deleteValue)
      }
    })
  }

  deleteClient() {
    Helpers.setLoading(true)
    this.api.deleteClient(this.id).subscribe((res) => {
      if (res['status']) {
        this.deleteValue = 'Client'
        this.completeModal(this.deleteValue)
      }
    })
  }

  deleteReason() {
    Helpers.setLoading(true)
    this.api.deleteReason(this.id).subscribe((res) => {
      if (res['status']) {
        this.deleteValue = 'Reason'
        this.completeModal(this.deleteValue)
      }
    })
  }

  deleteProfile() {
    Helpers.setLoading(true)
    this.api.deleteProfile(this.id).subscribe((res) => {
      if (res['status']) {
        this.deleteValue = 'Profile'
        this.completeModal(this.deleteValue)
      }
    })
  }


  completeModal(val) {
    Helpers.setLoading(false)
    this.activeModal.dismiss();
    this.toast.error(val, ' deleted successfully')
    this.listener.onApiResolve()
  }

}
