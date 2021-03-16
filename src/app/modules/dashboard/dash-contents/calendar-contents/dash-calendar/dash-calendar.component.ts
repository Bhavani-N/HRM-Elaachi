import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Event } from '../../../../../models/event';
import { EmployeeLeave } from '../../../../../models/employeeLeave';
import { EventService } from '../../../../../services/event.service';

import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  getDay
} from 'date-fns';
import {
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
import { Subject, Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaveService } from '../../../../../services/leave.service';


@Component({
  selector: 'app-dash-calendar',
  templateUrl: './dash-calendar.component.html',
  styleUrls: ['./dash-calendar.component.css']
})
export class DashCalendarComponent implements OnInit {

  view = 'month';
  viewDate: Date = new Date();

  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  excludeDays: number[] = [];
  events$: Observable<Array<CalendarEvent<{ events: EmployeeLeave }>>>;

  constructor(private eventService: EventService, private leaveService: LeaveService, private _router: Router) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventClicked(currEvent: CalendarEvent<{ event: EmployeeLeave }>): void {
    console.log('Event clicked', currEvent.meta.event);
    const clickedEvent = currEvent.meta.event;
    if (clickedEvent.leaveReason) {
      console.log('This is leave event', clickedEvent.leaveReason);
      this._router.navigate(['/dashboard/leaverequests/details/' + clickedEvent._id]);
    } else {
      console.log('This is a event', clickedEvent._id);
      this._router.navigate(['dashboard/leaverequests/details/' + clickedEvent._id]);
    }
  }

  fetchEvents(): void {
    const getStart: any = { month: startOfMonth, week: startOfWeek, day: startOfDay }[this.view];
    const getEnd: any = { month: endOfMonth, week: endOfWeek, day: endOfDay }[this.view];
    const date1 = format(getStart(this.viewDate), 'yyyy-mm-dd');
    const date2 = format(getEnd(this.viewDate), 'yyyy-mm-dd');
    console.log(date1, date2)
    this.events$=this.leaveService.getEmployeeLeavesBetweenDate(date1, date2)
    .pipe(
      map((results: any) => {
        console.log(results)
        return results.data.map((event: EmployeeLeave) => {
          console.log(event)
          return {
            title: event.staffId.firstName,
            start: startOfDay(new Date(event.dateFrom)),
            end: endOfDay(new Date(event.dateTo)),
            allDay: true,
            color: event.status === 'APPROVED' ? { primary: '#2f79ef' } : {primary: '#e21841'},
            meta: {
              event
            }
          };
        })
      }));
  }
}
