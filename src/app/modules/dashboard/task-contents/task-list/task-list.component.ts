import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskListResponse } from 'src/app/models/task-list-response';
import { EventService } from '../../../../services/event.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskListFormGroup: FormGroup = new FormGroup({
    listOfTasks: new FormArray([])
  })

  get tasksFormArray(): FormArray {
    return this.taskListFormGroup.get('listOfTasks') as FormArray
  }


  buildFormArray(): void {
    this.dArray.forEach(data => {
      let taskFormGroup = new FormGroup({
        taskName: new FormControl(data.taskName),
        taskCode: new FormControl(data.taskCode),
        startDate: new FormControl(data.startDate),
        endDate: new FormControl(data.endDate),
        status: new FormControl(data.status),
        mondayValue: new FormControl(data.monday ? data.monday.timeTaken : 0),
        tuesdayValue: new FormControl(data.tuesday ? data.tuesday.timeTaken : 0),
        wednesdayValue: new FormControl(data.wednesday ? data.wednesday.timeTaken : 0),
        thursdayValue: new FormControl(data.thursday ? data.thursday.timeTaken : 0),
        fridayValue: new FormControl(data.friday ? data.friday.timeTaken : 0),
        saturdayValue: new FormControl(data.saturday ? data.saturday.timeTaken : 0),
        sundayValue: new FormControl(data.sunday ? data.sunday.timeTaken : 0)

      })
    })
  }
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
  dArray: Array<TaskListResponse> = [];
  durationArray: any = [];
  week: any = [];
  duration;
  time: any;
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
         this.dArray.map(res=>{
           console.log(res);
          //  this.duration=res.duration;
           console.log(this.duration);
          this.duration.map(res=>{
            this.time=res;
            console.log(this.time);
           })
         })
      }
      this.durationArray = this.dArray;
      this.durationArray.map(res => {
        console.log(res.duration)
        this.durationArray = res.duration;
      })
      console.log(this.durationArray)
    })
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
