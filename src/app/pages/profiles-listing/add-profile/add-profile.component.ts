import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProfilesListingComponent } from '../profiles-listing.component';
import { Profile } from 'app/api-services/api-types/api-types.service';
import { Helpers } from 'app/helpers';
import { OnResolveResponseListener } from 'app/api-services/api-service/on-resolve-resolve.listner';
import { StickyDirection } from '@angular/cdk/table';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: Profile;

  id: number
  @Input() listener: OnResolveResponseListener
  btnTxt: string = 'Save'
  constructor(private formBuilder: FormBuilder, private api: ApiServiceService, private modalService: NgbModal,
    private toastr: ToastrService, public activeModal: NgbActiveModal, private toast: ToastrService) { }

  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.api.getProfileById(this.id).subscribe((res) => {
        if (res['status']) {
          this.profile = res['data'][0]
          this.btnTxt = 'Update';
          this.initForm();

        }
      })
    }
  }


  initForm() {
    this.profileForm = this.formBuilder.group({
      profile_name: [this.profile ? this.profile.profile_name : '', Validators.compose([Validators.required])],
      username: [this.profile ? this.profile.username : ''],
      // sortOrder: [this.reason ? this.reason.sortOrder : ''],
    });
  }

  get profile_name() { return this.profileForm.get('profile_name'); }


  save() {
    this.profileForm.get('profile_name').markAsDirty();
    if (this.profileForm.invalid) {
      return;
    }

    Helpers.setLoading(true);
    if (this.id > 0) {
      this.api.updateProfile(this.id, this.profileForm.value).subscribe((res) => {
        if (res['status']) {
          Helpers.setLoading(false)
          this.activeModal.dismiss();
          this.toast.success('Profile Updated successfully')
          this.listener.onApiResolve();
        }
      })
    }
    else {
      this.api.createProfile(this.profileForm.value).subscribe((res) => {
        if (res['status']) {
          Helpers.setLoading(false)
          this.activeModal.dismiss();
          this.toast.success('Profile added successfully')
          this.listener.onApiResolve();
        }
      })
    }
  }

}
