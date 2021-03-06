import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
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
      taskCode: [this.selectedEvent.taskCode],      
      taskName: [this.selectedEvent.taskName, [Validators.required, Validators.minLength(3)]],
      startDate: [this.selectedEvent.startDate, Validators.required],
      endDate: [this.selectedEvent.endDate, Validators.required],
      status:  [this.selectedEvent.status, Validators.required],
        // mondayValue: new FormControl(''),
        // tuesdayValue: new FormControl(''),
        // wednesdayValue: new FormControl(''),
        // thursdayValue: new FormControl(''),
        // fridayValue: new FormControl(''),
        // saturdayValue: new FormControl(''),
        // sundayValue: new FormControl('')
      })
  }
 
  get f() { return this.eventUpdateForm.controls; }

  get t() { return this.f.duration as FormArray; }

  // onChangeDays(e) {
  //   const numberOfDays = e.target.value || 0;
  //   if (this.t.length < numberOfDays) {
  //     for (let i = this.t.length; i < numberOfDays; i++) {
  //       this.t.push(this.formBuilder.group({
  //         dates: ['', Validators.required],
  //         timeTaken: ['', Validators.required],
  //       }));
  //     }
  //   } else {
  //     for (let i = this.t.length; i>= numberOfDays; i++) {
  //       this.t.removeAt(i);
  //     }
  //   }
  // }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.initEventUpdateForm();
    }
  }

  getEventById(id) {
    if (id ) {
      this._eventService.getEventById(id)
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eventUpdateForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.eventUpdateForm.value, null, 4));
    // console.log("success ", this.leaveTypeUpdateForm.value);
    this._eventService.updateEvent(this.eventUpdateForm.value, this.id).subscribe(res => {
      console.log(res);
      this.has_error = false;
      this.selectedEvent = res;
      this.selectedEvent=this.selectedEvent.result;
      this.event_update_msg = 'Update Successful';
      this.eventUpdateForm.reset();
      this.submitted = false;
    }, error => {
      alert('not working')
      this.has_error = true;
      this.event_update_msg = error.error.message;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}