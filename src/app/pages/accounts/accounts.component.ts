import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { AdAccount } from 'app/api-services/api-types/api-types.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'app/auth-service/auth-service.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styles: []
})
export class AccountsComponent implements OnInit {
  loading: boolean = true;
  allAccounts: AdAccount[];
  constructor(
    private api: ApiServiceService,
    public authService: AuthServiceService,
    private router: Router,
  ) {
    this.api.getAccounts().subscribe(
      res => {
        this.allAccounts = res.data;
      }
    );
  }

  addCount(id?: number) {
    const param = id ? `/${id}` : '';
    this.router.navigate([`ad-account${param}`]);
  }

  infoAccount(id: number) {
    this.router.navigate([`account-info/${id}`]);
  }

  ngOnInit() {
  }

  initForm() {

  }

}
