import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../api-services/api-service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toFormData } from '../../utils/utils';
import { AuthServiceService } from '../../auth-service/auth-service.service';
import { User } from 'app/api-services/api-types/api-types.service';
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    @ViewChild('userPhoto', { static: false}) userPhoto: any;
    currentUser: User;
    userForm: FormGroup;
    errorMessage: string = '';
    successMessage: string= '';
    loading: boolean = true;
    
    constructor(
        private authService: AuthServiceService,
        private api: ApiServiceService,
        private formBuilder: FormBuilder,
      ) { }

    ngOnInit(){
        this.api.getUserDetails(this.authService.token.user.id).subscribe(
            res => {
                this.currentUser = res.data
                this.initForm();
                this.loading = false;
            },
            error => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    initForm() {
        this.userForm = this.formBuilder.group({
          id: [this.currentUser ? this.currentUser.id : null],
          name: [
                    this.currentUser ? this.currentUser.name : '', 
                    Validators.compose([Validators.required])
                ],
          tag_line: [this.currentUser ? this.currentUser.tag_line : '', ],
          about: [this.currentUser ? this.currentUser.about : '', ],
          avatar: [''],
        });

        this.userForm.statusChanges.subscribe(status => {
          if(status == 'VALID') {
            this.errorMessage = '';
            this.successMessage = '';
          }
        });
    }
    
    submit() {
       if(!this.userForm.invalid) {
           let form = toFormData(this.userForm.value);
           this.loading = true;
           this.api.updateUserProfile(form).subscribe(res => {
                this.currentUser = res.data;
                if(this.currentUser.id == this.authService.token.user.id) {
                    this.authService.updateTokenUser(this.currentUser);
                }
                this.successMessage = 'Profile has been updated.'
                this.loading = false;
                this.initForm();
                this.userPhoto.nativeElement.value = ""
           }, err => {
               this.errorMessage = err.error.error;
               this.loading = false;
           });
       } else {
           this.successMessage = '';
           this.errorMessage = "please fill all required fields correctly";
       }
  }

  fileChangeEvent(event) {
    if(event && event.target && event.target.files.length) {
        this.userForm.get('avatar').setValue(event.target.files[0]);
    }
  }
}
