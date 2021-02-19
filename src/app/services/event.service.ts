import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constant } from '../modules/dashboard/constant/constant';
import { Event } from '../models/event';
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

  





  // getLeaveAndEventsBetweenDate(startDate, endDate): Observable<any> {
  //   return this.http.get<Event[]>(Constant.API_ENDPOINT + '/rest/events/byDate',
  //   {
  //     params: {
  //       date1: startDate,
  //       date2: endDate
  //     }
  //   })
  //     .pipe(catchError(this.errorHandler));
  // }
}
