import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { Stages } from 'app/api-services/api-types/api-types.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setupacc-info',
  templateUrl: './setupacc-info.component.html',
  styleUrls: ['./setupacc-info.component.scss']
})
export class SetupaccInfoComponent implements OnInit {
  keywordsForm: FormGroup;
  adcopiesForm: FormGroup;
  peerReviewForm: FormGroup;
  clientKeyAdReviewForm: FormGroup;

  campaignSetupForm: FormGroup
  clientReviewForm: FormGroup
  conversionTrackingForm: FormGroup
  googleAnalyticsForm: FormGroup
  gtmForm: FormGroup


  setUpId: any;
  setUpaccount: Stages;

  constructor(private _formBuilder: FormBuilder, private activateddRoute: ActivatedRoute,
    private api: ApiServiceService, private toastr: ToastrService) {
    this.activateddRoute.params.subscribe((param) => {
      this.setUpId = param.id
    })
  }

  ngOnInit() {

    if (this.setUpId) {
      this.api.getSetUpAccountById(this.setUpId).subscribe((res) => {
        if (res['status']) {
          this.setUpaccount = res['data'][0];
        }
      })
    }

    this.keywordsForm = this._formBuilder.group({
      keywords_url: [this.setUpaccount ? this.setUpaccount.keywords_url : '', Validators.required]
    });
    this.adcopiesForm = this._formBuilder.group({
      adcopies_url: [this.setUpaccount ? this.setUpaccount.adcopies_url : '', Validators.required]
    });
    this.peerReviewForm = this._formBuilder.group({
      peer_review: [this.setUpaccount ? this.setUpaccount.peer_review : '',], //checkbox
      keywords_score: [this.setUpaccount ? this.setUpaccount.keywords_score : '',],
      adcopies_score: [this.setUpaccount ? this.setUpaccount.adcopies_score : '',],
      comment: [''],
      sub_type: ['peer_review'],
    });
    this.clientKeyAdReviewForm = this._formBuilder.group({
      client_keyad_review: [this.setUpaccount ? this.setUpaccount.client_keyad_review : ''], //checkbox
      comment: [''],
      sub_type: ['client_keyad_review'],
    });

    this.campaignSetupForm = this._formBuilder.group({
      campaign_setup: [this.setUpaccount ? this.setUpaccount.campaign_setup : ''], //checkbox
    });
    this.clientReviewForm = this._formBuilder.group({
      client_review: [this.setUpaccount ? this.setUpaccount.client_review : ''], //checkbox
    });
    this.conversionTrackingForm = this._formBuilder.group({
      conversion_tracking: [this.setUpaccount ? this.setUpaccount.conversion_tracking : ''], //checkbox
    });
    this.googleAnalyticsForm = this._formBuilder.group({
      google_analytics: [this.setUpaccount ? this.setUpaccount.campaign_setup : ''], //checkbox
    });

    this.gtmForm = this._formBuilder.group({
      gtm: [this.setUpaccount ? this.setUpaccount.campaign_setup : ''], //checkbox
    });
 

    if (this.setUpId) {
      this.api.getSetUpAccountById(this.setUpId).subscribe((res) => {
        if (res['status'])
          this.setUpaccount = res['data'][0];
      })
    }
  }

  save(formvVal) {
    if (formvVal == 'keyword_url') {
      this.saveForm(this.keywordsForm);
    }  
    //pending workI

  }

  saveForm(form) {
    this.api.updateStages(this.setUpId, form).subscribe((res) => {
      if (res['status']) {
        this.toastr.success('Saved successfully');
      }
    })
  }

}