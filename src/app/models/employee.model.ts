export class Employee {

    id: string;
    fullName: string;
    username: string;
    password: string;
    role: string;
    status: number;
    employeeSupervisor: Employee;

    constructor(id) {
       this.id = id;
    }
}
