import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskListArray: any[];
  noData: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev, next today',
      center: 'title',
      right: 'dayGridMonth, dayGridWeek, listWeek'
    },
    dayMaxEvents: true,
    events: [
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 1', date: '2021-01-17' },
      { title: 'event 2', date: '2021-01-17' },
    ]
  };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.dataState();
    let t = this.taskService.getTaskList();
    t.snapshotChanges().subscribe(data => {
      this.taskListArray = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['key'] = item.key;
        this.taskListArray.push(a);
      })
    })
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

  deleteTask(task: string) {
    if(window.confirm('Are you sure you want to delete this task?') == true) {
      this.taskService.removeTask(task);
    }
  }

}
