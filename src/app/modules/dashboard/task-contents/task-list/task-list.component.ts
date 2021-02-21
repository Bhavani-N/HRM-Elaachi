import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../../../../services/event.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  events;
  errorMsg;

  loading = true;
  currentPage = 1;
  totalElements;
  numberOfElements;
  size = 10;
  sortKey = 'title';
  reverse = false;

  isEdit = false;

  projectDetails;
  projectId;
  projectName;
  projectForm: FormGroup;
  taskId: any;
  dArray: any = [];
  week: any = [];
  constructor(private _eventService: EventService , private fb:FormBuilder) {
    this.getCurrentWeek();
  }

  ngOnInit() {
    this.isEdit = false;
    this.getAllEvents();
    this.getAllProjectDetails();
    this.projectForm = this.fb.group({
      projectCode: ['']
    });
  }

  selectEvent(event) {
    this.isEdit = true;
    console.log('is edit', event);
  }

  getPage(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.getAllEvents();
  }
  sort(key: string) {
    this.loading = true;
    this.sortKey = key + ','.concat(this.reverse ? 'DESC' : 'ASC');
    this.reverse = !this.reverse;
    this.getAllEvents();
  }

  getCurrentWeek() {
    let curr = new Date();

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      // let day = new Date(curr.setDate(first)).toISOString().slice(0, 10).split('-').reverse().join('/')
      let day = new Date(curr.setDate(first)).toISOString().slice(5, 10).split('-').reverse().join('/')
      this.week.push(day)
    }

    console.log(this.week)
  }

  getAllProjectDetails(){
    this._eventService.getAllProjects().subscribe(
      data=>{
      console.log(data);
      this.projectDetails=data.result
      }
    )
  }
  getData(data) {
    console.log(data);
    this.projectName = data.projectCode.projectName;
    this.projectId=data.projectCode._id;
    this.dArray=[];
    console.log(this.projectId)
    this.events.map(obj=>{
      console.log(obj.project)
      if(this.projectId==obj.project){
         this.dArray.push(obj)
         console.log(this.dArray)
      }
    })


    // if(this.projectId==thi)
  }
  getAllEvents() {
    this._eventService.getAllEvents()
      .subscribe(
        data => {
          console.log(data);

          this.events = data.data;
          console.log(this.events)
         this.taskId=this.events.project;
         console.log(this.taskId)
          this.totalElements = data.totalElements;
          this.size = data.size;
          this.numberOfElements = data.numberOfElements;
          this.loading = false;
          this.isEdit = false;
          // console.log('Events data: ', data);
        },
        
        error => this.errorMsg = error);
      
  }


}
