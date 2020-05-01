import { Component, OnInit, Input } from '@angular/core';
import { Helpers } from 'app/helpers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'app/api-services/api-types/api-types.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;

  id: number
  @Input() listener: OnResolveResponseListener
  btnTxt: string = 'Save'
  constructor(private formBuilder: FormBuilder, private api: ApiServiceService, private modalService: NgbModal,
    private toastr: ToastrService, public activeModal: NgbActiveModal, private toast: ToastrService) { }

  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.api.getClientById(this.id).subscribe((res) => {
        if (res['status']) {
          this.client = res['data'][0]
          this.btnTxt = 'Update';
          this.initForm();

        }
      })
    }
  }


  initForm() {
    this.clientForm = this.formBuilder.group({
      client_name: [this.client ? this.client.client_name : '', Validators.compose([Validators.required])],
      email: [this.client ? this.client.email : ''],
      skype: [this.client ? this.client.skype : ''],
      phone: [this.client ? this.client.phone : ''],
      // sortOrder: [this.reason ? this.reason.sortOrder : ''],
    });
  }

  get client_name() { return this.clientForm.get('client_name'); }


  save() {
    this.clientForm.get('client_name').markAsDirty();
    if (this.clientForm.invalid) {
      return;
    }

    Helpers.setLoading(true);
    if (this.id > 0) {
      this.api.updateClient(this.id, this.clientForm.value).subscribe((res) => {
        if (res['status']) {
          Helpers.setLoading(false)
          this.activeModal.dismiss();
          this.toast.success('Client Updated successfully')
          this.listener.onApiResolve();
        }
      })
    }
    else {
      this.api.createClient(this.clientForm.value).subscribe((res) => {
        if (res['status']) {
          Helpers.setLoading(false)
          this.activeModal.dismiss();
          this.toast.success('Client added successfully')
          this.listener.onApiResolve();
        }
      })
    }
  }
}