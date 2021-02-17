import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { SidebarService } from '../../../../services/sidebar.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {
  // isLoggedIn: boolean = this._auth.login();

  constructor(private _sideBarService: SidebarService, public _auth: AuthService) { }

  toggleSidebar() {
    this._sideBarService.toggle();
  }

  ngOnInit() {
    
  }
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}


