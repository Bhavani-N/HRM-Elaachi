import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leaverequest-list',
  templateUrl: './leaverequest-list.component.html',
  styleUrls: ['./leaverequest-list.component.css']
})
export class LeaverequestListComponent implements OnInit {
  leaveRequests;
  errorMsg;

  loading = true;
  currentPage = 1;
  totalElements;
  numberOfElements;
  size = 10;
  sortKey = 'fromDate';
  reverse = false;

  allEmployees: Observable<any>;
  employeeinput$ = new Subject<string>();
  isSelectLoading = false;

  constructor(private empLeaveService: LeaveService, private empService: EmployeeService) { }

  ngOnInit() {
    this.getAllEmployeeLeaves();
    // this.loadEmployee();
  }

  getPage(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.getAllEmployeeLeaves();
  }

  sort(key: string) {
    this.loading = true;
    this.sortKey = key + ','.concat(this.reverse ? 'DESC' : 'ASC');
    this.reverse = !this.reverse;
    this.getAllEmployeeLeaves();
  }

  getAllEmployeeLeaves() {
    this.empLeaveService.getAllEmployeeLeaves(this.currentPage).subscribe(
      data => {
        this.leaveRequests = data;
        this.leaveRequests = data.data;
        console.log(this.leaveRequests)
        console.log(data)
        this.totalElements = data.result;
        console.log(this.totalElements)
        // this.size = data.size;
        this.numberOfElements = data.numberOfElements;
        this.loading = false;
      },
      error => this.errorMsg = error
    );
  }

  // private loadEmployee() {
  //   this.allEmployees = concat(
  //     of([]), // default items
  //     this.employeeinput$.pipe(
  //       debounceTime(200),
  //       distinctUntilChanged(),
  //       tap(() => this.isSelectLoading = true),
  //       switchMap(term => this.empService.getEmployeeByFullName(term).pipe(
  //         catchError(() => of([])), // empty list on error
  //         tap(() => this.isSelectLoading = false)
  //       ))
  //     )
  //   );
  // }


}
