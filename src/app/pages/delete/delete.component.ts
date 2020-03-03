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
  @Input() listener: OnResolveResponseListener;
  constructor(private api: ApiServiceService, public activeModal: NgbActiveModal, private toast: ToastrService,
  ) { }

  ngOnInit() {
    // console.log(this.id)
  }
  delete() {
    Helpers.setLoading(true)
    this.api.deleteReason(this.id).subscribe((res) => {
      if (res['status']) {
        Helpers.setLoading(false)
        this.activeModal.dismiss();
        this.toast.error('Reason deleted successfully')
        this.listener.onApiResolve()
      }
    })

  }


}
