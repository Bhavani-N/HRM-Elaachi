import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editMode: boolean = false;
  public editForm: FormGroup;
  submitted: boolean = false;
  counter = 0;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
            public empService: UserService) { }

  ngOnInit() {
    this.empService.getEmployeesList();
    this.edittForm()
  }

  edittForm() {
    this.editForm = this.fb.group({
      mobile: ['', Validators.required],
      extno: [''],
      email: ['', [Validators.required, Validators.email]],
      twitter: [''],
      facebook: [''],
      linkedin: [''],
      workstation: ['']
    });
  }
  

  get f() {
    return this.editForm.controls;
  }

  onChange(event) {
    this.counter = this.counter + 1; 
  }

  onSubmit() {
    this.submitted = true;
    // if( this.editForm.invalid) {
    //   return;
    // }
    console.log(this.editForm)
    this.empService.AddEmployee(this.editForm.value);
    console.log(this.editForm.controls['mobile'].value + 'successfully added!');
    this.editForm.reset();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route})
  }

}
