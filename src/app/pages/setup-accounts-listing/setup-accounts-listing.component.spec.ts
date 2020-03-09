import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAccountsListingComponent } from './setup-accounts-listing.component';

describe('SetupAccountsListingComponent', () => {
  let component: SetupAccountsListingComponent;
  let fixture: ComponentFixture<SetupAccountsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupAccountsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupAccountsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
