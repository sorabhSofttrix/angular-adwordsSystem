import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { Project } from 'app/api-services/api-types/api-types.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  productId: any;
  project: Project;


  constructor(private activatedRoutes: ActivatedRoute, private api: ApiServiceService) {
    this.activatedRoutes.params.subscribe(params => {
      this.productId = params.id

    })
  }
  ngOnInit() {
    if (this.productId > 0) {
      this.api.getProjectById(this.productId).subscribe(res => {
        if (res['data'])
          this.project = res.data[0];
      })
    }
  }


}