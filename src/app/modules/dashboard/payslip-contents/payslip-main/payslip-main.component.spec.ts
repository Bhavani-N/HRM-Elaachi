import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipMainComponent } from './payslip-main.component';

describe('PayslipMainComponent', () => {
  let component: PayslipMainComponent;
  let fixture: ComponentFixture<PayslipMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
