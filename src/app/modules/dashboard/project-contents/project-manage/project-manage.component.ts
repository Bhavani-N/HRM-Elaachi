import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../../../services/event.service';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.css']
})
export class ProjectManageComponent implements OnInit {

  @Input() event: Event;
  minDate: Date;
  create_event_msg: string;
  public has_error = false;

  eventForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _eventService: EventService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.eventForm = this.formBuilder.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      projectCode: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  get f() { return this.eventForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eventForm.invalid) {
      return;
    }

    this._eventService.createProject(this.eventForm.value).subscribe(res => {      
      this.has_error = false;
      this.create_event_msg = 'Project succesfully Created';
      this.eventForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      alert('error');
      this.create_event_msg = error.error.message;
    });
  }
}
