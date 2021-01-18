import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public empForm: FormGroup;

  constructor(public empService: UserService, 
          public fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.empService.getEmployeesList();
    this.employeeForm();
  }

  employeeForm() {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      state: ['', Validators.required],
      mobile: ['', Validators.required],
      extno: [''],
      email: ['', [Validators.required, Validators.email]],
      twitter: [''],
      facebook: [''],
      linkedIn: [''],
      workstation: ['']
    })
  }

  submitEmployee() {
    this.empService.AddEmployee(this.empForm.value);
    console.log(this.empForm.value);
    this.empForm.reset();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route})
  }

}
