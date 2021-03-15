import { Employee } from './employee';
import { LeaveType } from './leaveType';

export class EmployeeLeave {
    _id: String;
    staffId: Employee;
    leaveTypeId: LeaveType;
    leaveReason: string;
    dateFrom: Date;
    dateTo: Date;
    deniedReason: string;
    status: string;
    createdAt: Date;
    fileChosen: string;
    reviewedBy: Employee;

    constructor(_id) {
        this. _id =  _id;
    }
}
