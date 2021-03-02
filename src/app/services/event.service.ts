import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Constant } from '../modules/dashboard/constant/constant';
import { Event } from '../models/event';
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

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    console.log('Event api error ', error);
    return throwError(error);
  }

  // getAllEvents(page, size, sort): Observable<any> {
  //   return this.http.get<Event[]>(Constant.API_ENDPOINT + '/tasks',
  //   {
  //     params: {
  //       page: page,
  //       size: size,
  //       sort: sort
  //     }
  //   })
  //     .pipe(catchError(this.errorHandler));
  // }
  getAllEvents(): Observable<any> {
    return this.http.get<Event[]>(Constant.API_ENDPOINT + '/tasks')
      .pipe(catchError(this.errorHandler));
  }

  getEventById(id): Observable<Event[]> {
    return this.http.get<Event[]>(Constant.API_ENDPOINT + '/tasks/' + id)
      .pipe(catchError(this.errorHandler));
  }


  createEvent(TaskData): Observable<Event[]> {
    return this.http.post<any>(Constant.API_ENDPOINT + '/tasks', TaskData)
      .pipe(catchError(this.errorHandler));
  }

  updateEvent(taskData, id): Observable<Event[]> {
    return this.http.put<any>(Constant.API_ENDPOINT + '/tasks/' + id, taskData)
      .pipe(catchError(this.errorHandler));
  }

  getAllProjects(): Observable<any> {
    return this.http.get<Event[]>(Constant.API_ENDPOINT + '/projects')
      .pipe(catchError(this.errorHandler));
  }

  getProjectById(id): Observable<Event[]> {
    return this.http.get<Event[]>(Constant.API_ENDPOINT + '/projects/' + id)
      .pipe(catchError(this.errorHandler));
  }


  createProject(ProjectData): Observable<Event[]> {
    return this.http.post<any>(Constant.API_ENDPOINT + '/projects', ProjectData)
      .pipe(catchError(this.errorHandler));
  }

  updateProject(ProjectData, id): Observable<Event[]> {
    return this.http.put<any>(Constant.API_ENDPOINT + '/projects/' + id, ProjectData)
      .pipe(catchError(this.errorHandler));
  }

  getLeaveAndEventsBetweenDate(startDate, endDate): Observable<any> {
    return this.http.get<Event[]>(Constant.API_ENDPOINT + '/userLeave/',
      {
        params: {
          date1: startDate,
          date2: endDate
        }
      })
      .pipe(
        map((results: any) => {
          return results.data.map((event: Event) => {
            return {
              title: event.title,
              start: startOfDay(new Date(event.startDate)),
              end: endOfDay(new Date(event.endDate)),
              allDay: true,
              color: event.eventType === 'leave' ? { primary: '#2f79ef' } : { primary: '#e21841' },
              meta: {
                event
              }
            };
          });
        }),
        catchError(this.errorHandler));
  }
}
