import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-services/api-service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service/auth-service.service';
import { User, UserRoles, Priority, AdAccount } from '../../api-services/api-types/api-types.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']

})
export class AccountInfoComponent implements OnInit {
  routeData: any;
  account: AdAccount;
  loading: boolean = true;
  constructor(
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.routeData = params;
    });
  }

  ngOnInit() {
    this.api.getAccountInfo(this.routeData.id).subscribe(res => {
      this.account = res.data;
      this.loading = false;
      console.log(this.account);
    })
  }

}
