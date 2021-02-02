import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
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
  constructor(private modalService: BsModalService) {

  }

  ngOnInit() {
    // this.getCurrentWeek();
    // this.dataState();
    // this.getTask();
  }

  // async getTask() {
  //   let t = await this.taskService.getTaskList();
  //   console.log(t)
  //   t.snapshotChanges().subscribe(data => {
  //     // this.taskListArray = [];
  //     data.forEach(item => {
  //       let a = item.payload.toJSON();
  //       a['key'] = item.key;
  //       this.taskListArray.push(a);
  //     })
  //   })
  //   console.log(this.taskListArray) 
  // }

  // getCurrentWeek() {
  //   let curr = new Date();

  //   for (let i = 1; i <= 7; i++) {
  //     let first = curr.getDate() - curr.getDay() + i;
  //     let day = new Date(curr.setDate(first)).toISOString().slice(0, 10).split('-').reverse().join('/')
  //     this.week.push(day)
  //   }
  //   console.log(this.week)
  // }


  // dataState() {
  //   this.taskService.getTaskList().valueChanges().subscribe(data => {
  //     if(data.length <= 0) {
  //       this.noData = true;
  //     } else {
  //       this.noData = false;
  //     }
  //   })
  // }

  onAddTask() {
    this.modalRef = this.modalService.show(AddTaskComponent, { class: 'modal-lg' });
  }

  onAddProject() {
    this.modalRef = this.modalService.show(AddProjectComponent, { class: 'modal-lg' });
  }

  // deleteTask(task: string) {
  //   if(window.confirm('Are you sure you want to delete this task?') == true) {
  //     this.taskService.removeTask(task);
  //   }
  // }

}
