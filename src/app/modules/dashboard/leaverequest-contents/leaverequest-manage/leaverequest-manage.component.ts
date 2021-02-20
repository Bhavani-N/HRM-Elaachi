import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LeaveTypeService } from '../../../../services/leaveType.service';
// import {NgSelectModule, NgOption} from '@ng-select/ng-select';

import { LeaveType } from '../../../../models/leaveType';
import { LeaveService } from '../../../../services/leave.service';

@Component({
  selector: 'app-leaverequest-manage',
  templateUrl: './leaverequest-manage.component.html',
  styleUrls: ['./leaverequest-manage.component.css']
})
export class LeaverequestManageComponent implements OnInit {
  create_leave_req_msg: string;
  public has_error = false;

  leaveTypes: any;
  selectedLeaveType: LeaveType = null;
  leaveForm: FormGroup;
  minDate: Date;
  submitted = false;
  selectedCity: any;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];

  constructor(private formBuilder: FormBuilder, private empLeaveService: LeaveService, 
    private leaveTypeService: LeaveTypeService) {
      this.minDate = new Date();
  }

  ngOnInit() {
    this.leaveTypeService.getAllLeaveTypes().subscribe(res => {
      console.log(res);
      this.leaveTypes = res;
      this.leaveTypes = this.leaveTypes.result;
      console.log(this.leaveTypes);
    });
    console.log(this.leaveTypes);

    this.leaveForm = this.formBuilder.group({
      leaveType: [, Validators.required],
      leaveReason: ['', [Validators.required, Validators.minLength(3)]],
      fromDate: ['',  Validators.required],
      toDate: ['',  Validators.required],
    });
  }

  get f() {
    return this.leaveForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.leaveForm.invalid) {
      return;
    }
    const submissionData = { ...this.leaveForm.value, 'leaveTypeDTO': { 'leaveTypeId': this.leaveForm.value.leaveType } };
    this.empLeaveService.createEmployeeLeave(submissionData).subscribe(res => {
      this.has_error = false;
      this.create_leave_req_msg = 'Leave Request successfully submitted';
      this.leaveForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      this.create_leave_req_msg = error.error.message;
    });
  }

}
