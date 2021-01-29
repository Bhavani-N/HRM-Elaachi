import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.css']
})
export class UserContactComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  isEdit=false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      // if (this.authService.userValue) {
      //     this.router.navigate(['login']);
      // }
  }

  ngOnInit() {
      this.updateForm = this.formBuilder.group({
          mobile: ['', Validators.required],
          extno: ['', Validators.required],
          email: ['', Validators.required],
          twitter: ['', [Validators.required, Validators.minLength(6)]],
          facebook:['',Validators.required],
          linkedIn:['',Validators.required],
          workstation:['',Validators.required],
          firstName:['',Validators.required],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  onSubmit() {
      this.submitted = true;
      console.log(this.updateForm.value);
      // reset alerts on submit
      // this.alertService.clear();

      // // stop here if form is invalid
      if (this.updateForm.invalid) {
          return;
      }

      this.loading = true;
      this.authService.register(this.updateForm.value)

          .subscribe(
              data => {                 
                  console.log(data);
              },
              error => {
                  console.log(error.error.message);
                  this.loading = false;
              });
              this.isEdit=false;
  }
  onEdit(){
   this.isEdit=true;
  }
}
