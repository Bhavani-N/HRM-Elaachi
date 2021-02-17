import { Injectable } from '@angular/core';
import { Constant } from '../modules/dashboard/constant/constant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeLeave } from '../models/employeeLeave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    console.log('EmployeeLeave api error ', error);
    return throwError(error);
  }

  getAllEmployeeLeaves(): Observable<any> {
    return this.http.get<EmployeeLeave[]>(Constant.API_ENDPOINT + '/userLeave/')
    .pipe(catchError(this.errorHandler));
  }

  getEmployeeLeaveById(id): Observable<EmployeeLeave> {
    return this.http.get<EmployeeLeave>(Constant.API_ENDPOINT + '/userLeave/' + id)
    .pipe(catchError(this.errorHandler));
  }

  createEmployeeLeave(EmployeeLeaveData): Observable<EmployeeLeave> {
    return this.http.post<EmployeeLeave>(Constant.API_ENDPOINT + '/userLeave/', EmployeeLeaveData)
      .pipe(catchError(this.errorHandler));
  }

  updateEmployeeLeave(EmployeeLeaveData, id): Observable<EmployeeLeave> {
    return this.http.put<EmployeeLeave>(Constant.API_ENDPOINT + '/userLeave/' + id, EmployeeLeaveData)
      .pipe(catchError(this.errorHandler));
  }

  approveEmployeeLeave(EmployeeLeaveData): Observable<EmployeeLeave> {
    return this.http.put<EmployeeLeave>(Constant.API_ENDPOINT + '/userLeave/approve-leave', EmployeeLeaveData)
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeLeavesBetweenDate(startDate, endDate): Observable<EmployeeLeave[]> {
    return this.http.get<EmployeeLeave[]>(Constant.API_ENDPOINT + '/userLeave/byDate',
    {
      params: {
        date1: startDate,
        date2: endDate
      }
    })
      .pipe(catchError(this.errorHandler));
  }
}


