import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Reasons } from '../../api-services/api-types/api-types.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { Helpers } from 'app/helpers';
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit, OnResolveResponseListener {

  reasonForm: FormGroup;
  reason: Reasons;
  reasons: Reasons[] = [];
  btnTxt = 'Save'
  updateId: any;

  constructor(private formBuilder: FormBuilder, private api: ApiServiceService, private modalService: NgbModal,
    private toastr: ToastrService, ) { }

  ngOnInit() {
    this.api.getAllReasons().subscribe((res) => {
      if (res['status']) {
        this.reasons = res['data']
      }
    })

    this.initForm();
  }

  initForm() {
    this.reasonForm = this.formBuilder.group({
      title: [this.reason ? this.reason.title : '', Validators.compose([Validators.required])],
      rank: [this.reason ? this.reason.rank : ''],
      sortOrder: [this.reason ? this.reason.sortOrder : ''],
    });
  }

  get title() { return this.reasonForm.get('title'); }

  submit() {
    this.reasonForm.get('title').markAsDirty();
    if (this.reasonForm.invalid) {
      return;
    }
    Helpers.setLoading(true)

    if (this.updateId > 0) {
      this.reasonForm.value.id = this.updateId
      this.api.updateReason(this.reasonForm.value).subscribe((res) => {
        if (res['status']) {
          Helpers.setLoading(false)
          this.toastr.success('Reason updated successfully');
          this.ngOnInit();
          this.reasonForm.reset();
          this.btnTxt = 'Save'
          this.updateId = null

        }
      })
    }
    else {
      this.api.createReason(this.reasonForm.value).subscribe((res) => {
        if (res['status']) {
          Helpers.setLoading(false)
          this.toastr.success('Reason saved successfully');
          this.ngOnInit();
          this.reasonForm.reset();
        }
      })
    }
  }

  edit(id) {
    this.updateId = id
    Helpers.setLoading(true)
    this.api.getReasonById(id).subscribe((res) => {
      if (res['status']) {
        Helpers.setLoading(false)
        this.reason = res['data'][0]
        this.initForm()
        this.btnTxt = 'update'
      }
    })
  }

  delete(id) {
    const modalRef = this.modalService.open(DeleteComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'windowsize'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Reason';
    modalRef.componentInstance.listener = this;
  }


  onApiResolve() {
    this.ngOnInit()
  }

}
