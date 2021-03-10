import { Injectable } from '@angular/core';
import { Constant } from '../modules/dashboard/constant/constant';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
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

  uploadFile(fileData): Observable<any> {
    return this.http.post<any>(Constant.API_ENDPOINT + '/payslip/file', fileData)
      .pipe(catchError(this.errorHandler));
  }

  uploadPdf(fileType: string, file: File) {
    let formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(Constant.API_ENDPOINT +  + "/upload/addPdfFile", formData)
      .pipe(catchError(this.errorHandler));
  }

  fileUpload(file: FormData) {
    return this.http.post(Constant.API_ENDPOINT + "/upload/addPdfFile", file);
  }

  updatePayslip(payslipData, id): Observable<Payslip> {
    return this.http.put<Payslip>(Constant.API_ENDPOINT + '/payslip/' + id, payslipData)
      .pipe(catchError(this.errorHandler));
  } 

  getPayslipByStaff(data): Observable<Payslip> {
    return this.http.get<Payslip>(Constant.API_ENDPOINT + '/payslip/list?staffId=' +data)
    .pipe(catchError(this.errorHandler));
  }

  deletePayslip(payslipData, id): Observable<any> {
    return this.http.delete<Payslip>(Constant.API_ENDPOINT + '/payslip/' + id)
    .pipe(catchError(this.errorHandler));
  }

}


