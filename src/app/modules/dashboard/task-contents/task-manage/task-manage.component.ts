import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../../../services/event.service';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
@Component({
  selector: 'app-task-manage',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.css']
})
export class TaskManageComponent implements OnInit {

  @Input() event: Event;
  minDate: Date;
  create_event_msg: string;
  public has_error = false;

  eventForm: FormGroup;
  submitted = false;
  projectDetails;
  projectName;
  projectForm: FormGroup;
  projectId: void;

  constructor(private formBuilder: FormBuilder, private _eventService: EventService) {
    // this.getData(data);
  }

  ngOnInit() {
    console.log(this.projectId)
    this.minDate = new Date();
    this.eventForm = this.formBuilder.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      taskCode: ['', Validators.required],
      projectCode: ['',Validators.required],
      // project: [this.projectId]
    });
    // this.projectForm = this.formBuilder.group({
    //   projectCode: ['']
    // });
    this.getAllProjectDetails();
  }

  get f() { return this.eventForm.controls; }

  getData(data) {
    console.log(data);
    this.projectName = data.projectCode.projectName;
    this.projectId = data.projectCode._id
    console.log(this.projectId);
  }

  getAllProjectDetails() {
    this._eventService.getAllProjects().subscribe(
      data => {
        console.log(data);
        this.projectDetails = data.result
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.projectId)
    this.eventForm.value['project'] = this.projectId;
    console.log(this.eventForm.value)
    // stop here if form is invalid
    if (this.eventForm.invalid) {
      return;
    }



    this._eventService.createEvent(this.eventForm.value).subscribe(res => {
      this.has_error = false;
      this.create_event_msg = 'Event succesfully Created';
      this.eventForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      this.create_event_msg = error.error.message;
    });
  }


}

