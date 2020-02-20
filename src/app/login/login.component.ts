import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { ApiServiceService } from '../api-services/api-service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
    this.loginForm.statusChanges.subscribe(status => {
      if (status == 'VALID') {
        this.errorMessage = '';
      }
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    if (!this.loginForm.invalid) {
      this.errorMessage = '';
      this.ngxLoader.startLoader('loader-01');
      this.api.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        if (res.status) {
          this.ngxLoader.stopLoader('loader-01');

          this.authService.login(res.data);
          this.router.navigate(['dashboard']);
          this.initForm();
        } else {
          this.ngxLoader.stopLoader('loader-01');

          this.errorMessage = 'please use valid credentials';
        }
      },
        err => {
          if (err.error && err.error.error) {
            this.ngxLoader.stopLoader('loader-01');
            this.errorMessage = err.error.error;
          }
        });
    } else {
      this.errorMessage = '';
      for (const field in this.loginForm.controls) {
        this.loginForm.get(field).markAsDirty();
      }
      this.ngxLoader.stopLoader('loader-01');
      this.errorMessage = 'please fill all required fields correctly.';
    }
  }

}
