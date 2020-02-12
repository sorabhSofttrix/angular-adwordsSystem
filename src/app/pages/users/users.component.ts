import { Component, OnInit } from '@angular/core';
import { User } from 'app/api-services/api-types/api-types.service';
import { AuthServiceService } from 'app/auth-service/auth-service.service';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  currentUser: User;
  errorMessage: string = '';
  successMessage: string= '';
  loading: boolean = true;
  routeData: any;
  constructor(
    private authService: AuthServiceService,
    private api: ApiServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    this.api.getUsersTeamByRoles(id).subscribe(
      res => {
          this.currentUser = res.data
          this.loading = false;
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
}
