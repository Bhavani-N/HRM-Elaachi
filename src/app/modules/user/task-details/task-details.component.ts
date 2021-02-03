import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { AddProjectComponent } from '../modals/add-project/add-project.component';
import { AddTaskComponent } from '../modals/add-task/add-task.component';

import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  projectList:any;
  public taskForm: FormGroup;
  submitted = false;

  constructor(private modalService: BsModalService, private taskService:TaskService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.displayDetails();
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskCode: ['', Validators.required],
      status: ['', Validators.required],
      columns: this.fb.array([this.initDuration()])
    });
  }

  get formArr() {
    return this.taskForm.get("columns") as FormArray;
  }

  onSave() {
    this.submitted = true;
    if(!this.taskForm.valid) {
      return;
    }
    console.log(JSON.stringify(this.taskForm.value))
  }

  initDuration() {
    return this.fb.group({
      duration: [""]
    });
  }

  addNewCoulmn() {
    this.formArr.push(this.initDuration());
  }
 
  onAddTask() {
    this.modalRef = this.modalService.show(AddTaskComponent, { class: 'modal-lg' });
  }

  onAddProject() {
    this.modalRef = this.modalService.show(AddProjectComponent, { class: 'modal-lg' });
  }

  async displayDetails(){
    this.taskService.getDetails().subscribe(
      (res: any) => {
        console.log('::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>', res);
        this.projectList = res.result;
        console.log(this.projectList)
      },
      error => {
        console.log(error);
      }
    )
  }

  

}
