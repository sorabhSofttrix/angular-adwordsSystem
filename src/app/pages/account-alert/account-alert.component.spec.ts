import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAlertComponent } from './account-alert.component';

describe('AccountAlertComponent', () => {
  let component: AccountAlertComponent;
  let fixture: ComponentFixture<AccountAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
