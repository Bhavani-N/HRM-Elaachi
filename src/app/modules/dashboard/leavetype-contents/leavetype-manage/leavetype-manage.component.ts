import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveTypeService } from 'src/app/services/leaveType.service';

@Component({
  selector: 'app-leavetype-manage',
  templateUrl: './leavetype-manage.component.html',
  styleUrls: ['./leavetype-manage.component.css']
})
export class LeavetypeManageComponent implements OnInit {
  leaveType_req_msg: string;
  public has_error = false;

  leaveTypeForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private leaveTypeService: LeaveTypeService) { }

  ngOnInit() {
    this.initLeaveTypeForm();
  }

  initLeaveTypeForm() {
    this.leaveTypeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['ACTIVE', Validators.required]
    });
  }

  get f() {
    return this.leaveTypeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.leaveTypeForm.invalid) {
      console.log('invalid')
      return;
    }
    console.log('valid')
    this.leaveTypeService.createLeaveType(this.leaveTypeForm.value).subscribe(res => {
      alert('success')
      this.has_error = false;
      console.log(this.leaveTypeForm.value)
      this.leaveType_req_msg = 'Leave Type Successfully Created';
      this.leaveTypeForm.reset();
      this.submitted = false;
    }, error => {
      alert('not success')
      console.log('failed')
      this.has_error = true;
      this.leaveType_req_msg = error.message();
    });
  }

}
