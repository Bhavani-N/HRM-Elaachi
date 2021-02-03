import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { AddProjectComponent } from '../modals/add-project/add-project.component';
import { AddTaskComponent } from '../modals/add-task/add-task.component';



@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  projectList:any;
  projectCode:any;
  selectedObject :any;
  constructor(private modalService: BsModalService, private taskService:TaskService, private router:Router) {

  }

  ngOnInit() {
     this.displayDetails();
  }

 
  onAddTask() {
    const modalRef = this.modalService.show(AddTaskComponent, { class: 'modal-lg' });
    // modalRef.content.onClose.subscribe((res) => {
    //   console.log(res, 'fghjkl;')
    // })
  }

  onAddProject() {
    const modalRef = this.modalService.show(AddProjectComponent, { class: 'modal-lg' });
    modalRef.content.onClose.subscribe((res) => {
      console.log(res, 'fghjkl;')
      this.projectList.unshift(res);
    })
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

  goBack(){
    this.router.navigate(['/home']);
  }
  handleChange(index) {
    console.log(this.projectCode[index]);
    this.selectedObject = this.projectCode[index];
  }

 }
