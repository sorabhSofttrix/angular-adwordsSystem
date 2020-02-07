import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../api-services/api-service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toFormData } from '../../utils/utils';
import { AuthServiceService } from '../../auth-service/auth-service.service';
import { User, UserRoles } from '../../api-services/api-types/api-types.service';

@Component({
  selector: 'app-register-user',
  moduleId: module.id,
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('userPhoto', { static: false}) userPhoto: any;
  userForm: FormGroup;
  errorMessage: string = '';
  successMessage: string= '';
  loading: boolean = false;
  allRole:  { key: number, value: string}[] = [ { key: 2, value: 'Admin'},{ key: 3, value: 'Account Director'}, { key: 4, value: 'Account Manager'} ];
  constructor(
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
  ) { 
    this.initForm();
  }

  ngOnInit(){
    
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      role: [ '', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      name: [ '', Validators.compose([Validators.required])],
      tag_line: [''],
      about: [''],
      avatar: [''],
    });

    this.userForm.statusChanges.subscribe(status => {
      if(status == 'VALID') {
        this.errorMessage = '';
        this.successMessage = '';
      }
    });
  }

  get email() { return this.userForm.get('email'); }
  get name() { return this.userForm.get('name'); }
  get password() { return this.userForm.get('password'); }
  get userRole() { return this.userForm.get('role'); }

  submit() {
    if(!this.userForm.invalid) {
        let form = toFormData(this.userForm.value);
        this.loading = true;
        this.api.registerUser(form).subscribe(res => {
            this.successMessage = 'User has been added.'
            this.loading = false;
            this.initForm();
            this.userPhoto.nativeElement.value = ""
        }, err => {
            this.errorMessage = err.error.error;
            this.loading = false;
        });
    } else {
        this.successMessage = '';
        for (const field in this.userForm.controls) {
          this.userForm.get(field).markAsDirty();
        }
        this.errorMessage = "please fill all required fields correctly";
    }
  }

  fileChangeEvent(event) {
    if(event && event.target && event.target.files.length) {
        this.userForm.get('avatar').setValue(event.target.files[0]);
    }
  }

}
