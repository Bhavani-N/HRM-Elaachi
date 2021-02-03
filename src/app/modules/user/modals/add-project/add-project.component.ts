import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  loading: boolean;
  message: any;
  userData: any;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private modalRef: BsModalRef
  ) { }
  @ViewChild('projectForm', null) projectForm: NgForm;

  ngOnInit() {
    this.userData = {
      projectName: '',
      projectCode: '',

    };
  }

  submitted = false;


  onSubmit() {
    console.log(this.projectForm.value);

    if (this.projectForm.invalid) {
      return;
    }

    this.loading = true;
    this.taskService.addProject(this.projectForm.value)

      .subscribe(
        data => {

          console.log(data);
          this.modalRef.hide();
        },
        error => {
          this.message = error.error.message;
          console.log(error.error.message);

          this.loading = false;
        });


    this.projectForm.reset();
  }
}
