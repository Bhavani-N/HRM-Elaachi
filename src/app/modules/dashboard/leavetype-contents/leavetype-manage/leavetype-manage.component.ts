import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLeaveTypeForm();
  }

  initLeaveTypeForm() {
    this.leaveTypeForm = this.formBuilder.group({
      typeName: ['', [Validators.required, Validators.minLength(3)]],
      status: ['ACTIVE', Validators.required]
    });
  }

  get f() {
    return this.leaveTypeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.leaveTypeForm.invalid) {
      return;
    }
  }

}
