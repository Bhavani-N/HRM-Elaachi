import { Injectable } from "@angular/core";

import { Employee } from "../models/employee.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
  

    constructor() {}

    // AddEmployee(employee: Employee) {
    //     this.usersRef.push({
    //         name: employee.name,
    //         designation: employee.designation,
    //         state: employee.state,
    //         mobile: employee.mobile,
    //         extno: employee.extno,
    //         email: employee.email,
    //         twitter: employee.twitter,
    //         facebook: employee.facebook,
    //         linkedIn: employee.linkedIn,
    //         workstation: employee.workStation,
    //     })
    // }

    // getEmployee(id: string) {
    //     this.userRef = this.db.object('employees-list/' + id);
    //     return this.userRef;
    // }

    // getEmployeesList() {
    //     this.usersRef = this.db.list('employees-list');
    //     console.log(this.usersRef)
    //     return this.usersRef;
    // }

    // updateEmployee(employee: Employee) {
    //     this.userRef.update({
    //         name: employee.name,
    //         designation: employee.designation,
    //         state: employee.state,
    //         mobile: employee.mobile,
    //         extno: employee.extno,
    //         email: employee.email,
    //         twitter: employee.twitter,
    //         facebook: employee.facebook,
    //         linkedIn: employee.linkedIn,
    //         workStation: employee.workStation,
    //     })
    // }

    // deleteEmployee(id: string) {
    //     this.userRef = this.db.object('employees-list/' +id);
    //     this.userRef.remove();
    // }
}