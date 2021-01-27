import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


// import { Employee } from "../models/employee.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
  
    BASE_URL = environment.API_HOST;
    BASE_API_URL = environment.BASE_API_URL;
    constructor( private http: HttpClient,) {}

    updateEmployee(data) {
        const url = `${this.BASE_API_URL}/userProfile/edit/`;
        console.log(url, data)
        return this.http.post(url, data);
      }
    //   updateEmployee(employee: Employee) {
    //         this.http.update({
    //             name: employee.name,
    //             designation: employee.designation,
    //             state: employee.state,
    //             mobile: employee.mobile,
    //             extno: employee.extno,
    //             email: employee.email,
    //             twitter: employee.twitter,
    //             facebook: employee.facebook,
    //             linkedIn: employee.linkedIn,
    //             workStation: employee.workStation,
    //         })
    //     }

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

    //

    // deleteEmployee(id: string) {
    //     this.userRef = this.db.object('employees-list/' +id);
    //     this.userRef.remove();
    // }
}