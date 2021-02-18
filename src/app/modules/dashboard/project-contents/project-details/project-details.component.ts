import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  private id: number;
  private sub: any;

  minDate;
  isEdit = false;
  errorMsg;
  event_update_msg;
  has_error = false;
  submitted = false;
  isEventSelected = false;
  selectedEvent;
  eventUpdateForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
     private _authService: AuthService , private _eventService: EventService) { }

  ngOnInit() {
    this.routeId();
  }

  routeId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getEventById(this.id);
    });
  }

  initEventUpdateForm() {
    this.minDate = new Date();
    this.eventUpdateForm = this.formBuilder.group({
      projectCode: [this.selectedEvent.projectCode],      
      projectName: [this.selectedEvent.projectName, [Validators.required, Validators.minLength(3)]],
      startDate: [this.selectedEvent.startDate],
      endDate: [this.selectedEvent.endDate]
    });
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.initEventUpdateForm();
    }
  }

  getEventById(id) {
    if (id ) {
      this._eventService.getProjectById(id)
        .subscribe(
          data => {
            console.log(data)
            this.selectedEvent = data;
            this.selectedEvent=this.selectedEvent.result
            this.isEventSelected = true;
            // console.log("Selected Leave Type data: ", data);
          },
          error => this.errorMsg = error);
    } else {
      this.isEventSelected = false;
    }
  }

  get f() { return this.eventUpdateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eventUpdateForm.invalid) {
      return;
    }
    // console.log("success ", this.leaveTypeUpdateForm.value);
    this._eventService.updateProject(this.eventUpdateForm.value, this.id).subscribe(res => {
      console.log(res);
      this.has_error = false;
      this.selectedEvent = res;
      this.selectedEvent=this.selectedEvent.result;
      this.event_update_msg = 'Update Successful';
      this.eventUpdateForm.reset();
      this.submitted = false;
    }, error => {
      this.has_error = true;
      this.event_update_msg = error.error.message;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
