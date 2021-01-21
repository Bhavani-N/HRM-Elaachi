import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskListArray: any[] = [];
  noData: boolean = false;
  week: any[] = [];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { 
    console.log(this.taskListArray)
  }

  ngOnInit() {
    this.getCurrentWeek();
    this.dataState();
    this.getTask();
  }

  async getTask() {
    let t = await this.taskService.getTaskList();
    console.log(t)
    t.snapshotChanges().subscribe(data => {
      // this.taskListArray = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['key'] = item.key;
        this.taskListArray.push(a);
      })
    })
    console.log(this.taskListArray) 
  }

  getCurrentWeek() {
    let curr = new Date();

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10).split('-').reverse().join('/')
      this.week.push(day)
    }
    console.log(this.week)
  }


  dataState() {
    this.taskService.getTaskList().valueChanges().subscribe(data => {
      if(data.length <= 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    })
  }

  onAddTask() {
    this.router.navigate(['/userProfile/add-task'])
  }

  deleteTask(task: string) {
    if(window.confirm('Are you sure you want to delete this task?') == true) {
      this.taskService.removeTask(task);
    }
  }

}
