import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  userData = {
    projectName: '',
    projectCode: '',
   
  };
  submitted = false;

  
onSubmit(form,formData) {
    console.log('submitted formdata',formData);  
    
    alert('Form submitted successfully');
    
    form.reset();
  }
}
