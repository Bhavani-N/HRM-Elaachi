import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPayslipComponent } from './upload-payslip.component';

describe('UploadPayslipComponent', () => {
  let component: UploadPayslipComponent;
  let fixture: ComponentFixture<UploadPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
