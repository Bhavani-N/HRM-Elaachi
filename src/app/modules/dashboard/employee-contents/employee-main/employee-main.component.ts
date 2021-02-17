import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.css']
})
export class EmployeeMainComponent implements OnInit {

  constructor( public _authService: AuthService) { }

  ngOnInit() {
  }

}
