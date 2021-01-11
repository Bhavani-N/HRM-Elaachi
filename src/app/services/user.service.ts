import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { Employee } from "../models/employee.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    usersRef: AngularFireList<any>;
    userRef: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) {}

    AddEmployee(employee: Employee) {
        this.usersRef.push({
            mobile: employee.email,
            extno: employee.extno,
            email: employee.email,
            twitter: employee.twitter,
            facebook: employee.facebook,
            linkedIn: employee.linkedIn,
            workstation: employee.workstation,
        })
    }

    getEmployee(id: string) {
        this.userRef = this.db.object('employees-list/' + id);
        return this.userRef;
    }

    getEmployeesList() {

        this.usersRef = this.db.list('employees-list');
        console.log(this.usersRef)
        return this.usersRef;
    }

    updateEmployee(employee: Employee) {
        this.userRef.update({
            mobile: employee.email,
            extno: employee.extno,
            email: employee.email,
            twitter: employee.twitter,
            facebook: employee.facebook,
            linkedIn: employee.linkedIn,
            workstation: employee.workstation,
        })
    }

    deleteEmployee(id: string) {
        this.userRef = this.db.object('employees-list/' +id);
        this.userRef.remove();
    }
}