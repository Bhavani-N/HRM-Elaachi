import { Component, OnInit } from '@angular/core';
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
  taskList:any[]=[];
  constructor(private modalService: BsModalService, private taskService:TaskService) {

  }

  ngOnInit() {
    this.taskService.getDetails();
    console.log(this.taskService.getDetails());
  }

 
  onAddTask() {
    this.modalRef = this.modalService.show(AddTaskComponent, { class: 'modal-lg' });
  }

  onAddProject() {
    this.modalRef = this.modalService.show(AddProjectComponent, { class: 'modal-lg' });
  }
//  displayDetails(){
//    this.taskService.getDetails()
//  }

  

}
