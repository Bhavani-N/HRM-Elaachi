import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { LeaveType } from "../models/leaveType";
import { Constant } from "../modules/dashboard/constant/constant";

@Injectable({
    providedIn: 'root'
})

export class LeaveTypeService {
    constructor(private http: HttpClient) {}

    errorHandler(error: HttpErrorResponse) {
        console.log('LeaveType api error ', error);
        return throwError(error);
    }

    getAllLeaveTypes(): Observable<LeaveType[]> {
        return this.http.get<any>(Constant.API_ENDPOINT + 'api/v1/leaveType')
            .pipe(catchError(this.errorHandler));
    }

    getLeaveTypeById(id): Observable<LeaveType[]> {
        return this.http.get<LeaveType[]>(Constant.API_ENDPOINT + 'api/v1/leaveType' + id)
            .pipe(catchError(this.errorHandler));
    }

    createLeaveType(LeaveTypeData): Observable<LeaveType[]> {
        console.log(LeaveTypeData)
        return this.http.post<any>(Constant.API_ENDPOINT + 'api/v1/leaveType', LeaveTypeData)
            .pipe(catchError(this.errorHandler));
    }

    updateLeaveType(LeaveTypeData): Observable<LeaveType[]> {
        return this.http.put<any>(Constant.API_ENDPOINT + 'api/v1/leaveType', LeaveTypeData)
            .pipe(catchError(this.errorHandler));
    }

    updateLeaveTypeById(id): Observable<LeaveType[]> {
        return this.http.get<LeaveType[]>(Constant.API_ENDPOINT + 'api/v1/leaveType' + id)
            .pipe(catchError(this.errorHandler));
    }

    deleteLeaveType(id): Observable<LeaveType[]> {
        return this.http.delete<any>(Constant.API_ENDPOINT + 'api/v1/leaveType' + id)
          .pipe(catchError(this.errorHandler));
    }

}
