import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  error: string;
  UserService: any;
  bsModalServ: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  resetPassword() {
    if (!this.email) {
      return this.error = 'Please Enter Valid email';
    } else {
      this.error = null;
    }
    console.log('Email is', this.email);
    this.authService.forgotPassword(this.email).subscribe(res => {
      this.email = null;
      alert('Please check your mail for the reset link');
      console.log(res);
    });
  }

}
