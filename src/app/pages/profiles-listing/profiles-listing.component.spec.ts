import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesListingComponent } from './profiles-listing.component';

describe('ProfilesListingComponent', () => {
  let component: ProfilesListingComponent;
  let fixture: ComponentFixture<ProfilesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
