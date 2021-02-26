import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveTypeService } from '../../../../services/leaveType.service';

import { LeaveType } from '../../../../models/leaveType';
import { LeaveService } from '../../../../services/leave.service';
import { AuthService } from '../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaverequest-manage',
  templateUrl: './leaverequest-manage.component.html',
  styleUrls: ['./leaverequest-manage.component.css']
})
export class LeaverequestManageComponent implements OnInit {
  create_leave_req_msg: string;
  public has_error = false;
  uploadSuccess: boolean;

  leaveTypes: any;
  selectedLeaveType: LeaveType = null;
  leaveForm: FormGroup;
  minDate: Date;
  submitted = false;
  selectedCity: any;
  leaveId: any;
  fileToUpload: File = null;
  sId: any;
  staffName: any;
  percentDone: number;
  userDetails: any;

  constructor(private formBuilder: FormBuilder, private empLeaveService: LeaveService,
    private leaveTypeService: LeaveTypeService, private auth: AuthService, private http: HttpClient) {
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
      fileChosen: ['']
    });
  }


  get f() {
    return this.leaveForm.controls;
  }

  getData(data) {
    console.log(data);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload(files: File[]) {
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]){
    console.log(files);
    let formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    console.log(formData)
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
