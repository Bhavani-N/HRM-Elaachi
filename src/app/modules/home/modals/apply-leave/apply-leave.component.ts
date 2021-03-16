import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveTypeService } from '../../../../services/leaveType.service';

import { LeaveType } from '../../../../models/leaveType';
import { LeaveService } from '../../../../services/leave.service';
import { AuthService } from '../../../../services/auth.service';
import { UploadFileService } from '../../../..//services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLeaveComponent implements OnInit {
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

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private formBuilder: FormBuilder, private empLeaveService: LeaveService,
    private leaveTypeService: LeaveTypeService,  private uploadService: UploadFileService, private auth: AuthService) {
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
      file: new FormArray([])
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    const customizationArray = <FormArray>this.leaveForm.controls['file'];
    customizationArray.push(this.formBuilder.group({
      file: this.currentFileUpload.name
    }));
    console.log(this.leaveForm.value);
    // console.log(this.currentFileUpload.name)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })

    this.selectedFiles = undefined;
  }

  get f() {
    return this.leaveForm.controls;
  }

  getData(data) {
    console.log(data);
  }


  onSubmit() {
    if (this.leaveForm.invalid) {
      console.log('invalid')
      return;
    }
    this.submitted = true;
    this.upload();
    this.empLeaveService.createEmployeeLeave(this.leaveForm.value).subscribe(res => {
      this.has_error = false;
      console.log(res)
      this.create_leave_req_msg = 'Leave Request successfully submitted';
      this.leaveForm.reset();
      this.submitted = false;
    }, error => { 
      this.has_error = true;
      this.create_leave_req_msg = error.error.message;
    });
  }
   
}
