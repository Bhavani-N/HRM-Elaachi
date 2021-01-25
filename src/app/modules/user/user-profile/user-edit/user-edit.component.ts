import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  {RxFormBuilder,FormGroupExtension } from "@rxweb/reactive-form-validators"

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  editForm:FormGroup;
 ;
  constructor(private formBuilder:RxFormBuilder , private route: ActivatedRoute, private router: Router,
               public empService: UserService){}
  
  ngOnInit(){

this.editForm = this.formBuilder.group({
      mobile: ['', [
        Validators.required,
        Validators.pattern(
          /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        )
      ]],
      extno:['',Validators.required],
      email:['', [
        Validators.required,
        Validators.email,
      ]],
      twitter: ['', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
        )
      ]],
      facebook: ['', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
        )
      ]],
      linkedIn: ['', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
        )
      ]],
      workStation: ['' , [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
        )
      ]]
    });
this.onSubmit();
const id = this.route.snapshot.paramMap.get('id');

    //  this.empService.updateEmployee(id).subscribe(data => {
    //    this.editForm.setValue(data);
    //  })
  }

  onSubmit() {
    console.log(this.editForm.value)
   let isDirty = (<FormGroupExtension>this.editForm).isDirty()  
          this.empService.updateEmployee(this.editForm.value);
        //  this.router.navigate(['./userProfile/about'])  
  }
  
}
