import { Component, OnInit } from '@angular/core';
import { User } from 'app/api-services/api-types/api-types.service';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccSpecificComponent } from './acc-specific/acc-specific.component';

const TREE_DATA: User[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  private _transformer = (node: User, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  currentUser: User;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = true;
  routeData: any;


  constructor(private authService: AuthServiceService,
    private api: ApiServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private modalService: NgbModal,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.routeData = params;
      this.loadTeam();
    });
  }

  ngOnInit() {
  }

  loadTeam() {
    let id = this.routeData && this.routeData.id ? this.routeData.id : this.authService.token.user.id;
    this.api.getUsersTeam(id).subscribe(
      res => {
        this.currentUser = res.data
        this.loading = false;
        this.dataSource.data = [this.currentUser];
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  routeTo(id) {
    this.router.navigate([`users/${id}`]);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;



  getAccInfo(id) {
    const modalRef = this.modalService.open(AccSpecificComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'windowsize'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.listener = this;
  }

}
