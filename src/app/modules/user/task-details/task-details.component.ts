import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { addDays, getHours } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { colors } from '../calendar-utils/colors';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskListArray: any[];
  noData: boolean = false;

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  dayStartHour = Math.max(0, getHours(new Date()) - 2);

  dayEndHour = Math.min(23, getHours(new Date()) + 2);

  events: CalendarEvent[] = [
    {
      title: '9hrs',
      color: colors.yellow,
      start: new Date(),
      end: addDays(new Date(), 1), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    },
    {
      title: '8hrs',
      color: colors.blue,
      start: new Date(),
      end: addDays(new Date(), 1),
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataState();
    let t = this.taskService.getTaskList();
    console.log(t)
    t.snapshotChanges().subscribe(data => {
      this.taskListArray = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['key'] = item.key;
        this.taskListArray.push(a);
        // console.log(this.taskListArray)
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

  onAddTask() {
    this.router.navigate(['/userProfile/add-task'])
  }

  deleteTask(task: string) {
    if(window.confirm('Are you sure you want to delete this task?') == true) {
      this.taskService.removeTask(task);
    }
  }

}
