import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {
  @ViewChild('appCalendar', {static: false}) appCalendar: ElementRef;

  constructor() { 
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const isWeekend = day => {
      return day % 7 === 6 || day % 7 === 0;
    }
    for(let day= 1; day <= 31; day++) {
      console.log(this.getDayName(day));
      const weekend = isWeekend(day)
      console.log(weekend);
      let name = "";
      if (day <= 7) {
        const dayName = this.getDayName(day);
        name = `<div class="name">${dayName}</div>`
      }
      const dayName = this.getDayName(day);
      this.appCalendar.nativeElement.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend": ""}">
      ${name}${day}</div>`);
      console.log(day);
    }
    console.log(this.appCalendar)
  }

  getDayName(day) {
    const curr = new Date();
    console.log(curr)
    const getYear = curr.getFullYear();
    const date = new Date(Date.UTC(getYear, 0, day));
    console.log(date);
    return new Intl.DateTimeFormat("en-US",{ weekday: "short" }).format(date); 
  }

  onClick() {
    console.log('working');
  }
  
}
