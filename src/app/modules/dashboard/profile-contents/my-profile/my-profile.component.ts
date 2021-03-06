import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private id: number;
  private sub: any;
  private isEdit = false;
  employeeEditForm: FormGroup;
  supervisorEmployees: Observable<any>;
  employeeinput$ = new Subject<string>();
  isSelectLoading = false;

  expanded = false;
  isEmployeeSelected = false;
  selectedEmployee;
  selected_employee_msg;
  errorMsg;
  employeesUnderSupervision;

  update_employee_msg;
  has_error = false;
  submitted = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.routeId();
  }

  routeId() {

    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // console.log(typeof this.id) // (+) converts string 'id' to a number
      this.getEmployeeById(this.id);
    });
  }

  initEditForm() {
    this.employeeEditForm = this.formBuilder.group({
      // employeeId: [this.selectedEmployee.employeeId],
      firstName: [this.selectedEmployee.firstName, [Validators.required, Validators.minLength(2)]],
      // middleName: [this.selectedEmployee.middleName],
      lastName: [this.selectedEmployee.lastName, [Validators.required, Validators.minLength(2)]],
      username: [this.selectedEmployee.username, [Validators.required, Validators.minLength(2)]],
      phoneNumber: [this.selectedEmployee.phoneNumber, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      email: [this.selectedEmployee.email],
      status: [this.selectedEmployee.status, Validators.required]
    });
    this.loadEmployee();
  }

  private loadEmployee() {
    this.supervisorEmployees = concat(
      of([]), // default items
      this.employeeinput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.isSelectLoading = true),
        switchMap(term => this._employeeService.getEmployeeByFullName(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.isSelectLoading = false)
        ))
      )
    );
  }

  getEmployeeById(id: any) {
    if (id) {
      this._employeeService.getEmployeeById(id)
        .subscribe(
          data => {
            console.log(data);
            this.selectedEmployee = data;

            this.selectedEmployee = this.selectedEmployee.result;
            console.log(this.selectedEmployee._id)
            this.isEmployeeSelected = true;
            // this.employeesUnderSupervision = null;
             console.log("selectedEmployee data: ", data);
            this.expanded = false;
            this.initEditForm();
            // this.getEmployeeUnderSupervision();
          },
          error => {

            this.errorMsg = error;
            this.selected_employee_msg = 'Oops ! Can\'t load selected employee';
          });
    } else {
      this.isEmployeeSelected = false;
    }
  }

  // getEmployeeUnderSupervision() {
  //   // console.log("employee under supervision ", this.selectedEmployee.employeeId);
  //   // this._employeeService.getEmployeeUnderSupervision(this.selectedEmployee.employeeId).subscribe(res => {
  //   //   this.employeesUnderSupervision = res;
  //   // }, error => {
  //   //   this.employeesUnderSupervision = null;
  //   // });
  // }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    this.update_employee_msg = '';
  }

  get f() { return this.employeeEditForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.employeeEditForm.value)
    // stop here if form is invalid
    if (this.employeeEditForm.invalid) {
      alert('err')
      return;
    }
    // console.log("success ", this.employeeEditForm.value);
    this._employeeService.updateEmployee(this.employeeEditForm.value , this.selectedEmployee._id).subscribe(res => {
      console.log(res)
      this.has_error = false;
      this.update_employee_msg = 'Update Successful';
      this.selectedEmployee = res;
       this.selectedEmployee = this.selectedEmployee.result
      this.employeeEditForm.reset();
      this.submitted = false;
    }, error => {
      alert('not working')
      this.has_error = true;
      this.update_employee_msg = error.error.message;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
