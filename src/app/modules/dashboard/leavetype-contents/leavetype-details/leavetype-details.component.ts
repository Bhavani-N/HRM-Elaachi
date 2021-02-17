import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { LeaveTypeService } from '../../../../services/leaveType.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-leavetype-details',
  templateUrl: './leavetype-details.component.html',
  styleUrls: ['./leavetype-details.component.css']
})
export class LeavetypeDetailsComponent implements OnInit {

  private id: number;
  private sub: any;

  isEdit = false;
  errorMsg;
  leaveType_update_msg;
  has_error = false;
  submitted = false;
  isLeaveTypeSelected = false;
  selectedleaveType;
  leaveTypeUpdateForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private authService: AuthService, private leaveTypeService: LeaveTypeService) { }

  ngOnInit() {
    this.routeId();
  }

  routeId() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getLeaveTypeById(this.id);
    })
  }

  initLeaveTypeUpdateForm() {
    this.leaveTypeUpdateForm = this.formBuilder.group({
      leaveTypeId: [this.selectedleaveType._id],
      name: [this.selectedleaveType.name, [Validators.required, Validators.minLength(3)]],
      status: [this.selectedleaveType.status, Validators.required]
    });
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if(this.isEdit) {
      this.initLeaveTypeUpdateForm();
    }
  }

  getLeaveTypeById(id: number) {
    if(id) {
      this.leaveTypeService.getLeaveTypeById(id).subscribe(data => {
        this.selectedleaveType = data;
        this.selectedleaveType = this.selectedleaveType.result;
        this.isLeaveTypeSelected = true;
      },
      error => this.errorMsg = error
      );
    } else {
      this.isLeaveTypeSelected = false;
    }
  }

  get f() { return this.leaveTypeUpdateForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.leaveTypeUpdateForm.value)
    if (this.leaveTypeUpdateForm.invalid) {
      return;
    }
    console.log(this.selectedleaveType._id)
    this.leaveTypeService.updateLeaveTypeById(this.selectedleaveType._id, this.leaveTypeUpdateForm.value).subscribe(res => {
      this.has_error = false;
      this.selectedleaveType = res;
      // this.selectedleaveType = this.selectedleaveType.result;
      console.log(this.selectedleaveType)
      this.leaveType_update_msg = 'Update Successful';
      this.leaveTypeUpdateForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = false;
      console.log('update error')
      this.leaveType_update_msg = error.error.message;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
