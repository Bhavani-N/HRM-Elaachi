import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-hr-approval',
  templateUrl: './hr-approval.component.html',
  styleUrls: ['./hr-approval.component.css']
})
export class HRApprovalComponent implements OnInit {
  // taskListArray:any[] = [];
  // tempTaskListArray =[];
  // noData: boolean = false;

  // constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { 
  //   this.getTask();
  // }

  // ngOnInit() {
  //   // this.getTask();
  //   this.dataState();
  // }

  // async getTask() {
  //   let t = await this.taskService.getTaskList().snapshotChanges().subscribe(data=>{
  //     let tempTaskListArray = []
  //     data.forEach(item => {
  //       let a = item.payload.toJSON();
  //       a['key'] = item.key;
  //       this.tempTaskListArray.push(a);
  //     })
  //   console.log(this.tempTaskListArray)
  //   })
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

  // onAddTask() {
  //   this.router.navigate(['/userProfile/add-task'])
  // }

  // deleteTask(task: string) {
  //   if(window.confirm('Are you sure you want to delete this task?') == true) {
  //     this.taskService.removeTask(task);
  //   }
  // }

}
