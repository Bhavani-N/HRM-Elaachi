import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { SidebarService } from '../../../../services/sidebar.service';
import {EmployeeService} from '../../../../services/employee.service';
@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {
  // isLoggedIn: boolean = this._auth.login();
  userDetails;
  staffId;
  constructor(private _sideBarService: SidebarService, public _auth: AuthService, private employeeService:EmployeeService) { }

  toggleSidebar() {
    this._sideBarService.toggle();
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this._auth.getUserDetails);
    this.staffId=this.userDetails.staffId;
    console.log(this.staffId);
  }
  openNav() {
    document.getElementById("mySidebar").style.width = "210px";
    document.getElementById("main").style.marginLeft = "200px";
  }
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // getEmployeeById(){
  //   this.employeeService.getCurrentEmployee().subscribe(data=>{
  //     this.employeeId=data;
  //     this.employeeId=this.employeeId.result._id;
  //     console.log(this.employeeId)
  //   })
  // }




}


