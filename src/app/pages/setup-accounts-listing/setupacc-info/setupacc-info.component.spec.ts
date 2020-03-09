import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupaccInfoComponent } from './setupacc-info.component';

describe('SetupaccInfoComponent', () => {
  let component: SetupaccInfoComponent;
  let fixture: ComponentFixture<SetupaccInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupaccInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupaccInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
