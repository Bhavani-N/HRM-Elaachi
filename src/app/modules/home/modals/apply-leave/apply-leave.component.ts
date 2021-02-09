import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {
  @ViewChild('appCalendar', {static: false}) appCalendar: ElementRef;
  public sat = new Array();   //Declaring array for inserting Saturdays
  public sun = new Array();

  constructor(private elRef:ElementRef) { 
  }

  ngOnInit() {
    let d = new Date();
    var getTot = this.daysInMonth(d.getMonth(),d.getFullYear()); //Get total days in a month
       //Declaring array for inserting Sundays

    for(var i=1;i<=getTot;i++){    //looping through days in month
        var newDate = new Date(d.getFullYear(),d.getMonth(),i)
        if(newDate.getDay()==0){   //if Sunday
            this.sun.push(i);
        }
        if(newDate.getDay()==6){   //if Saturday
          this.sat.push(i);
        }

    }
    console.log(this.sat);
    console.log(this.sun);
  }

  daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  }

  ngAfterViewInit() {
    console.log(this.appCalendar)
    const isWeekend = day => {
      return day % 7 === 6  || day % 7 === 0;
    }             
    let d = new Date();
    console.log(d, d.getMonth())
    console.log(d.getMonth(),d.getFullYear())
    var getTot = this.daysInMonth(d.getMonth(),d.getFullYear()); 
    console.log(getTot)
    for(let day= 1; day <= getTot; day++) {
      let newDate= new Date(d.getFullYear(),d.getMonth(),day)
      if(newDate.getDay()==0){   //if Sunday
        this.sun.push(day);
      }
      if(newDate.getDay()==6){   //if Saturday
        this.sat.push(day);
      }
      console.log(this.sat);
      console.log(this.sun);

      console.log(this.getDayName(day));
      const weekend = isWeekend(day)
      console.log(weekend);
      let name = "";
      if (day <= 7) {
        const dayName = this.getDayName(day);
        name = `<div class="name">${dayName}</div>`
      }
      const dayName = this.getDayName(day);
      const days = this.getDays(day);
      console.log(days)
      this.appCalendar.nativeElement.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend": ""}">
      ${name}${day}</div>`);
      console.log(day);
    }
    this.elRef.nativeElement.querySelectorAll("#app-calendar .day").forEach(day => {
      console.log(day);
      day.addEventListener("click", event => {
         console.log(event.currentTarget)
         event.currentTarget.classList.toggle("selected");
      });
  });
  }

  getDayName(day) {
    const curr = new Date();
    const getYear = curr.getFullYear();
    const getMonth = curr.getMonth();
    const date = new Date(Date.UTC(getYear, getMonth, day));
    console.log(date);
    return new Intl.DateTimeFormat("en-US",{ weekday: "short" }).format(date); 
  }

  getDays(day) {
    const curr = new Date();
    console.log(curr.getDay());
    return 
  }

  onClick() {
    console.log('working');
  }
  
}
