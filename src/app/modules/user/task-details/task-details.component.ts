import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { AddProjectComponent } from '../modals/add-project/add-project.component';
import { AddTaskComponent } from '../modals/add-task/add-task.component';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  projectList: any;
  week: any = [];
  private projectDetails: any;
  // projectCode:any;
  taskList: any;
  taskStatus: any;
  selectedObject: any;
  projectForm: FormGroup;
  projectName: any;
  submitted = false;
  dummyArray: any = [];
  taskForm: FormGroup;
  userDetails: any;
  loading: boolean;
  billableHours: any;


  constructor(
    private modalService: BsModalService,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.getCurrentWeek();
  }

  ngOnInit() {
    this.initTaskArrayForm();
    this.displayDetails();
    this.displayTaskDetails();

    this.projectForm = this.fb.group({
      projectCode: ['']
    });
    this.userDetails = JSON.parse(this.authService.getUserDetails);

    // this.taskForm = this.fb.group({
    //   taskName: [''],
    //   taskCode: [''],
    //   aliases: this.fb.array([

    //   ])
    // });
  }
  private initTaskArrayForm() {
    this.taskForm = new FormGroup({
      taskList: new FormArray([])
    })
  }



  private initTaskForm(data: any = {}) {
    const taskData = this.fb.group({
      duration: new FormArray((data.duration.length > 0) ? this.initTimeTakingDurationForm(data.duration) : []),
      billableHrs: new FormControl(data.billableHours || null),
      _id: new FormControl(data._id || null),
      status: new FormControl(data.status || null),
      taskCode: new FormControl(data.taskCode || null),
      taskName: new FormControl(data.taskName || null),
      createdAt: new FormControl(data.createdAt || null)
    })
    return taskData;
  }

  private initTimeTakingDurationForm(data) {

    const dummyTimings = [];
    data.map((timingData) => {
      dummyTimings.push(this.fb.group({
        TimeTaken: new FormControl(timingData.TimeTaken || null),
        dates: new FormControl(timingData.dates || null),
        _id: new FormControl(timingData._id || null)
      }));
    })
    return dummyTimings;
  }

  get formArr() {
    return this.taskForm.get("TaskTiming") as FormArray;
  }


  onSave() {
    console.log(this.taskForm.value)
    this.taskForm.value['project']=this.projectDetails._id

    this.submitted = true;
    console.log(this.taskForm.value);


    //  stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    // this.taskForm.value['_id'] = this.taskList
    // console.log(this.taskForm.value)
    this.taskService.updateTaskDetails(this.taskForm.value)

      .subscribe(
        data => {

          console.log(data);
          alert('inserted successfully');
          // this.router.navigate(['../home'], { relativeTo: this.route });
        },
        error => {

          console.log(error.error.message);

          this.loading = false;
        });
  }



  onAddTask() {
    console.log(this.projectDetails)
    const modalRef = this.modalService.show(AddTaskComponent, { class: 'modal-lg', initialState: { projectData: this.projectDetails } });
    modalRef.content.onClose.subscribe((res) => {
      console.log(res, 'fghjkl;')
    })
  }

  onAddProject() {
    const modalRef = this.modalService.show(AddProjectComponent, { class: 'modal-lg' });
    modalRef.content.onClose.subscribe((res) => {
      console.log(res, 'fghjkl;')
      this.projectList.unshift(res);
    })
  }

  async displayDetails() {
    this.taskService.getDetails().subscribe(
      (res: any) => {
        console.log('::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>', res);
        this.projectList = res.result;
        console.log(this.projectList)
        this.projectDetails = res.result[0];
        console.log(this.projectDetails)
        this.projectName = res.result[0].projectName;

      },
      error => {
        console.log(error);
      }
    )

  }


  getData(data) {
    console.log(data);
    this.projectName = data.projectName;
    this.projectDetails = data;
    this.dummyArray = []
    console.log(this.projectDetails)
    this.taskList.map(obj => {
      console.log(obj._id)
      if (obj.project) {
        if (data._id == obj.project._id) {
          this.dummyArray.push(obj)
          console.log(this.dummyArray)
        }
      }
    })

    // this.projectDetails = dummyArray;

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

  async displayTaskDetails() {
    this.taskService.getTaskDetails().subscribe(
      (res: any) => {
        console.log('>>>>>>>>>>', res);
        this.taskList = res.result;

        this.taskList.map((data: any) => {

          if (data) {
            console.log(data)
            const taskFormData = <FormArray>this.taskForm.controls['taskList'];
            taskFormData.push(this.initTaskForm(data));
          }

        })
        console.log(this.taskForm)
      },
      error => {
        console.log(error);
      }
    )
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  get aliases() {
    return this.taskForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }
}
