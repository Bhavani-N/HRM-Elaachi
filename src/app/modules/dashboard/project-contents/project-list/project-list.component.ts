import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
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

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.isEdit = false;
    this.getAllEvents();
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

  getAllEvents() {
    this._eventService.getAllProjects()
      .subscribe(
        data => {
          console.log(data);

          this.events = data.result;
          console.log(this.events)
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
