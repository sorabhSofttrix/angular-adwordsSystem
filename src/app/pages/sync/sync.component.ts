import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { User, UserRoles, UnassignedAccounts } from '../../api-services/api-types/api-types.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PagerService } from 'app/api-services/pager.service';
import { ToastrService } from 'ngx-toastr';

declare  var $;
@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  availableRole: { key: number, value: string }[] = [{ key: 2, value: 'Admin' }, { key: 3, value: 'Account Director' }, { key: 4, value: 'Account Manager' }];
  allRole: any;
  accountAdmin: { status: boolean, items?: User[] } = { items: [], status: true };
  accountDirectors: { status: boolean, items?: User[] } = { items: [], status: true };
  accountManager: { status: boolean, items?: User[] } = { items: [], status: true };
  membersDownOptions: { loading: boolean, item?: User } = { loading: false, item: null, };

  title: String;
  allAccounts: any;
  selectedAll: any;
  unAssignedAcc: UnassignedAccounts[] = [];

  account_director: string;
  account_manager: string
  id: any;

  account_ids: any[] = [];
  // syncObj: any[] = []

  pager: any = {};
  pagedItems: any[];
  count: any;

  btnDisable: boolean = false;


  constructor(private authService: AuthServiceService, private pagerService: PagerService,
    private api: ApiServiceService, private ngxLoader: NgxUiLoaderService, private toastr: ToastrService) {

    switch (this.authService.token.user.role_id) {
      case UserRoles["Super Admin"]:
        this.allRole = this.availableRole;
        break;
      case UserRoles.Admin:
        this.allRole = this.availableRole.filter(item => (item.key > 2));
        break;
      case UserRoles["Account Director"]:
        this.allRole = this.availableRole.filter(item => (item.key > 3));
        break;
      case UserRoles["Account Manager"]:
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
      this.accountAdmin.status = this.accountDirectors.status = false;
    });
  }

  ngOnInit() {
    this.ngxLoader.startLoader('loader-01');
    this.api.getUnAssiendAccounts().subscribe((res) => {
      if (res['status']) {
        this.ngxLoader.stopLoader('loader-01');
        this.unAssignedAcc = res['data'];
        if (!this.unAssignedAcc.length) {
          this.errorMessage = 'There is no account to assign.';
          this.btnDisable = true
          return true
        }
        this.setPage(1);
      }
    })

  }

  getAdChild(value) {
    let items = this.accountAdmin.items.filter(item => item.id == value);
    this.accountDirectors.items = (items.length && items[0].children.length) ? items[0].children : [];
  }


  getDirChild(value) {
    let items = this.accountDirectors.items.filter(item => item.id == value);
    this.accountManager.items = (items.length && items[0].children.length) ? items[0].children : [];

  }


  selectAll() {
    for (var i = 0; i < this.pagedItems.length; i++) {
      this.pagedItems[i]['selected'] = this.selectedAll;
    }
  }
 
  send() {
    this.account_ids = []
    this.ngxLoader.startLoader('loader-01');
    if (!this.account_director && !this.account_manager) {
      // alert('Please select director and manager')
      this.toastr.error('Please select director and manager!');
      this.errorMessage = 'please select director and manager.';
      this.ngxLoader.stopLoader('loader-01');
      return true
    }

    for (let i = 0; i < this.pagedItems.length; i++) {
      if (this.pagedItems[i].selected == true)
        this.account_ids.push(this.pagedItems[i]['id'])
    }
    const unSyncAcc = {
      'account_director': this.account_director,
      'account_manager': this.account_manager,
      'account_ids': this.account_ids.join(',')
    }
    if (!this.account_ids.length) {
      this.errorMessage = 'Please select alteast one account to assign!';
      this.toastr.error('Please select alteast one account to assign!');
      this.ngxLoader.stopLoader('loader-01');
      return true
    }
    this.api.updateUnassigned(unSyncAcc).subscribe((res) => {
      if (res['status']) {
        this.ngxLoader.stopLoader('loader-01');
        console.log(res);
        this.successMessage = 'Selected accounts assigned successfully!!';
        this.toastr.success('Selected accounts assigned successfully!!')
        this.ngOnInit();
      }
    })
    console.log('syncObj- --->', unSyncAcc)
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.unAssignedAcc.length, page);
    // get current page of items
    this.pagedItems = this.unAssignedAcc.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (this.pager.currentPage == 1) {
      this.count = 1 + '-' + this.pager.currentPage * 50
    }
    else if (this.pagedItems.length < 50) {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.unAssignedAcc.length;
    }
    else {
      this.count = (this.pager.currentPage - 1) * 50 + 1 + '-' + this.pager.currentPage * 50

    }
  }

 
  lastChecked = null;
  checkIfAllSelected(ev?:any) {
    let checkBoxes = [].slice.call(document.querySelectorAll('.workwit'));
    if (!this.lastChecked && !ev.shiftKey) {
        this.lastChecked = ev.target;
        return;
    }
    let start = null;
    let end = null;
    if (ev.shiftKey) {
      for(let i = 0; i < checkBoxes.length; i++) {
        if(checkBoxes[i] == ev.target) { start = i; }
        if(checkBoxes[i] == this.lastChecked) { end = i; }
      }
      let ff = checkBoxes.slice( Math.min(start,end), Math.max(start,end)+ 1);
        ff.forEach(element => {
          this.pagedItems.forEach(item => {
            if(item.id == element.getAttribute('id')) {
              item.selected = this.lastChecked.checked;
            }
          });
        });
    }
    this.selectedAll = this.pagedItems.every(function (item: any) {
      return item.selected == true;
    });
  }
}