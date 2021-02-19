import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { LeaveService } from '../../../../services/leave.service'
import { EmployeeLeave } from '../../../../models/employeeLeave';

@Component({
  selector: 'app-leaverequest-details',
  templateUrl: './leaverequest-details.component.html',
  styleUrls: ['./leaverequest-details.component.css']
})
export class LeaverequestDetailsComponent implements OnInit {

  private id: number;
  private sub: any;
  errorMsg: String;
  isRequestEdit = false;

  isLeaveRequestSelected = false;
  selectedLeaveRequest: EmployeeLeave
  selected_leave_msg: String;
  requestApproveForm: FormGroup;
  has_error = false;
  approve_leave_update_msg: String;
  submitted = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private employeeLeaveService: LeaveService) { }

  ngOnInit() {
    this.routeId();
  }

  routeId() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getEmployeeLeaveById(this.id);
    });
  }

  initRequestApproveForm() {
    this.requestApproveForm = this.formBuilder.group({
      leaveId: [this.selectedLeaveRequest.leaveId],
      deniedReason: [this.selectedLeaveRequest.deniedReason],
      status: [this.selectedLeaveRequest.status, Validators.required]
    });
  }

  toggleEdit() {
    this.isRequestEdit = !this.isRequestEdit;
    this.initRequestApproveForm();
  }

  get f() {
    return this.requestApproveForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.requestApproveForm.invalid) {
      return;
    }
    console.log('success ', this.requestApproveForm.value);
    this.employeeLeaveService.approveEmployeeLeave(this.requestApproveForm.value).subscribe(res => {
      this.has_error = false;
      this.approve_leave_update_msg = 'Successfully Submitted';
      this.selectedLeaveRequest = res;
      this.requestApproveForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      this.approve_leave_update_msg = error.error.message;
    });
  }

  getEmployeeLeaveById(id: number) {
    if (id) {
      this.employeeLeaveService.getEmployeeLeaveById(id).subscribe(
        data => {
          this.selectedLeaveRequest = data;
          this.isLeaveRequestSelected = true;
          console.log()
        }, error => {
          this.errorMsg = error;
          this.selected_leave_msg = 'Oops ! Can\'t load selected Leave Request';
        }
      );
    } else {
      this.isLeaveRequestSelected = false;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
