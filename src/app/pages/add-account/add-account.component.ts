import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-services/api-service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service/auth-service.service';
import { User, UserRoles, Priority, AdAccount, AccountStatus } from '../../api-services/api-types/api-types.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-account',
  moduleId: module.id,
  templateUrl: './add-account.component.html',
})
export class AddAccountComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  accountForm: FormGroup;
  cronTimes = [6, 12, 24];
  accPriority = [Priority.low, Priority.normal, Priority.high, Priority.urgent];
  accStatus = [AccountStatus.active, AccountStatus.closed, AccountStatus.paused, AccountStatus.requiredSetup];
  accountDirectors: { status: boolean, items?: User[] } = { status: false };
  accountManagers: { status: boolean, items?: User[] } = { status: false };
  membersDownOptions: { loading: boolean, item?: User } = { loading: true };
  currentAccount: AdAccount;
  routeData: any;
  constructor(
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.routeData = params;
    });
  }

  ngOnInit() {
    if (this.routeData && this.routeData.id) {
      this.api.getAccounts(this.routeData.id).subscribe(res => {
        this.currentAccount = res.data;
        this.initForm();
      });
    } else {
      this.currentAccount = this.getNewAcc();
      this.initForm();
    }
    this.loadTeamMembers();
  }

  getNewAcc() {
    const adAcc: AdAccount = {
      id: null,
      g_acc_id: '',
      acc_name: '',
      impressions: '',
      cpa: '',
      conversion_rate: '',
      account_director: null,
      account_manager: null,
      cron_time: null,
      acc_priority: Priority.normal,
      acc_status: AccountStatus.requiredSetup
    };
    return adAcc;
  }

  loadTeamMembers() {
    this.api.getUsersTeam(this.authService.token.user.id).subscribe(res => {
      this.membersDownOptions.item = res.data;
      switch (this.authService.token.user.role_id) {
        case UserRoles.Admin:
          this.accountDirectors.items = this.membersDownOptions.item.children;
          if (this.currentAccount && this.currentAccount.account_director) {
            let items = this.accountDirectors.items.filter(item => item.id == this.currentAccount.account_director);
            this.accountManagers.items = (items.length && items[0].children.length) ? items[0].children : [];
          }
          break;
        case UserRoles["Account Director"]:
          this.accountDirectors.items = [this.membersDownOptions.item];
          if (this.currentAccount && this.currentAccount.account_director) {
            let items = this.accountDirectors.items.filter(item => item.id == this.currentAccount.account_director);
            this.accountManagers.items = (items.length && items[0].children.length) ? items[0].children : [];
          }
          break;
        case UserRoles["Account Manager"]:
          this.accountDirectors.items = [this.membersDownOptions.item.parent];
          if (this.currentAccount && this.currentAccount.account_director) {
            this.accountManagers.items = [this.authService.token.user];
          }
          break;
      }
      this.membersDownOptions.loading = false;
      this.accountDirectors.status = this.accountManagers.status = false;
    });
  }

  initForm() {
    this.accountForm = this.formBuilder.group({
      id: [this.currentAccount.id ? this.currentAccount.id : ''],
      g_acc_id: [
        this.currentAccount.g_acc_id ? this.currentAccount.g_acc_id : '',
        Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      acc_name: [
        this.currentAccount.acc_name ? this.currentAccount.acc_name : '',
        Validators.compose([Validators.required])],
      cpa: [
        this.currentAccount.cpa ? this.currentAccount.cpa : '',
        Validators.compose([Validators.required])],
      impressions: [
        this.currentAccount.impressions ? this.currentAccount.impressions : '',
        Validators.compose([Validators.required])],
      click: [
        this.currentAccount.click ? this.currentAccount.click : '',
        Validators.compose([Validators.required])],
      conversion: [
        this.currentAccount.conversion ? this.currentAccount.conversion : '',
        Validators.compose([Validators.required])
      ],
      cpc: [
        this.currentAccount.cpc ? this.currentAccount.cpc : '',
        Validators.compose([Validators.required])
      ],
      cost: [
        this.currentAccount.cost ? this.currentAccount.cost : '',
        Validators.compose([Validators.required])
      ],
      totalConversion: [
        this.currentAccount.totalConversion ? this.currentAccount.totalConversion : '',
        Validators.compose([Validators.required])
      ],
      account_director: [
        this.currentAccount.account_director ? this.currentAccount.account_director : '',
        Validators.compose([Validators.required])],
      account_manager: [
        this.currentAccount.account_manager ? this.currentAccount.account_manager : '',
        Validators.compose([Validators.required])],
      cron_time: [
        this.currentAccount.cron_time ? this.currentAccount.cron_time : '24',
        Validators.compose([Validators.required])],
      acc_priority: [
        this.currentAccount.acc_priority ? this.currentAccount.acc_priority : 'normal',
        Validators.compose([Validators.required])],
      acc_status: [
        this.currentAccount.acc_status ? this.currentAccount.acc_status : 'requiredSetup',
        Validators.compose([Validators.required])]
    });

    this.accountForm.get('account_director').valueChanges.subscribe(value => {
      if (value) {
        if (this.authService.token.user.role_id == UserRoles["Account Manager"]) {
          this.accountManagers.items = [this.authService.token.user];
        } else {
          let items = this.accountDirectors.items.filter(item => item.id == value);
          this.accountManagers.items = (items.length && items[0].children.length) ? items[0].children : [];
        }
      }
      if (!value) {
        this.accountForm.get('account_manager').setValue('');
        this.accountManagers.items = [];
      }
    });
  }

  get acc_name() { return this.accountForm.get('acc_name'); }
  get g_acc_id() { return this.accountForm.get('g_acc_id'); }
  get cpa() { return this.accountForm.get('cpa'); }
  get impressions() { return this.accountForm.get('impressions'); }
  get click() { return this.accountForm.get('click'); }
  get account_director() { return this.accountForm.get('account_director'); }
  get account_manager() { return this.accountForm.get('account_manager'); }

  submit() {
    if (!this.accountForm.invalid) {
      this.loading = true;
      if (!this.currentAccount.id) {
        this.api.addAccounts(this.accountForm.value).subscribe(res => {
          this.errorMessage = '';
          this.successMessage = 'Account has been added.'
          this.loading = false;
          this.currentAccount = res.data;
          this.initForm();
        }, err => {
          this.errorMessage = err.error.error;
          this.loading = false;
        });
      } else {
        this.api.updateAccounts(this.accountForm.value).subscribe(res => {
          this.errorMessage = '';
          this.successMessage = 'Account has been added.'
          this.loading = false;
          this.currentAccount = res.data;
          this.initForm();
        }, err => {
          this.errorMessage = err.error.error;
          this.loading = false;
        });
      }
    } else {
      this.successMessage = '';
      for (const field in this.accountForm.controls) {
        this.accountForm.get(field).markAsDirty();
      }
      this.errorMessage = "please fill all required fields correctly";
    }
  }
}
