import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccSpecificComponent } from './acc-specific.component';

describe('AccSpecificComponent', () => {
  let component: AccSpecificComponent;
  let fixture: ComponentFixture<AccSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
