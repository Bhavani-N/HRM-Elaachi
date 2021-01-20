import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('appCalendar', {static: false}) appCalendar: ElementRef;

  constructor() {}
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    for(let day= 1; day <= 31; day++) {
      console.log(this.getDayName(day));
      let name = "";
      if (day <= 7) {
        const dayName = this.getDayName(day);
        name = `<div class="name">${dayName}</div>`
      }
      const dayName = this.getDayName(day);
      this.appCalendar.nativeElement.insertAdjacentHTML("beforeend", `<div class="day">
      ${name}${day}</div>`);
      console.log(day)
    }
    console.log(this.appCalendar)
  }

  getDayName(day) {
    const curr = new Date();
    const getYear = curr.getFullYear();
    const date = new Date(Date.UTC(getYear, 0, day));
    console.log(date);
    return new Intl.DateTimeFormat("en-US",{ weekday: "short" }).format(date); 
  }

}
