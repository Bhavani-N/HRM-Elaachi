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
  public editForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
            public empService: UserService) { }

  ngOnInit() {
    this.updateData();
    const id = this.route.snapshot.paramMap.get('id');
    this.empService.getEmployee(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data);
    })
  }

  updateData() {
    this.editForm = this.fb.group({
      mobile: ['', Validators.required],
      extno: [''],
      email: ['', [Validators.required, Validators.email]],
      twitter: [''],
      facebook: [''],
      linkedIn: [''],
      workstation: ['']
    });
  }


  get f() {
    return this.editForm.controls;
  }

  updateForm() {
    console.log(this.editForm);
    this.empService.updateEmployee(this.editForm.value);
    this.router.navigate(['../'], { relativeTo: this.route})
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route})
  }

}
