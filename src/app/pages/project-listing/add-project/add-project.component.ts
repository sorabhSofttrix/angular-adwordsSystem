import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project, Profile, Client } from 'app/api-services/api-types/api-types.service';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from 'app/helpers';
import { validateFile, toFormData, covertStringDateToObject, covertDateObjectToString } from 'app/utils/utils';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  project: Project;

  profile: Profile[] = []
  client: Client[] = []
  id: number

  dt: any;
  @Input() listener: OnResolveResponseListener

  btnTxt: string = 'Save'
  @ViewChild('questionnaire', { static: false }) questionnaire: any;
  errorMessage: string
  constructor(private formBuilder: FormBuilder, private api: ApiServiceService, private modalService: NgbModal,
    private toastr: ToastrService, public activeModal: NgbActiveModal) { }

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
      id: [ this.project ? this.project.id : null],
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
      email: [this.project ? this.project.email : '', Validators.compose([Validators.required, Validators.email])],


      // sortOrder: [this.reason ? this.reason.sortOrder : ''],
    });
    console.log(this.projectForm.value)
  }

  // get project_name() { return this.projectForm.get('project_name'); }
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
      // console.log(a)}
    } else {
      this.projectForm.get('client_name').setValue('');
      this.projectForm.get('email').setValue('');
      this.projectForm.get('phone').setValue('');
      this.projectForm.get('skype').setValue('');
    }
  }

  save() {
    // this.projectForm.get('project_name').markAsDirty();
    this.projectForm.get('contract_start_date').markAsDirty();
    this.projectForm.get('client_name').markAsDirty();

    // for (const field in this.projectForm.controls) {
    //   this.projectForm.get(field).markAsDirty();
    // }
    if (this.projectForm.invalid) {
      return;
    }
    this.projectForm.value.contract_start_date = covertDateObjectToString(this.projectForm.value.contract_start_date)
    console.log(this.projectForm.value)
    Helpers.setLoading(true);
    if (this.id > 0) {
      let submitForm = this.projectForm.value;
      const form = toFormData(submitForm);
      console.log(form)
      this.api.updateProject(form).subscribe(res => {
        if (res['status']) {
          this.errorMessage = '';
          // this.initForm();
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
      let submitForm = this.projectForm.value;
      const form = toFormData(submitForm);
      // console.log(form)
      this.api.createProject(form).subscribe(res => {
        if (res['status']) {
          this.errorMessage = '';
          // this.initForm();
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
}