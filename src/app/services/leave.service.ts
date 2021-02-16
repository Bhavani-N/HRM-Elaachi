import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private router: Router,
    private http: HttpClient) { }
  leaveType() {
    return this.http.get(`${environment.API_HOST}/api/v1/leaveType`);
  }
  userLeave(){
    return this.http.get(`${environment.API_HOST}/api/v1/userLeave`); 
  }
  // userLeave(id=''){
  //   return this.http.get(`${environment.API_HOST}/api/v1/userLeave/${id}`); 
  // }

}


