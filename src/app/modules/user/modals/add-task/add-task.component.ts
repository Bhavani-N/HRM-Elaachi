import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  loading: boolean;
  message: any;
  userData: any;
  projectData: any
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private modalRef: BsModalRef
  ) { }
  @ViewChild('taskForm', null) taskForm: NgForm;
  public event: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    console.log(this.projectData)
    this.userData = {
      taskName: '',
      taskCode: '',
      project: this.projectData._id
        
    };
  }

  submitted = false;


  onSubmit() {
    console.log(this.taskForm.value);

    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    this.taskForm.value['project']=this.userData.project

    console.log(this.taskForm.value)
    this.taskService.addTask(this.taskForm.value)
      .subscribe(
        data => {

          console.log(data);
          this.event.emit({ data: data , res:200 });
          this.modalRef.hide();
        },
        error => {
          this.message = error.error.message;
          console.log(error.error.message);

          this.loading = false;
        });


    // this.projectForm.reset();
  }
}

