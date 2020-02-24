import { Component, OnInit, Input } from '@angular/core';
import { IncomingHttpStatusHeader } from 'http2';
import { cpus } from 'os';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html',
  styleUrls: ['./resolve.component.scss']
})
export class ResolveComponent implements OnInit {
  errorMessage: string;
  comments: any;
  @Input() listener: OnResolveResponseListener;
  @Input() id: number;
  constructor(private api: ApiServiceService, private toastr: ToastrService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.id);

  }

  resolve() {

    if (!this.comments) {
      // this.toastr.error('Please add comment')
      this.errorMessage = 'Please add comment!!'
      return
    }
    this.api.updateComment(this.id, this.comments).subscribe((res) => {
      if (res['status']) {
        this.activeModal.dismiss();
        // this.toastr.success('Comment update successfully')
        this.toastr.success('Comment updated succesffully')
        this.listener.onApiResolve();
        console.log(this.id, this.comments)
      }
    })
  }


}

