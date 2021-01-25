import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRApprovalComponent } from './hr-approval.component';

describe('HRApprovalComponent', () => {
  let component: HRApprovalComponent;
  let fixture: ComponentFixture<HRApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
