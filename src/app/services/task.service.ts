import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  // private projectDetails = new Subject<any>();
  constructor(private router: Router,
    private http: HttpClient) { }


  addProject(projectData: any) {
    return this.http.post(`${environment.API_HOST}/api/v1/projects`, projectData);
  }
  getDetails() {
   return this.http.get(`${environment.API_HOST}/api/v1/projects`);
  
}
  addTask(taskData:any){
    return this.http.post(`${environment.API_HOST}/api/v1/tasks`, taskData);
  }

}



  // getTaskList() {
  //   this.taskList = this.firebasedb.list('taskList');
  //   return this.taskList;
  // }

  // addTask(task: string) {
  //   this.taskList.push({
  //     name: task,
  //     isChecked: false
  //   })
  // }

  // checkOrUnCheckTask(key: string, flag: boolean) {
  //   this.taskList.update(key, { isChecked:flag });
  // }

  // removeTask(task: string) {
  //   this.taskList.remove(task);
  // }

