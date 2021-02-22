import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LeaveTypeService } from '../../../../services/leaveType.service';

import { LeaveType } from '../../../../models/leaveType';
import { LeaveService } from '../../../../services/leave.service';
import { AuthService } from '../../../../services/auth.service';

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
  leaveId: any;
  sId: any;
  staffName: any;
  userDetails: any;

  constructor(private formBuilder: FormBuilder, private empLeaveService: LeaveService,
    private leaveTypeService: LeaveTypeService, private auth: AuthService) {
      this.minDate = new Date();
  }

  ngOnInit() {
    // decrypting token details
    this.userDetails = JSON.parse(this.auth.getUserDetails);
    this.sId=this.userDetails.staffId;
    this.staffName = this.userDetails.firstName;

    // fetching leave types
    this.leaveTypeService.getAllLeaveTypes().subscribe(res => {
      this.leaveTypes = res;
      this.leaveTypes = this.leaveTypes.result;
    });
    console.log(this.leaveTypes);

    this.leaveForm = this.formBuilder.group({
      leaveTypeId: [, Validators.required],
      staffId: [this.sId, Validators.required],
      leaveReason: ['', [Validators.required, Validators.minLength(3)]],
      dateFrom: ['',  Validators.required],
      dateTo: ['',  Validators.required],
    });
  }

  get f() {
    return this.leaveForm.controls;
  }

  getData(data) {
    console.log(data);
  }

  onSubmit() {
    this.submitted = true;
    // this.leaveForm.value['staffId'] = this.sId;
    // console.log(this.leaveForm.value)
    if (this.leaveForm.invalid) {
      console.log('invalid')
      return;
    }
    this.empLeaveService.createEmployeeLeave(this.leaveForm.value).subscribe(res => {
      this.has_error = false;
      console.log(res)
      this.create_leave_req_msg = 'Leave Request successfully submitted';
      this.leaveForm.reset();
      this.submitted = false;
      console.log('notworking.........')
    }, error => {
      this.has_error = true;
      console.log('working........')
      this.create_leave_req_msg = error.error.message;
    });
  }

}
