import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Constant } from '../modules/dashboard/constant/constant';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) { }

    errorHandler(error: HttpErrorResponse) {
        console.log('LeaveType api error ', error);
        return throwError(error);
    }

    getLeaveReport(): Observable<any> {
        return this.http.get<any>(Constant.API_ENDPOINT + '/leaveReport')
        .pipe(catchError(this.errorHandler));
    }
}