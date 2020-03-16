import { Component, OnInit, Input, ViewChild, NgModuleRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, NgModel } from '@angular/forms';
import { Project, Profile, Client } from 'app/api-services/api-types/api-types.service';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from 'app/helpers';
import { validateFile, toFormData, covertStringDateToObject, covertDateObjectToString } from 'app/utils/utils';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';
import { DeleteComponent } from 'app/pages/delete/delete.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit, OnResolveResponseListener {
  projectForm: FormGroup;
  project: Project;

  profile: Profile[] = []
  client: Client[] = []
  id: number
  @Input() listener: OnResolveResponseListener

  btnTxt: string = 'Save'
  @ViewChild('questionnaire', { static: false }) questionnaire: any;
  errorMessage: string
  google_accounts: any;
  additional_files: any;
  modelChanged: Subject<string> = new Subject<string>();


  constructor(private formBuilder: FormBuilder, private api: ApiServiceService, private modalService: NgbModal,
    private toastr: ToastrService, public activeModal: NgbActiveModal) {
    this.modelChanged.pipe(debounceTime(500))
      .subscribe(model => {
        this.veryfyId(model);
      });
  }


  ngOnInit() {

    this.getClient();
    this.getProfile();

    this.initForm();
    if (this.id) {
      this.api.getProjectById(this.id).subscribe((res) => {
        if (res['status']) {
          this.project = res["data"][0];
          this.btnTxt = 'Update';
          if (this.project && this.project.contract_start_date) {
            this.project.contract_start_date = covertStringDateToObject(this.project.contract_start_date);
          }
          this.initForm();

        }
      })
    }

  }

  getClient() {
    this.api.getAllClient().subscribe((res) => {
      if (res['status']) {
        this.client = res['data']
      }
    })
  }

  getProfile() {
    this.api.getAllProfiles().subscribe((res) => {
      if (res['status']) {
        this.profile = res['data']
      }
    })
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      id: [this.project ? this.project.id : null],
      project_name: [this.project ? this.project.project_name : '',],
      client_name: [this.project ? this.project.client_name : '', Validators.compose([Validators.required])],
      client: [this.project ? this.project.client : ''],
      profile: [this.project ? this.project.profile : ''],
      hourly_rate: [this.project ? this.project.hourly_rate : ''],
      weekly_limit: [this.project ? this.project.weekly_limit : ''],
      phone: [this.project ? this.project.phone : ''],
      skype: [this.project ? this.project.skype : ''],
      comment: [this.project ? this.project.comment : ''],
      // contract_start_date: [this.project ? this.project.contract_start_date : ''],
      contract_start_date: [this.project ? this.project.contract_start_date : '', Validators.required],
      questionnaire: [''],
      // googelAccountIds: new FormArray([]),
      google_accounts: this.formBuilder.array([this.createItem()]),
      email: [this.project ? this.project.email : '', Validators.compose([Validators.required, Validators.email])],
      additional_files: [''],
    });
  }


  addItem(): void {
    this.google_accounts = this.projectForm.get('google_accounts') as FormArray;
    this.google_accounts.push(this.createItem());
    // console.log(this.google_accounts.value)
  }

  deleteItem(obj, idx) {
    this.google_accounts = this.projectForm.get('google_accounts') as FormArray;
    // this.items.value.splice(idx, 1)
    if (this.google_accounts.length > 1) {
      this.google_accounts.removeAt(idx);;
    }
    else {
      this.toastr.error('Can not be deleted');
    }
    // console.log(this.google_accounts.value)
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      acc_name: '',
      g_acc_id: '',
    });
  }
  get contract_start_date() { return this.projectForm.get('contract_start_date'); }
  get client_name() { return this.projectForm.get('client_name'); }
  get email() { return this.projectForm.get('email'); }


  getVal(id) {
    if (id) {
      let a = this.client.filter(o => o.id == id)[0]
      this.projectForm.get('client_name').setValue(a.client_name);
      this.projectForm.get('email').setValue(a.email);
      this.projectForm.get('phone').setValue(a.phone);
      this.projectForm.get('skype').setValue(a.skype);
    } else {
      this.projectForm.get('client_name').setValue('');
      this.projectForm.get('email').setValue('');
      this.projectForm.get('phone').setValue('');
      this.projectForm.get('skype').setValue('');
    }
  }



  search(val) {
    this.modelChanged.next(val)

  }

  veryfyId(val) {
    this.api.checkGoogleId(val).subscribe((res) => {
      if (res['status']) {
        let google_accounts = this.projectForm.get('google_accounts') as FormArray;
        google_accounts.controls.map(
          item => {
            (item.value.g_acc_id == val) ? item.setValue({ acc_name: item.value.acc_name, g_acc_id: '' }) : '';
          }
        );

        this.toastr.error(res['data'])
      }
    })
  }

  save() {
    this.projectForm.get('contract_start_date').markAsDirty();
    this.projectForm.get('client_name').markAsDirty();
    this.projectForm.get('email').markAsDirty();
    if (this.projectForm.invalid) {
      this.toastr.error('please fill the required fields')
      return;
    }
    if (typeof this.projectForm.value.contract_start_date !== 'string')
      this.projectForm.value.contract_start_date = covertDateObjectToString(this.projectForm.value.contract_start_date)
    let submitForm = this.projectForm.value;
    submitForm.google_accounts = JSON.stringify(submitForm.google_accounts);
    // submitForm['additional_files[]'] = submitForm.additional_files;
    const form = toFormData(submitForm);
    Helpers.setLoading(true);
    if (this.id > 0) {
      this.api.updateProject(form).subscribe(res => {
        if (res['status']) {
          this.errorMessage = '';
          this.questionnaire.nativeElement.value = "";
          this.activeModal.dismiss();
          this.toastr.success('Project updated successfully')
          Helpers.setLoading(false)
          this.listener.onApiResolve();
        }
      }, err => {
        this.errorMessage = err.error.error;
        this.toastr.error(this.errorMessage)
        Helpers.setLoading(false)

      })
    }
    else {
      this.api.createProject(form).subscribe(res => {
        if (res['status']) {
          this.errorMessage = '';
          this.questionnaire.nativeElement.value = ""
          this.activeModal.dismiss();
          this.toastr.success('Project added successfully')
          Helpers.setLoading(false)
          this.listener.onApiResolve();
        }
      }, err => {
        this.errorMessage = err.error.error;
        this.toastr.error(this.errorMessage)
        Helpers.setLoading(false)

      })
    }
  }
  fileChangeEvent(event) {
    if (event && event.target && event.target.files.length) {
      let validateFileMsg = validateFile(event.target.files[0], 'file');
      if (validateFileMsg === true) {
        this.projectForm.get('questionnaire').setValue(event.target.files[0]);
      } else {
        this.projectForm.get('questionnaire').setValue('');
        this.questionnaire.nativeElement.value = ""
        this.errorMessage = validateFileMsg;
      }
    }
  }



  additionalFileChangeEvent(event) {
    if (event && event.target && event.target.files.length) {
      this.projectForm.get('additional_files').setValue(event.target.files);
    }
  }


  delteImg(id, index) {
    const modalRef = this.modalService.open(DeleteComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'windowsize'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'File';
    modalRef.componentInstance.index = index
    modalRef.componentInstance.project_id = this.project.id;
    modalRef.componentInstance.listener = this;

  }

  onApiResolve(id) {
    this.project['additional_files'].splice(id, 1)
  }

}