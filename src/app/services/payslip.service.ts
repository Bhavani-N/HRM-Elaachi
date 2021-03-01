import { Injectable } from '@angular/core';
import { Constant } from '../modules/dashboard/constant/constant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payslip } from '../models/payslip';

@Injectable({
  providedIn: 'root'
})
export class PaySlipService {

  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    console.log('Payslip api error ', error);
    return throwError(error);
  }

  getAllPayslips(page): Observable<any> {
    return this.http.get<Payslip[]>(Constant.API_ENDPOINT + '/payslip?page='+page)
    .pipe(catchError(this.errorHandler));
  }

  getPayslipById(id): Observable<Payslip> {
    return this.http.get<Payslip>(Constant.API_ENDPOINT + '/payslip/' + id)
    .pipe(catchError(this.errorHandler));
  }

  createPayslip(payslipData): Observable<Payslip> {
    return this.http.post<Payslip>(Constant.API_ENDPOINT + '/payslip/', payslipData)
      .pipe(catchError(this.errorHandler));
  }

  updatePayslip(payslipData, id): Observable<Payslip> {
    return this.http.put<Payslip>(Constant.API_ENDPOINT + '/payslip/' + id, payslipData)
      .pipe(catchError(this.errorHandler));
  }

}


