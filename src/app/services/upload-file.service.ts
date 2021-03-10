import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../modules/dashboard/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    // const req = new HttpRequest('POST',Constant.API_ENDPOINT +  '/files/upload', formdata, {
    const req = new HttpRequest('POST','http://localhost:3000/api/v1/files/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/files/all');
  }
}
