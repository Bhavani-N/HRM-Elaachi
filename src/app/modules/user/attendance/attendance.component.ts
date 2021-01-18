import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    headerToolbar: {
      left: 'prev, next today',
      center: 'title',
      right: 'dayGridWeek'
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

  constructor() { }

  ngOnInit() {
  }

}
