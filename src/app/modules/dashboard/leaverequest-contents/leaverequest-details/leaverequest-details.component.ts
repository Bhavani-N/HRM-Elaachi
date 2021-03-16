import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LeaveService } from '../../../../services/leave.service'
import { EmployeeLeave } from '../../../../models/employeeLeave';
import { AuthService } from 'src/app/services/auth.service';

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
  selectedLeaveRequest: any;
  selectedStaff: any;
  selectedLeave: any;
  leaveRequestId: any;
  selected_leave_msg: String;
  requestApproveForm: FormGroup;
  has_error = false;
  approve_leave_update_msg: String;
  submitted = false;
  sId: any;
  staffName: any;
  userDetails: any;
  selectFile;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private employeeLeaveService: LeaveService,
    private router: Router,  private auth: AuthService) { }

  ngOnInit() {
    this.routeId();
    this.userDetails = JSON.parse(this.auth.getUserDetails);
    this.sId=this.userDetails.staffId;
    this.staffName = this.userDetails.firstName;
  }

  routeId() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getEmployeeLeaveById(this.id);
    });
  }

  initRequestApproveForm() {
    this.requestApproveForm = this.formBuilder.group({
      leaveId: [this.selectedLeaveRequest._id],
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
    this.employeeLeaveService.updateEmployeeLeave(this.requestApproveForm.value, this.leaveRequestId).subscribe(res => {
      this.has_error = false;
      console.log(res);
      this.approve_leave_update_msg = 'Successfully Submitted';
      this.selectedLeaveRequest = res;
      this.selectedLeaveRequest = this.selectedLeaveRequest.result;
      this.requestApproveForm.reset();
      this.submitted = false;
      this.router.navigateByUrl('/dashboard')
    }, error => {
      this.has_error = true;
      this.approve_leave_update_msg = error.error.message;
    });
  }

  getEmployeeLeaveById(id: number) {
    if (id) {
      this.employeeLeaveService.getEmployeeLeaveById(id).subscribe(
        data => {
          console.log(data) 
          this.selectedLeaveRequest = data;
          this.selectedLeaveRequest = this.selectedLeaveRequest.result;
          console.log(this.selectedLeaveRequest)
          this.selectFile = this.selectedLeaveRequest.file;
          this.selectFile =  this.selectFile.map(res => {
            return res.file
          })
          console.log(this.selectFile)
          this.leaveRequestId = this.selectedLeaveRequest._id;
          // this.selectedStaff = this.selectedLeaveRequest.staffId;
          // this.selectedStaff.map(res => {
          //   console.log(res.firstName)
          //   this.selectedStaff = res
          // })
          this.selectedLeave = this.selectedLeaveRequest.leaveTypeId;
          this.selectedLeave.map(res => {
            this.selectedLeave = res
          })
          console.log(this.selectedLeave);
          this.isLeaveRequestSelected = true;
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
