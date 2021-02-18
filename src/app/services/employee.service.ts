import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Constant } from '../modules/dashboard/constant/constant';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  errorHandler(error: any) {
    console.log('Employee api error ', error);
    return throwError(error);
  }

  // getAllEmployees(page, size, sort): Observable<any> {
  //   return this.http.get<Employee[]>(Constant.API_ENDPOINT + 'api/v1/staffs',
  //     {
  //       params: {
  //         page: page,
  //         size: size,
  //         sort: sort
  //       }
  //     })
  //     .pipe(catchError(this.errorHandler));
  // }

  getAllEmployees(): Observable<any> {
    return this.http.get<Employee[]>(Constant.API_ENDPOINT + '/staffs')
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeById(id): Observable<Employee[]> {
    return this.http.get<Employee[]>(Constant.API_ENDPOINT + '/staffs/' + id)
      .pipe(catchError(this.errorHandler));
  }

  createEmployee(EmployeeData): Observable<Employee[]> {
    return this.http.post<any>(Constant.API_ENDPOINT + '/staffs', EmployeeData)
      .pipe(catchError(this.errorHandler));
  }

  updateEmployee(EmployeeData , id): Observable<Employee[]> {
    return this.http.put<any>(Constant.API_ENDPOINT + '/staffs/' + id , EmployeeData )
      .pipe(catchError(this.errorHandler));
  }

  // getEmployeeUnderSupervision(id): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(Constant.API_ENDPOINT + '/rest/employees/employees-under-supervision/' + id)
  //     .pipe(catchError(this.errorHandler));
  // }

  getEmployeeByFullName(inputvalue): Observable<Employee> {
    return this.http.get<Employee>(Constant.API_ENDPOINT + '/staffs',
      {
        params: {
          fullname: inputvalue
        }
      }
    )
      .pipe(catchError(this.errorHandler));
  }

  // updatePassword(oldPassword, newPassword): Observable<Employee> {
  //   const body = new FormData();
  //   body.append('oldPassword', oldPassword);
  //   body.append('newPassword', newPassword);
  //   return this.http.put<any>(Constant.API_ENDPOINT + '/rest/employees/update-password', body )
  //     .pipe(catchError(this.errorHandler));
  // }

  getCurrentEmployee(): Observable<Employee> {
    return this.http.get<Employee>(Constant.API_ENDPOINT + '/staffs')
      .pipe(catchError(this.errorHandler));
  }

}
