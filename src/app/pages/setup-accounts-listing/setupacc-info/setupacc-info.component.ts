import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { Stages } from 'app/api-services/api-types/api-types.service';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from 'app/helpers';

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


  acc_id: any;
  setUpaccount: Stages;

  constructor(private _formBuilder: FormBuilder, private activateddRoute: ActivatedRoute,
    private api: ApiServiceService, private toastr: ToastrService) {
    this.activateddRoute.params.subscribe((param) => {
      this.acc_id = param.id
    })
    if (this.acc_id) {
      this.api.getSetUpAccountById(this.acc_id).subscribe((res) => {
        if (res['status']) {
          this.setUpaccount = res['data'][0];
          this.initForm();
        }
      })
    }
  }

  ngOnInit() {

  }

  initForm() {
    this.keywordsForm = this._formBuilder.group({
      keywords_url: [this.setUpaccount ? this.setUpaccount.keywords_url : '', Validators.required]
    });
    (this.setUpaccount.keywords) ? this.keywordsForm.get('keywords_url').disable() : '';
    
    this.adcopiesForm = this._formBuilder.group({
      adcopies_url: [this.setUpaccount ? this.setUpaccount.adcopies_url : '', Validators.required]
    });
    (this.setUpaccount.adcopies_url) ? this.adcopiesForm.get('adcopies_url').disable() : '';

    this.peerReviewForm = this._formBuilder.group({
      peer_review: [this.setUpaccount ? this.setUpaccount.peer_review : '',], //checkbox
      keywords_score: [this.setUpaccount ? this.setUpaccount.keywords_score : '',],
      adcopies_score: [this.setUpaccount ? this.setUpaccount.adcopies_score : '',],
      comment: [''],
      sub_type: ['peer_review'],
    });
    (this.setUpaccount.peer_review) ? this.peerReviewForm.disable() : '';

    this.clientKeyAdReviewForm = this._formBuilder.group({
      client_keyad_review: [this.setUpaccount ? this.setUpaccount.client_keyad_review : ''], //checkbox
      comment: [''],
      sub_type: ['client_keyad_review'],
    });
    (this.setUpaccount.client_keyad_review) ? this.clientKeyAdReviewForm.disable() : '';

    this.campaignSetupForm = this._formBuilder.group({
      campaign_setup: [this.setUpaccount ? this.setUpaccount.campaign_setup : ''], //checkbox
    });
    (this.setUpaccount.campaign_setup) ? this.campaignSetupForm.disable() : '';

    this.clientReviewForm = this._formBuilder.group({
      client_review: [this.setUpaccount ? this.setUpaccount.client_review : ''], //checkbox
    });

    (this.setUpaccount.client_review) ? this.clientReviewForm.disable() : '';

    this.conversionTrackingForm = this._formBuilder.group({
      conversion_tracking: [this.setUpaccount ? this.setUpaccount.conversion_tracking : ''], //checkbox
    });

    (this.setUpaccount.conversion_tracking) ? this.conversionTrackingForm.disable() : '';

    this.googleAnalyticsForm = this._formBuilder.group({
      google_analytics: [this.setUpaccount ? this.setUpaccount.campaign_setup : ''], //checkbox
    });
    (this.setUpaccount.google_analytics) ? this.googleAnalyticsForm.disable() : '';

    this.gtmForm = this._formBuilder.group({
      gtm: [this.setUpaccount ? this.setUpaccount.campaign_setup : ''], //checkbox
    });
    (this.setUpaccount.gtm) ? this.gtmForm.disable() : '';

  }

  save(formvVal) {
    let data: any;
    if (formvVal == 'keyword_url' && this.setUpaccount.keywords_url != this.keywordsForm.get('keywords_url').value) {
      data = this.keywordsForm.value;
    }

    if (formvVal == 'adcopies_url' && this.setUpaccount.adcopies_url != this.adcopiesForm.get('adcopies_url').value) {
      data = this.adcopiesForm.value;
    }


    if (formvVal == 'peer_review' && this.setUpaccount.peer_review != this.peerReviewForm.get('peer_review').value) {
      data = this.peerReviewForm.value;
    }
    if (formvVal == 'client_keyad_review' && this.setUpaccount.client_keyad_review != this.clientKeyAdReviewForm.get('client_keyad_review').value) {
      data = this.clientKeyAdReviewForm.value;
    }
    if (formvVal == 'campaign_setup' && this.setUpaccount.campaign_setup != this.campaignSetupForm.get('campaign_setup').value) {
      data = this.campaignSetupForm.value;
    }
    if (formvVal == 'client_review' && this.setUpaccount.client_review != this.clientReviewForm.get('client_review').value) {
      data = this.clientReviewForm.value;
    }

    if (formvVal == 'conversion_tracking' && this.setUpaccount.conversion_tracking != this.conversionTrackingForm.get('conversion_tracking').value) {
      data = this.conversionTrackingForm.value;
    }

    if (formvVal == 'google_analytics' && this.setUpaccount.google_analytics != this.googleAnalyticsForm.get('google_analytics').value) {
      data = this.googleAnalyticsForm.value;
    }

    if (formvVal == 'gtm' && this.setUpaccount.gtm != this.gtmForm.get('gtm').value) {
      data = this.gtmForm.value;
    }


    if (data) {
      data.acc_id = (this.setUpaccount.acc_id) ? this.setUpaccount.acc_id : this.setUpaccount.id;
      // data.acc_id = this.setUpaccount.id;
      console.log(data)
      this.saveForm(data);
    }
  }

  saveForm(form) {
    Helpers.setLoading(true)
    console.log(form)
    this.api.updateStages(form).subscribe((res) => {
      if (res['status']) {
        Helpers.setLoading(false)
        this.toastr.success('Saved successfully');
        this.setUpaccount = res.data;
        this.initForm()
      }
    }, (err) => {
      this.toastr.error(err.error.error);
      Helpers.setLoading(false)

    })
  }

}