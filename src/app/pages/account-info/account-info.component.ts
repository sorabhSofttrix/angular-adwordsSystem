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

  findUserName(id) {
    const user = this.account.history.users.filter(user => user.id == id);
    return (user.length) ? user[0].name : '';
  }

  ngOnInit() {
    let fieldAcc = ['account_director', 'account_manager'];
    this.api.getAccountInfo(this.routeData.id).subscribe(res => {
      this.account = res.data;
      if (this.account) {
        this.account.history.data.map(el => {
          el.changes.map(ch => {
            if (fieldAcc.includes(ch.field)) {
              ch.newValueName = this.findUserName(ch.new_value);
              ch.oldValueName = this.findUserName(ch.old_value);
              // ch.desc = `${ch.desc} from ${ch.oldValueName ? ch.oldValueName : 'None'} to ${ch.newValueName}`;
              ch.desc = ch.desc + ' from ' + (ch.oldValueName ? ch.oldValueName : ' None') + ' to <a href="users/'+ch.new_value+'">' + ch.newValueName +'</a>';
            }
          });
          el.addByName = this.findUserName(el.add_by);

        });
      }
      this.loading = false;
    })
  }

}
