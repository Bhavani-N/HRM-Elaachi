import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  get formData() {
    return this.newPasswordForm;
  }
  token: string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['otp'];
      console.log('token', this.token);
    });
    this.newPasswordForm = this.fb.group({
      password: [undefined, Validators.required],
       confPassword: [undefined, Validators.required]
    }, { validators: this.newPasswordForm });

  }
  matchPassword(f: FormGroup) {
    return f.get('password').value === f.get('confPassword').value ? null : { mismatch: true };
  }
  onSubmit() {
    if (this.token) {
      this.authService.resetPassword(this.token, this.newPasswordForm.value.password).subscribe(res => {
        alert('Password Updated Successfully..');
        this.router.navigate(['login']);
      });
    }
    else{
      alert('error');
    }
  }


}
