import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { AddProjectComponent } from '../modals/add-project/add-project.component';
import { AddTaskComponent } from '../modals/add-task/add-task.component';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { TaskListResponse } from '../../../models/task-list-response';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskListFormGroup: FormGroup = new FormGroup({
    listOfTasks: new FormArray([])
  })
  taskFormGroup: FormArray;
  public taskArray: any;

  get tasksFormArray(): FormArray {
    return this.taskListFormGroup.get('listOfTasks') as FormArray
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
  submitted = false;
  public has_error = false;
  create_event_msg: string;
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
  public weeksData: any = [];
  constructor(private _eventService: EventService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.isEdit = false;
    this.getAllEvents();
    this.getAllProjectDetails();
    this.projectForm = this.fb.group({
      projectCode: ['']
    });
    this.taskFormGroup = new FormArray([])
    this.taskArray = <FormArray>this.taskFormGroup;
    this.getCurrentWeek();
  }

  public updateTaskForm(data: any = {}) {
    const newFormGroup = this.fb.group({
      taskName: new FormControl(data.taskName || null),
      taskCode: new FormControl(data.taskCode|| null),
      startDate: new FormControl(data.startDate|| null),
      endDate: new FormControl(data.endDate|| null),
      status: new FormControl(data.status|| null),
      duration: new FormArray([])
      // mondayValue: new FormControl(''),
      // tuesdayValue: new FormControl(''),
      // wednesdayValue: new FormControl(''),
      // thursdayValue: new FormControl(''),
      // fridayValue: new FormControl(''),
      // saturdayValue: new FormControl(''),      
      // sundayValue: new FormControl('')
    });
    const durationArray = <FormArray>newFormGroup.get('duration');
    let curr = new Date();
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(5, 10).split('-').reverse().join('/')
      const actualDate = new Date(curr.setDate(first));
      durationArray.push(this.fb.group({
        [`${actualDate}`]: new FormControl(null)
      }))
    }
    this.taskArray.push(newFormGroup);
    console.log(newFormGroup, 'lkh')
    // return newFormGroup;
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
      console.log(new Date(curr.setDate(first)).toISOString())
      const actualDate = new Date(curr.setDate(first));
      this.weeksData.push({
        [`${actualDate}`]: null
      });
      // this.durationArray.push(this.fb.group({
      //   [`${actualDate}`]: new FormControl(null)
      // }))
      this.week.push(day)
    }
    console.log(this.week, this.weeksData, this.durationArray)
  }

  getAllProjectDetails() {
    this._eventService.getAllProjects().subscribe(
      data => {
        console.log(data);
        this.projectDetails = data.result
      }
    )
  }
  getData(data) {
    console.log(data);
    this.projectName = data.projectCode.projectName;
    this.projectId = data.projectCode._id;
    this.dArray = [];
    console.log(this.projectId)
    this.events.map(obj => {
      this.updateTaskForm(obj);
      console.log(obj.project)
      if (this.projectId == obj.project) {
        this.dArray.push(obj)
        console.log(this.dArray)
        this.dArray.map(res => {
          console.log(res);
          this.duration = res;
          this.duration = this.duration.duration;
          console.log(this.duration)
          //  console.log(res.duration)
          //    this.duration=res.duration;
          //  console.log(this.duration);
          this.duration.map(res => {
            this.time = res;
            console.log(this.time);
          })
        })
      }
      console.log(this.dArray)
      this.durationArray = this.dArray;
      this.durationArray.map(res => {
        console.log(res.duration)
        this.durationArray = res.duration;
      })
      console.log(this.taskFormGroup)
    })
  }

  getAllEvents() {
    this._eventService.getAllEvents()
      .subscribe(
        data => {
          console.log(data);

          this.events = data.data;
          console.log(this.events)
          this.taskId = this.events.project;
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
