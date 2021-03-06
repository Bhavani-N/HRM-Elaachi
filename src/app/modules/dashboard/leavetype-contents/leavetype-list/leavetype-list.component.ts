import { Component, OnInit } from '@angular/core';
import { LeaveTypeService } from 'src/app/services/leaveType.service';

@Component({
  selector: 'app-leavetype-list',
  templateUrl: './leavetype-list.component.html',
  styleUrls: ['./leavetype-list.component.css']
})
export class LeavetypeListComponent implements OnInit {
  leaveTypes;
  errorMsg;
  loading = true;

  constructor(private leaveTypeService: LeaveTypeService) { }

  ngOnInit() {
    this.getAllLeaveTypes();
  }

  getAllLeaveTypes() {
    this.leaveTypeService.getAllLeaveTypes().subscribe(
      data => {
        this.leaveTypes = data;
        this.leaveTypes = this.leaveTypes.result;
        this.loading = false;
        console.log("leaveTypes data: ",this.leaveTypes);
      },
      error => this.errorMsg = error
    )
  }

  delete(id: string) {
    const leave = this.leaveTypes.find(x => x._id === id);
    if (!leave) return;
    this.leaveTypeService.deleteLeaveType(id)
      .subscribe(() => this.leaveTypes = this.leaveTypes.filter(x => x._id !== id));
  }

}
