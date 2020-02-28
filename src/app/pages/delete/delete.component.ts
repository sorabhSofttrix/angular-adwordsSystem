import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() id: any;
  @Input() listener: OnResolveResponseListener;
  constructor(private api: ApiServiceService, public activeModal: NgbActiveModal, private toast: ToastrService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    console.log(this.id)
  }
  delete() {
    this.ngxLoader.startLoader('loader-01');
    this.api.deleteReason(this.id).subscribe((res) => {
      if (res['status']) {
        this.ngxLoader.stopLoader('loader-01');
        this.activeModal.dismiss();
        this.toast.error('Reason deleted successfully')
        this.listener.onApiResolve()
      }
    })

  }


}