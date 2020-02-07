import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../api-services/api-service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toFormData, validateFile } from '../../utils/utils';
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
  availableRole:  { key: number, value: string}[] = [ { key: 2, value: 'Admin'},{ key: 3, value: 'Account Director'}, { key: 4, value: 'Account Manager'} ];
  allRole: any;
  accountAdmin: { status: boolean, items?: User[]} = { status : false};
  accountDirectors: { status: boolean, items?: User[]} = { status : false};
  membersDownOptions: { loading: boolean, item?: User} = { loading: true};
  constructor(
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
  ) { 
    switch(this.authService.token.user.role_id ) {
      case UserRoles["Super Admin"] :
        this.allRole = this.availableRole;
        break;
      case UserRoles.Admin :
        this.allRole = this.availableRole.filter(item => (item.key > 2));
        break;
      case UserRoles["Account Director"] :
        this.allRole = this.availableRole.filter(item => (item.key > 3));
        break;
      case UserRoles["Account Manager"] :
        this.allRole = this.availableRole.filter(item => (item.key > 4));
        break;
    }
    this.loadTeamMembers();
  }

  loadTeamMembers() {
    this.api.getUsersTeam(this.authService.token.user.id).subscribe(res => {
      this.membersDownOptions.item = res.data;
      switch (this.authService.token.user.role_id) {
        case UserRoles["Super Admin"]:
          this.accountAdmin.items = this.membersDownOptions.item.children;
          break;
        case UserRoles.Admin:
          this.accountAdmin.items = [this.membersDownOptions.item];
          break;
        case UserRoles["Account Director"]:
          this.accountAdmin.items = [this.membersDownOptions.item.parent];
          break;
      }
      this.membersDownOptions.loading = false;
      this.userForm.get('role').enable();
      this.accountAdmin.status = this.accountDirectors.status = false;
    });
  }

  ngOnInit(){
    this.initForm();
    this.userForm.get('role').disable();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      add_by: [this.authService.token.user.id],
      parent_id: ['', Validators.compose([Validators.required])],
      role: [ '', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      name: [ '', Validators.compose([Validators.required])],
      tag_line: [''],
      about: [''],
      avatar: [''],
      /* extra items these will be removed on submit*/ 
      selected_admin: [''],
      selected_director: [''],
    });

    this.userForm.get('role').valueChanges.subscribe(value =>  {
      switch (parseInt(value)) {
        case  UserRoles.Admin :
          this.accountAdmin.status = this.accountDirectors.status = false;
          break;
        case  UserRoles["Account Director"] :
          this.accountAdmin.status = true;
          this.accountDirectors.status = false;
          break;
        case  UserRoles["Account Manager"] :
          this.accountAdmin.status = this.accountDirectors.status = true;
          break;
        default :
          this.accountAdmin.status = this.accountDirectors.status = false;
          break;
      }
      this.userForm.get('selected_admin').setValue('');
      this.userForm.get('selected_director').setValue('');
      this.accountDirectors.items = [];
      if(parseInt(value) == UserRoles.Admin && this.authService.token.user.role_id == UserRoles["Super Admin"]) {
        this.userForm.get('parent_id').setValue(this.authService.token.user.id);
      } else {
        this.userForm.get('parent_id').setValue('');
      }
    });

    this.userForm.get('selected_admin').valueChanges.subscribe(value => {
      if(value && this.accountAdmin.items.length) {
        if(this.userForm.get('role').value == UserRoles["Account Director"]) {
          this.userForm.get('parent_id').setValue(value);
        } else {
          this.userForm.get('parent_id').setValue('');
          if(this.userForm.get('role').value == UserRoles["Account Manager"] && this.authService.token.user.role_id == UserRoles["Account Director"]) {
            this.accountDirectors.items = [this.authService.token.user];
          } else {
            let items = this.accountAdmin.items.filter(item => item.id == value);
            this.accountDirectors.items = (items.length && items[0].children.length) ? items[0].children : [];
          }
        }
      } else {
        this.userForm.get('parent_id').setValue('');
        this.accountDirectors.items = [];
      }
      if(!value) {
        this.userForm.get('selected_director').setValue('');
      }
    });

    this.userForm.get('selected_director').valueChanges.subscribe(value => {
      if(value ) {
        this.userForm.get('parent_id').setValue(value);
      } else {
        this.userForm.get('parent_id').setValue('');
      }
    });

    this.userForm.statusChanges.subscribe(status => {
      this.successMessage = '';
      if(status == 'VALID') {
        this.errorMessage = '';
      }
    });
  }

  get email() { return this.userForm.get('email'); }
  get name() { return this.userForm.get('name'); }
  get password() { return this.userForm.get('password'); }
  get parentId() { return this.userForm.get('parent_id'); }
  get userRole() { return this.userForm.get('role'); }
  get selectedDirector() { return this.userForm.get('selected_director'); }
  get selectedAdmin() { return this.userForm.get('selected_admin'); }

  submit() {
    if(!this.userForm.invalid) {
        let submitForm = this.userForm.value;
        delete submitForm.selected_admin;
        delete submitForm.selected_director;
        const form = toFormData(submitForm);
        this.loading = true;
        this.api.registerUser(form).subscribe(res => {
            this.errorMessage = '';
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
        let validateFileMsg = validateFile(event.target.files[0], 'image');
        if(validateFileMsg === true) {
            this.userForm.get('avatar').setValue(event.target.files[0]);
        } else {
            this.userForm.get('avatar').setValue('');
            this.userPhoto.nativeElement.value = ""
            this.errorMessage = validateFileMsg;
        }
    }
  }

}
