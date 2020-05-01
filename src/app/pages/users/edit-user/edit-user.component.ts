import { Component, OnInit, ViewChild } from '@angular/core';
import { validateFile, toFormData } from 'app/utils/utils';
import { UserRoles, User } from 'app/api-services/api-types/api-types.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Helpers } from 'app/helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild('userPhoto', { static: false }) userPhoto: any;
  userForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  allRole: { key: number, value: string }[] = [{ key: 1, value: 'Super Admin' }, { key: 2, value: 'Admin' }, { key: 3, value: 'Account Director' }, { key: 4, value: 'Account Manager' }];
  // allRole: any;
  accountAdmin: { status: boolean, items?: User[] } = { status: false };
  accountDirectors: { status: boolean, items?: User[] } = { status: false };
  membersDownOptions: { loading: boolean, item?: User } = { loading: true };
  routeData: any;
  currentUser: User;
  constructor(
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private formBuilder: FormBuilder, private ruter: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.params.subscribe(params => {
      this.routeData = params;
      let id = this.routeData && this.routeData.id ? this.routeData.id : this.authService.token.user.id;
      this.api.getUsersTeam(id).subscribe(res => {
        this.currentUser = res.data
        this.initForm();

        this.loading = false;
      },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    });
    this.userForm.get('role').disable();
    this.userForm.get('email').disable();

  }

  initForm() {
    this.userForm = this.formBuilder.group({
      id: [this.currentUser ? this.currentUser.id : ''],
      add_by: [this.authService.token.user.id],
      parent_id: [this.currentUser ? this.currentUser.parent_id : '', Validators.compose([Validators.required])],
      role: [this.currentUser ? UserRoles[this.currentUser.role] : '', Validators.compose([Validators.required])],
      email: [this.currentUser ? this.currentUser.email : '', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6)])],
      name: [this.currentUser ? this.currentUser.name : '', Validators.compose([Validators.required])],
      tag_line: [this.currentUser ? this.currentUser.tag_line : ''],
      about: [this.currentUser ? this.currentUser.about : ''],
      avatar: [''],
      /* extra items these will be removed on submit*/
      selected_admin: [''],
      selected_director: [''],
    });

    this.userForm.get('role').valueChanges.subscribe(value => {
      switch (parseInt(value)) {
        case UserRoles.Admin:
          this.accountAdmin.status = this.accountDirectors.status = false;
          break;
        case UserRoles["Account Director"]:
          this.accountAdmin.status = true;
          this.accountDirectors.status = false;
          break;
        case UserRoles["Account Manager"]:
          this.accountAdmin.status = this.accountDirectors.status = true;
          break;
        default:
          this.accountAdmin.status = this.accountDirectors.status = false;
          break;
      }
      this.userForm.get('selected_admin').setValue('');
      this.userForm.get('selected_director').setValue('');
      this.accountDirectors.items = [];
    });


    this.userForm.statusChanges.subscribe(status => {
      this.successMessage = '';
      if (status == 'VALID') {
        this.errorMessage = '';
      }
    });
    this.userForm.controls['role'].disable();
    this.userForm.controls['email'].disable();
  }

  get email() { return this.userForm.get('email'); }
  get name() { return this.userForm.get('name'); }
  get password() { return this.userForm.get('password'); }
  get parentId() { return this.userForm.get('parent_id'); }
  get userRole() { return this.userForm.get('role'); }
  get selectedDirector() { return this.userForm.get('selected_director'); }
  get selectedAdmin() { return this.userForm.get('selected_admin'); }

  submit() {
    if (!this.userForm.invalid) {
      let submitForm = this.userForm.value;
      delete submitForm.selected_admin;
      delete submitForm.selected_director;
      const form = toFormData(submitForm);
      this.loading = true;
      Helpers.setLoading(true);
      this.api.updateUserProfile(form).subscribe(res => {
        this.errorMessage = '';
        this.successMessage = 'User has been updated.'
        this.toastr.success('User updated successfully')

        this.loading = false;
        this.currentUser.avatar = res.data.avatar;
        this.initForm();
        this.userPhoto.nativeElement.value = ""
        Helpers.setLoading(false);

      }, err => {
        this.errorMessage = err.error.error;
        this.loading = false;
        Helpers.setLoading(false);

      });

    }

    else {
      this.successMessage = '';
      for (const field in this.userForm.controls) {
        this.userForm.get(field).markAsDirty();
      }
      this.errorMessage = "please fill all required fields correctly";
    }
  }

  fileChangeEvent(event) {
    if (event && event.target && event.target.files.length) {
      let validateFileMsg = validateFile(event.target.files[0], 'image');
      if (validateFileMsg === true) {
        this.userForm.get('avatar').setValue(event.target.files[0]);
      } else {
        this.userForm.get('avatar').setValue('');
        this.userPhoto.nativeElement.value = ""
        this.errorMessage = validateFileMsg;
      }
    }
  }

}
