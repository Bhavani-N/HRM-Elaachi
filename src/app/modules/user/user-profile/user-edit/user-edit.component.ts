import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editMode = false;
  editForm: FormGroup;
  submitted = false;
  counter = 0;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      'mobile': ['', Validators.required],
      'extno': [''],
      'email': ['', [Validators.required, Validators.email]],
      'twitter': [''],
      'facebook': [''],
      'linkedin': [''],
      'workstation': ['']
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
    this.editForm.reset();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route})
  }

}
