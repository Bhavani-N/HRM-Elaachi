import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees;
  errorMsg;
  id;

  loading = true;
  currentPage = 1;
  totalElements;
  numberOfElements;
  size = 10;
  sortKey = 'firstName';
  reverse = false;

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  createFormGroup() {
    return new FormGroup({
      fullName: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      contact: new FormControl()
    });
  }

  getPage(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.getAllEmployees();
  }
  sort(key: string) {
    this.loading = true;
    this.sortKey = key + ','.concat(this.reverse ? 'DESC' : 'ASC');
    this.reverse = !this.reverse;
    this.getAllEmployees();
  }

  getAllEmployees() {
    this._employeeService.getAllEmployees()
      .subscribe(
        data => {
          console.log(data);
          this.employees = data.result;
          console.log(this.employees);
          this.employees.map(res=>{
            console.log(res)
            this.id = res._id
            console.log(this.id)
          })
          console.log(this.employees);
          this.totalElements = data.totalElements;
      
          this.size = data.size;
          this.numberOfElements = data.numberOfElements;
          this.loading = false;
           console.log('employees data: ', data);
        },
        error => this.errorMsg = error);
  }

  searchEmployee(form) {
    this.loading = true;
    this._employeeService.getEmployeeByFullName(form.value.q).subscribe(data => {
      this.employees = data;
      this.loading = false;
    }, error => {
      this.errorMsg = error;
    });
  }
}
