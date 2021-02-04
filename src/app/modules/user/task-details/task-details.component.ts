import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  projectList: any;
  private projectDetails: any;
  // projectCode:any;
  taskList: any;
  taskStatus: any;
  selectedObject: any;
  projectForm: FormGroup;
  projectName: any;
public taskForm: FormGroup;
  submitted = false;

  constructor(private modalService: BsModalService, private taskService: TaskService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.displayDetails();
    this.displayTaskDetails();
    this.projectForm = this.fb.group({
      projectCode: ['']
    });
  }

  onAddTask() {
    console.log(this.projectDetails)
    const modalRef = this.modalService.show(AddTaskComponent, { class: 'modal-lg', initialState: { projectData: this.projectDetails } });
    modalRef.content.onClose.subscribe((res) => {
      console.log(res, 'fghjkl;')
    })
  }

  onAddProject() {
    const modalRef = this.modalService.show(AddProjectComponent, { class: 'modal-lg' });
    modalRef.content.onClose.subscribe((res) => {
      console.log(res, 'fghjkl;')
      this.projectList.unshift(res);
    })
  }

  async displayDetails() {
    this.taskService.getDetails().subscribe(
      (res: any) => {
        console.log('::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>', res);
        this.projectList = res.result;
        console.log(this.projectList)
        this.projectDetails = res.result[0];
        this.projectName = res.result[0].projectName;

      },
      error => {
        console.log(error);
      }
    )

  }
   dummyArray :any= []

  getData(data) {
    console.log(data)
    this.projectName = data.projectName;
    this.projectDetails = data;
    this.dummyArray=[]
    console.log(this.projectDetails)
    this.taskList.map(obj => {
      console.log(obj._id)
      if(obj.project){
      if(data._id == obj.project._id){
       this.dummyArray.push(obj)
        console.log(this.dummyArray)
      }
    }
    })

    // this.projectDetails = dummyArray;
    
  }

  async displayTaskDetails() {
    this.taskService.getTaskDetails().subscribe(
      (res: any) => {
        console.log('::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>', res);
        this.taskList = res.result;

        console.log(this.taskList)
      },
      error => {
        console.log(error);
      }
    )
  }

  goBack() {
    this.router.navigate(['/home']);
  }


}
