import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    signupForm: FormGroup;
    loading = false;
    submitted = false;
    message:any;
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
        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.signupForm.value);
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.register(this.signupForm.value)

            .subscribe(
                data => {
                    this.alertService.success('Registration successful');
                    console.log(data);
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.message= error.error.message;
                    console.log(error.error.message);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
